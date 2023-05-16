from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.TextChoices):
    BOOKS = "Książki", _("Książki")
    TV = "Filmy, seriale", _("Filmy, seriale")
    VID_GAMES = "Gry wideo", _("Gry wideo")
    GAMES = "Gry planszowe, karciane", _("Gry planszowe, karciane")
    SPORT = "Sport", _("Sport")
    ELEC = "Elektronika", _("Elektronika")
    TOOLS = "Narzędzia", _("Narzędzia")
    MUSIC = "Muzyka", _("Muzyka")
    TOYS = "Zabawki", _("Zabawki")
    FUN = "Akcesoria na imprezy", _("Akcesoria na imprezy")
    BABY = "Akcesoria dla dzieci", _("Akcesoria dla dzieci")
    OTHER = "Inne", _("Inne")
