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


class UserItemSerializer(ItemSerializer):
    priv_desc = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = "__all__"

    def get_priv_desc(self, obj):
        # Private description only available to the author
        user = self.context['request'].user
        if obj.user == user:
            return obj.priv_desc
        else:
            return None
