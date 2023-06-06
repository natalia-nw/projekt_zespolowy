from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Item, Deal
from reversion.admin import VersionAdmin


@admin.register(User, Item, Deal)
class MyModelAdmin(VersionAdmin):
    pass
