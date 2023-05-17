from django.contrib.auth.models import AbstractUser, Group
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Users require an email field")
        email = self.normalize_email(email)
        if type is not None:
            user = self.model(email=email, type=type, **extra_fields)
        else:
            user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        if type is not None:
            return self._create_user(email, password, **extra_fields)
        else:
            return self._create_user(email, password, **extra_fields)

    def _create_superuser(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Users require an email field")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_superuser(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name=_("E-mail"), unique=True)
    phone_number = PhoneNumberField(verbose_name=_("Numer telefonu"), blank=True)
    bio = models.CharField(verbose_name=_("Biogram"), max_length=200, blank=True)
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, upload_to='avatars/')

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("Użytkownik")
        verbose_name_plural = _("Użytkownicy")
        ordering = ["id"]

    def __str__(self):
        return f"({self.id}) {self.email} {self.first_name} {self.last_name}"


# class Group(Group):  # Proxy model to display the default Group model in users page
#     class Meta:
#         proxy = True
#         verbose_name = _("Grupa")
#         verbose_name_plural = _("Grupy")
