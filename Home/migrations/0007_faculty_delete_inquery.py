# Generated by Django 4.2.8 on 2024-02-21 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0006_inquery'),
    ]

    operations = [
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('faculty_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='Inquery',
        ),
    ]