from django.utils.timezone import now
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from agreement.models import Agreement


class AgreementSerializer(serializers.ModelSerializer):
    priv_notes = serializers.SerializerMethodField()

    class Meta:
        model = Agreement
        fields = "__all__"

    def get_priv_desc(self, obj):
        # Private notes only available to the item owner
        user = self.context['request'].user
        if obj.item.user == user:
            return obj.priv_notes
        else:
            return None

    def validate(self, values):
        date_start = values['date_start']
        date_stop = values.get('date_stop', now().date())
        if date_start < now().date() or date_stop < now().date():
            raise ValidationError("Żadna z dat nie może być przeszła.")
        if date_start > date_stop:
            raise ValidationError("Data wypożyczenia musi być "
                                  "wcześniejsza od daty terminu oddania.")
        return values

# class UserAgreementCreateSerializer(ItemSerializer):
#
#     class Meta:
#         model = Item
#         fields = "__all__"
