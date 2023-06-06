from django.utils.timezone import now
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from agreement.choices import AgreementStatus
from items.models import Item

User = get_user_model()


class Agreement(models.Model):
    status = models.CharField(choices=AgreementStatus.choices, max_length=50, default=AgreementStatus.OWNER)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, verbose_name=_("Pożyczone dla"), blank=True, null=True, on_delete=models.CASCADE)
    receiver_email = models.EmailField(verbose_name=_("Pożyczone dla (email)"), blank=True)
    notes = models.TextField(verbose_name=_("Notatka"), blank=True, max_length=9000)
    priv_notes = models.TextField(verbose_name=_("Notatka prywatna"), blank=True, max_length=9000)
    date_start = models.DateField(verbose_name=_("Dzień wypożyczenia"))
    date_stop = models.DateField(verbose_name=_("Termin oddania"), blank=True)

    def __str__(self):
        return f"{self.item}, {self.date_start} - {self.date_stop}"
