from django.db import transaction
from rest_framework import serializers

from items.models import Item, ItemImage


class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    images = ItemImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )
    image_ids_to_delete = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Item
        fields = ["id", "name", "desc", "priv_desc", "user", "category", "public", "created_at", "updated_at",
                  "images", "uploaded_images", "image_ids_to_delete"]

    def create(self, validated_data):
        try:
            uploaded_images = validated_data.pop("uploaded_images", [])
        except KeyError:
            uploaded_images = []
        item = Item.objects.create(**validated_data)

        for image in uploaded_images:
            ItemImage.objects.create(item=item, image=image)

        return item

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", [])

        # Update the fields of the Item instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        with transaction.atomic():
            # Save the modified Item instance
            instance.save()

            # Process uploaded images
            for image in uploaded_images:
                ItemImage.objects.create(item=instance, image=image)

            # Delete specific images if requested
            image_ids_to_delete = validated_data.pop("image_ids_to_delete", [])
            if image_ids_to_delete:
                ItemImage.objects.filter(item=instance, id__in=image_ids_to_delete).delete()

        return instance


class UserItemCreateSerializer(ItemSerializer):
    image_ids_to_delete = None
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Item
        fields = "__all__"


class UserItemUpdateSerializer(ItemSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Item
        fields = "__all__"


class ReceiverItemSerializer(UserItemCreateSerializer):
    class Meta:
        model = Item
        exclude = ("priv_desc",)
