# Generated by Django 4.2.1 on 2023-05-23 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agreement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agreement',
            name='proposal',
            field=models.BooleanField(default=True, verbose_name='Propozycja'),
        ),
    ]
