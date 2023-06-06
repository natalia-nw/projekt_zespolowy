from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer


User = get_user_model()


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "first_name", "last_name", "phone_number", "bio", "image"]
