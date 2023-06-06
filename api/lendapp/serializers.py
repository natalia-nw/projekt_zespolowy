from rest_framework import serializers
from lendapp.models import User, Image, Item, Deal
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, PasswordChangeSerializer
from django.utils.translation import gettext_lazy as _


class CustomRegisterSerializer(RegisterSerializer):
    username = None

    def custom_signup(self, request, user):
        user.email = self.validated_data.get('email', '')
        user.save()


class CustomLoginSerializer(LoginSerializer):
    username = None
    email = serializers.EmailField(required=True)


class CustomPasswordChangeSerializer(PasswordChangeSerializer):
    def validate_new_password2(self, value):
        password1 = self.get_initial().get('new_password1')
        if password1 != value:
            raise serializers.ValidationError(_('Passwords do not match'))
        return value


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'avatar', 'is_staff']


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
