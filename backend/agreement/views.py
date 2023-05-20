from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now

from agreement.models import Agreement
from agreement.permissions import AgreementAccess
from agreement.serializers import AgreementSerializer


# Create your views here.
class AgreementList(generics.ListCreateAPIView):
    serializer_class = AgreementSerializer
    name = "agreements"
    search_fields = ["name", "category"]
    ordering_fields = ["id", "name", "category", "created_at", "updated_at"]
    permission_classes = [IsAuthenticated, AgreementAccess]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AgreementSerializer
        return self.serializer_class

    def get_queryset(self):
        if self.request.user.is_staff:
            return Agreement.objects.all()
        qs1 = Agreement.objects.filter(item__user=self.request.user)
        qs2 = Agreement.objects.filter(receiver=self.request.user)
        return qs1 | qs2

    def perform_create(self, serializer):
        if serializer.validated_data["proposal"]:
            serializer.validated_data["receiver"] = self.request.user
        serializer.save()
