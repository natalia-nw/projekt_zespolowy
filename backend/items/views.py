from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny

from items.models import Item
from items.permissions import ItemAccess
from items.serializers import ItemSerializer, ReceiverItemSerializer, UserItemCreateSerializer, UserItemUpdateSerializer


class ItemList(generics.ListCreateAPIView):
    parser_class = [MultiPartParser, FormParser]
    name = "items"
    filterset_fields = ["public"]
    search_fields = ["name", "category"]
    ordering_fields = ["id", "name", "category", "created_at", "updated_at"]
    permission_classes = [IsAuthenticated, ItemAccess]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ItemSerializer
        return UserItemCreateSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Item.objects.all()
        return Item.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            serializer.validated_data["user"] = self.request.user
        serializer.save()


class ItemPublicList(generics.ListAPIView):
    name = "items"
    search_fields = ["name", "category"]
    ordering_fields = ["id", "name", "category", "created_at", "updated_at"]
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ItemSerializer
        return ReceiverItemSerializer

    def get_queryset(self):
        return Item.objects.filter(public=True)


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    parser_class = [MultiPartParser, FormParser]
    name = "item-detail"
    permission_classes = [ItemAccess]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ItemSerializer
        if self.request.user == self.get_object().user:
            return UserItemUpdateSerializer
        return ReceiverItemSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Item.objects.all()
        if self.request.user.is_authenticated:
            qs1 = Item.objects.filter(user=self.request.user)
        else:
            qs1 = Item.objects.none()
        qs2 = Item.objects.filter(public=True)
        return qs1 | qs2
