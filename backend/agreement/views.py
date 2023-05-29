from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils.timezone import now
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail

from agreement.choices import AgreementStatus
from agreement.email_templates import email_new_agree_receiver_user, email_new_agree_receiver, \
    email_new_proposal_receiver_user, email_new_proposal_owner_user
from items.models import Item
from agreement.models import Agreement
from agreement.permissions import AgreementAccess
from agreement.serializers import AgreementSerializer

User = get_user_model()


class AgreementList(generics.ListCreateAPIView):
    serializer_class = AgreementSerializer
    name = "agreements"
    filterset_fields = ["status", "receiver_email"]
    search_fields = ["name", "category", "item"]
    ordering_fields = ["id", "name", "category", "created_at", "updated_at", "item", "date_start", "date_stop"]
    permission_classes = [IsAuthenticated, AgreementAccess]

    def get_serializer_class(self):
        # item_id = self.kwargs.get("item_id")
        # if item_id and self.request.method == "POST":
        #     return ItemAgreementCreateSerializer
        return self.serializer_class

    def get_queryset(self):
        item_id = self.kwargs.get("item_id")
        if item_id:
            return Agreement.objects.filter(item=item_id, item__user=self.request.user)
        if self.request.user.is_staff:
            return Agreement.objects.all()
        qs1 = Agreement.objects.filter(item__user=self.request.user)
        qs2 = Agreement.objects.filter(receiver=self.request.user)
        return qs1 | qs2

    def perform_create(self, serializer):
        # Create agreement based on item ID in URL
        # Fill some fields automatically based on item fields, email users
        item_id = self.kwargs.get("item_id")
        if item_id:
            try:
                item = Item.objects.get(id=item_id)
            except Item.DoesNotExist:
                raise ValidationError("Taki przedmiot nie istnieje lub nie masz do niego uprawnień.")
            date_start = serializer.validated_data.get("date_start", now().date())
            date_stop = serializer.validated_data.get("date_stop", now().date())
            if Agreement.objects.filter(item=item, status__in=[AgreementStatus.OWNER, AgreementStatus.RECEIVER_CONFIRMED],
                                        date_stop__gt=date_start,
                                        date_start__lt=date_stop
                                        ).exclude(date_start=date_stop).exists():
                raise ValidationError("Kolizja dat wśród innych wypożyczeń. "
                                      "Wypróbuj inny termin.")
            serializer.validated_data["item"] = item

            if item.user == self.request.user:
                serializer.validated_data["status"] = AgreementStatus.OWNER
                receiver_email = serializer.validated_data.pop("receiver_email")
                if receiver_email:
                    try:
                        receiver_user = User.objects.get(email=receiver_email)
                        serializer.validated_data["receiver"] = receiver_user
                        email = email_new_agree_receiver_user(item.name, item.user.email, date_start, date_stop)
                    except User.DoesNotExist:
                        email = email_new_agree_receiver(item.name, item.user.email, date_start, date_stop)
                    serializer.save()
                    send_mail(email["subject"], email["body"], from_email=None, recipient_list=[receiver_email])
                else:
                    serializer.save()
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
                raise ValidationError("Taki przedmiot nie istnieje lub nie masz do niego uprawnień.")
        else:
            raise ValidationError("Należy podać ID przedmiotu w URL: items/<id>/agreements")


class AgreementDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "agreement"
    permission_classes = [IsAuthenticated, AgreementAccess]
    serializer_class = AgreementSerializer

    # def get_serializer_class(self):
    #     item_id = self.kwargs.get("item_id")
    #     if item_id and self.request.method in ["PUT", "PATCH"]:
    #         return ItemAgreementCreateSerializer
    #     return self.serializer_class

    def get_queryset(self):
        agreement_id = self.kwargs.get("pk")
        if agreement_id:
            try:
                agreement = Agreement.objects.filter(id=agreement_id)
                return agreement
            except Agreement.DoesNotExist:
                raise ValidationError("Obiekt nie istnieje lub nie masz do niego uprawnień.")
        if self.request.user.is_staff:
            return Agreement.objects.all()
        qs1 = Agreement.objects.filter(item__user=self.request.user)
        qs2 = Agreement.objects.filter(receiver=self.request.user)
        return qs1 | qs2

    def partial_update(self, request, *args, **kwargs):
        # Get appointment request/object values
        user = self.request.user
        obj = self.get_object()

        new_receiver_email = request.data.get("receiver_email")
        if new_receiver_email:
            try:
                receiver_user = User.objects.get(email=new_receiver_email)
                obj.receiver = receiver_user
            except User.DoesNotExist:
                pass
                # email = email_new_agree_receiver(item.name, item.user.email, date_start, date_stop)'

        with transaction.atomic():
            obj.save()
            response = super().partial_update(request, *args, **kwargs)

        return response
