# Generated by Django 4.2.1 on 2023-05-16 08:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Nazwa')),
                ('desc', models.TextField(blank=True, max_length=9000, verbose_name='Opis (widoczny dla wypożyczających)')),
                ('priv_desc', models.TextField(blank=True, max_length=9000, verbose_name='Prywatny opis')),
                ('category', models.CharField(blank=True, choices=[('Książki', 'Książki'), ('Filmy, seriale', 'Filmy, seriale'), ('Gry wideo', 'Gry wideo'), ('Gry planszowe, karciane', 'Gry planszowe, karciane'), ('Sport', 'Sport'), ('Elektronika', 'Elektronika'), ('Narzędzia', 'Narzędzia'), ('Muzyka', 'Muzyka'), ('Zabawki', 'Zabawki'), ('Akcesoria na imprezy', 'Akcesoria na imprezy'), ('Akcesoria dla dzieci', 'Akcesoria dla dzieci'), ('Inne', 'Inne')], max_length=50, null=True, verbose_name='Kategoria')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='ItemImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/', verbose_name='Zdjęcie')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='items.item', verbose_name='Przedmiot')),
            ],
        ),
    ]