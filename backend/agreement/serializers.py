from django.utils.timezone import now
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from agreement.models import Agreement


class AgreementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Agreement
        fields = "__all__"
        read_only_fields = ('item', 'receiver', 'status')

    def validate(self, values):
        date_start = values.get('date_start', now().date())
        date_stop = values.get('date_stop', now().date())
        if date_start < now().date() or date_stop < now().date():
            raise ValidationError("Żadna z dat nie może być przeszła.")
        if date_start > date_stop:
            raise ValidationError("Data wypożyczenia musi być "
                                  "wcześniejsza od daty terminu oddania.")
        return values


class AgreementReceiverSerializer(AgreementSerializer):
    class Meta:
        model = Agreement
        exclude = ('item', 'receiver', 'priv_notes')
        read_only_fields = ('status',)


class AgreementOwnerUpdateSerializer(AgreementSerializer):
    class Meta:
        model = Agreement
        fields = "__all__"
        read_only_fields = ('item', 'receiver')


class AgreementReceiverUpdateSerializer(AgreementReceiverSerializer):
    class Meta:
        model = Agreement
        exclude = ('priv_notes',)
        read_only_fields = ('item', 'receiver', 'receiver_email', 'notes', 'date_start', 'date_stop')
