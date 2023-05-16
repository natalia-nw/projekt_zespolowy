from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
User = get_user_model()


# @reversion.register
class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Nazwa"), max_length=255)
    desc = models.TextField(verbose_name=_("Opis"), max_length=9000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ItemImage(models.Model):
    item = models.ForeignKey(Item, verbose_name=_("Przedmiot"), on_delete=models.CASCADE)
    image = models.ImageField(verbose_name=_("Zdjęcie"), upload_to='images/')

    def __str__(self):
        return self.item.name
