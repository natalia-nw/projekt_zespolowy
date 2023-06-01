from rest_framework import serializers

from items.models import Item, ItemImage


class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = ['image']


class ItemSerializer(serializers.ModelSerializer):
    images = ItemImageSerializer(many=True, required=False)

    class Meta:
        model = Item
        fields = "__all__"


class UserItemCreateSerializer(ItemSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Item
        fields = "__all__"


class AuthorUserItemSerializer(ItemSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Item
        fields = "__all__"


class UserItemSerializer(AuthorUserItemSerializer):
    class Meta:
        model = Item
        exclude = ("priv_desc",)
