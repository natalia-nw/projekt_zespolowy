from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from items.choices import Category

User = get_user_model()


class Item(models.Model):
    name = models.CharField(verbose_name=_("Nazwa"), max_length=255)
    desc = models.TextField(verbose_name=_("Opis (widoczny dla wypożyczających)"), blank=True, max_length=9000)
    priv_desc = models.TextField(verbose_name=_("Prywatny opis"), blank=True, max_length=9000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(verbose_name=_("Kategoria"), choices=Category.choices,
                                blank=True, null=True, max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ItemImage(models.Model):
    item = models.ForeignKey(Item, verbose_name=_("Przedmiot"), on_delete=models.CASCADE)
    image = models.ImageField(verbose_name=_("Zdjęcie"), upload_to='images/')

    def __str__(self):
        return self.item.name
