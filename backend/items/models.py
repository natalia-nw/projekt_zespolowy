import os
import uuid

from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from items.choices import Category

User = get_user_model()


class Item(models.Model):
    name = models.CharField(verbose_name=_("Nazwa"), max_length=255)
    desc = models.TextField(verbose_name=_("Opis"), blank=True, max_length=9000)
    priv_desc = models.TextField(verbose_name=_("Prywatny opis"), blank=True, max_length=9000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(verbose_name=_("Kategoria"), choices=Category.choices,
                                blank=True, null=True, max_length=50)
    public = models.BooleanField(verbose_name=_("Ogłoszenie publiczne"), default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


def generate_random_filename(instance, filename):
    # Generate a random filename using UUID
    extension = os.path.splitext(filename)[1]  # Get the file extension
    random_filename = f"items/{uuid.uuid4().hex}{extension}"
    return random_filename


class ItemImage(models.Model):
    item = models.ForeignKey(Item, verbose_name=_("Przedmiot"), on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(verbose_name=_("Zdjęcie"), upload_to=generate_random_filename)

    def __str__(self):
        return self.item.name
