from django.db import models
from django.utils.translation import gettext_lazy as _


class AgreementStatus(models.TextChoices):
    OWNER = "Właściciel", _("Wpis właściciela")
    RECEIVER = "Zapytanie", _("Zapytanie otrzymującego")
    RECEIVER_CONFIRMED = "Zapytanie potwierdzone", _("Zapytanie potwierdzone")
    RECEIVER_CANCELLED = "Zapytanie anulowane", _("Zapytanie anulowane")
