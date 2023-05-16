from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from items.models import Item
from items.permissions import ItemAccess
from items.serializers import ItemSerializer, UserItemSerializer


class ItemList(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    name = "items"
    search_fields = ["name", "category", "pesel"]
    ordering_fields = ["id", "name", "category", "created_at", "updated_at"]
    permission_classes = [IsAuthenticated, ItemAccess]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ItemSerializer
        return UserItemSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Item.objects.all()
        return Item.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            serializer.validated_data["user"] = self.request.user
        serializer.save()


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    name = "item-detail"
    permission_classes = [IsAuthenticated, ItemAccess]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Item.objects.all()
        return Item.objects.filter(user=self.request.user)
