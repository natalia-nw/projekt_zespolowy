from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView

from agreement.choices import AgreementStatus
from agreement.email_templates import email_new_agree_receiver_user, email_new_agree_receiver, \
    email_new_proposal_receiver_user, email_new_proposal_owner_user, email_updated_agreement, \
    email_updated_agreement_no_user
from items.models import Item
from agreement.models import Agreement
from agreement.permissions import AgreementAccess
from agreement.serializers import AgreementSerializer, AgreementReceiverSerializer, AgreementOwnerUpdateSerializer, \
    AgreementReceiverUpdateSerializer

User = get_user_model()


class AgreementList(generics.ListCreateAPIView):
    serializer_class = AgreementSerializer
    name = "agreements"
    filterset_fields = ["status", "receiver_email"]
    search_fields = ["name", "category", "item"]
    ordering_fields = ["id", "name", "category", "created_at", "updated_at", "item", "date_start", "date_stop"]
    permission_classes = [IsAuthenticated, AgreementAccess]

    def get_serializer_class(self):
        item_id = self.kwargs.get("item_id")
        if item_id and Item.objects.get(id=item_id).user == self.request.user:
            return self.serializer_class
        return AgreementReceiverSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Agreement.objects.all()
        item_id = self.kwargs.get("item_id")
        if item_id:
            qs1 = Agreement.objects.filter(item=item_id, item__user=self.request.user)
            qs2 = Agreement.objects.filter(item=item_id, receiver=self.request.user)
        else:
            qs1 = Agreement.objects.filter(item__user=self.request.user)
            qs2 = Agreement.objects.filter(receiver=self.request.user)
        return qs1 | qs2

    def perform_create(self, serializer):
        # Create agreement based on item ID in URL
        # Fill some fields automatically based on item fields, email users
        item_id = self.kwargs.get("item_id")
        if not item_id:
            raise ValidationError("Należy podać ID przedmiotu w URL: items/<id>/agreements")
        item = get_object_or_404(Item, id=item_id)

        # Check for collisions
        date_start = serializer.validated_data.get("date_start", now().date())
        date_stop = serializer.validated_data.get("date_stop", now().date())
        if Agreement.objects.filter(item=item, status__in=[AgreementStatus.OWNER, AgreementStatus.RECEIVER_CONFIRMED],
                                    date_stop__gt=date_start,
                                    date_start__lt=date_stop
                                    ).exclude(date_start=date_stop).exists():
            raise ValidationError("Kolizja dat wśród innych wypożyczeń. "
                                  "Wypróbuj inny termin.")

        # Link user, set fields, save, send emails
        serializer.validated_data["item"] = item
        if item.user == self.request.user:
            serializer.validated_data["status"] = AgreementStatus.OWNER
            receiver_email = serializer.validated_data.get("receiver_email")
            receiver_user = User.objects.filter(email=receiver_email).first()  # email is unique
            if receiver_user:
                serializer.validated_data["receiver"] = receiver_user
                email = email_new_agree_receiver_user(item.name, item.user.email, date_start, date_stop)
            else:
                email = email_new_agree_receiver(item.name, item.user.email, date_start, date_stop)
            serializer.save()
            if receiver_email:
                send_mail(email["subject"], email["body"], from_email=None, recipient_list=[receiver_email])

        elif item.public:
            serializer.validated_data["status"] = AgreementStatus.RECEIVER
            serializer.validated_data["receiver"] = self.request.user
            serializer.validated_data["receiver_email"] = self.request.user.email
            serializer.save()

            email = email_new_proposal_receiver_user(item.name, item.user.email, date_start, date_stop)
            self.request.user.email_user(email["subject"], email["body"])

            email = email_new_proposal_owner_user(item.name, self.request.user.email, date_start, date_stop)
            item.user.email_user(email["subject"], email["body"])
        else:
            raise ValidationError("Nie masz uprawnień do tego przedmiotu.")


class AgreementDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "agreement"
    permission_classes = [IsAuthenticated, AgreementAccess]
    serializer_class = AgreementSerializer

    def get_serializer_class(self):
        item_id = self.kwargs.get("item_id")
        if item_id and self.request.method in ["PUT", "PATCH"]:
            if get_object_or_404(Item, id=item_id).user == self.request.user:
                return AgreementOwnerUpdateSerializer
            return AgreementReceiverUpdateSerializer
        return self.serializer_class

    def get_queryset(self):
        qs1 = Agreement.objects.filter(id=self.kwargs.get("pk"), item__user=self.request.user)
        qs2 = Agreement.objects.filter(id=self.kwargs.get("pk"), receiver=self.request.user)
        return qs1 | qs2

    def partial_update(self, request, *args, **kwargs):
        user = self.request.user
        obj = self.get_object()

        # Check for collisions
        if obj.status == AgreementStatus.RECEIVER and request.data.get("status") == AgreementStatus.RECEIVER_CONFIRMED:
            if Agreement.objects.filter(item=obj.item, status__in=[AgreementStatus.OWNER, AgreementStatus.RECEIVER_CONFIRMED],
                                        date_stop__gt=request.data.get("date_start", obj.date_start),
                                        date_start__lt=request.data.get("date_stop", obj.date_stop)
                                        ).exclude(date_start=request.data.get("date_stop", obj.date_stop)).exists():
                raise ValidationError("Kolizja dat wśród innych wypożyczeń. "
                                      "Zapytanie nie może zostać potwierdzone.")

        # Assign new user if email provided, update
        with transaction.atomic():
            new_receiver_email = request.data.get("receiver_email")
            if new_receiver_email:
                receiver_user = User.objects.filter(email=new_receiver_email).first()
                if receiver_user:
                    obj.receiver = receiver_user
                    obj.save()
            response = super().partial_update(request, *args, **kwargs)

        updated_obj = Agreement.objects.get(id=obj.id)

        # Email
        if updated_obj.receiver:
            email = email_updated_agreement(updated_obj.item.name, updated_obj.item.user.email,
                                            updated_obj.receiver_email, updated_obj.date_start,
                                            updated_obj.date_stop, updated_obj.status)
            print('if updated_obj.receiver')
            updated_obj.receiver.email_user(email["subject"], email["body"])
        else:
            email = email_updated_agreement_no_user(updated_obj.item.name, updated_obj.item.user.email,
                                                    updated_obj.receiver_email, updated_obj.date_start,
                                                    updated_obj.date_stop, updated_obj.status)
            if updated_obj.receiver_email:
                send_mail(email["subject"], email["body"], from_email=None, recipient_list=[updated_obj.receiver_email])
        updated_obj.item.user.email_user(email["subject"], email["body"])

        return response


class AgreementLinkView(APIView):
    name = "agreement-link"
    permission_classes = [IsAuthenticated]

    def post(self, request):
        agreements = Agreement.objects.filter(receiver_email=request.user.email, receiver__isnull=True)
        if not agreements.exists():
            return Response({"message": "Twój email nie znajduje się w żadnej nieprzypisanej umowie."}, status=404)
        agreements.update(receiver=self.request.user)
        return Response({"message": "Pomyślnie połączono umowy."}, status=200)
