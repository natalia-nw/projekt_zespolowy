import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _
import reversion


class User(AbstractUser):
    email = models.EmailField(_('adres e-mail'), unique=True)
    phone = models.CharField(max_length=11, blank=True)
    avatar = models.ImageField(upload_to='avatars/')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


@reversion.register
class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    desc = models.TextField()

    def __str__(self):
        return self.name


class Image(models.Model):
    # name = models.CharField(max_length=255)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')


@reversion.register
class Deal(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    date_start = models.DateField(auto_now_add=True)
    date_stop = models.DateField(blank=True, null=True)
    lender = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.item.name


# class Post(models.Model):
#     item = models.ForeignKey(Item, on_delete=models.CASCADE)
#     date_start = models.DateField(blank=True, null=True)
#     date_stop = models.DateField(blank=True, null=True)
#     desc = models.TextField()
#
#
# class Message(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mauthor')
#     recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mrecipient')
#     message = models.TextField()
