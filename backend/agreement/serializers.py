from django.utils.timezone import now
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from agreement.models import Agreement


class AgreementSerializer(serializers.ModelSerializer):
    # item = serializers.PrimaryKeyRelatedField(read_only=True)
    # receiver = serializers.PrimaryKeyRelatedField(read_only=True)
    # status = serializers.CharField(read_only=True)
    # priv_notes = serializers.CharField(required=False, label="Notatka prywatna")

    class Meta:
        model = Agreement
        fields = "__all__"
        read_only_fields = ('item', 'receiver', 'status', 'priv_notes')

    def get_priv_notes(self, obj):
        # Private notes only available to the item owner
        user = self.context['request'].user
        if obj.item.user == user:
            return obj.priv_notes
        else:
            return None

    def validate(self, values):
        date_start = values.get('date_start', now().date())
        date_stop = values.get('date_stop', now().date())
        if date_start < now().date() or date_stop < now().date():
            raise ValidationError("Żadna z dat nie może być przeszła.")
        if date_start > date_stop:
            raise ValidationError("Data wypożyczenia musi być "
                                  "wcześniejsza od daty terminu oddania.")
        return values


# class ItemAgreementCreateSerializer(AgreementSerializer):
#     item = serializers.PrimaryKeyRelatedField(read_only=True)
#     receiver = serializers.PrimaryKeyRelatedField(read_only=True)
#     status = serializers.CharField(read_only=True)
#     priv_notes = serializers.CharField(required=False)
#
#     class Meta:
#         model = Agreement
#         fields = "__all__"
#         # exclude = ['item', 'receiver', 'status', 'priv_notes']
#
#
# class ItemOwnerAgreementCreateSerializer(AgreementSerializer):
#     class Meta:
#         model = Agreement
#         # fields = "__all__"
#         exclude = ['item', 'receiver', 'status']
