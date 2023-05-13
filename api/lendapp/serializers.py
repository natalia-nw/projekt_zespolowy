from rest_framework import serializers
from lendapp.models import User, Image, Item, Deal
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from django.utils.translation import gettext_lazy as _


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=False, write_only=True)
    phone = serializers.CharField(max_length=11, required=False)

    def custom_signup(self, request, user):
        user.email = self.validated_data.get('email', '')
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.phone = self.validated_data.get('phone', '')
        user.save()


class CustomLoginSerializer(LoginSerializer):
    username = None
    email = serializers.EmailField(required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'avatar', 'is_active', 'is_staff']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Item
        fields = ['id', 'user', 'name', 'desc', 'images']


class DealSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deal
        fields = ['item', 'date_start', 'date_stop', 'lender']
