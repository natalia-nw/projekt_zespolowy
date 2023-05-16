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


# class ItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Item
#         fields = "__all__"


class UserItemSerializer(ItemSerializer):
    class Meta:
        model = Item
        exclude = ('user',)
