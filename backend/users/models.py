from django.contrib.auth.models import AbstractUser, Group, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name=_("E-mail"), unique=True)
    phone_number = PhoneNumberField(verbose_name=_("Numer telefonu"), blank=True)
    bio = models.CharField(verbose_name=_("Biogram"), max_length=200, blank=True)
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, upload_to='avatars/')

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("Użytkownik")
        verbose_name_plural = _("Użytkownicy")
        ordering = ["id"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# class Group(Group):  # Proxy model to display the default Group model in users page
#     class Meta:
#         proxy = True
#         verbose_name = _("Grupa")
#         verbose_name_plural = _("Grupy")
