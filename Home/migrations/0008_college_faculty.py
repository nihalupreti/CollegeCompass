# Generated by Django 4.2.8 on 2024-02-21 15:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0007_faculty_delete_inquery'),
    ]

    operations = [
        migrations.AddField(
            model_name='college',
            name='faculty',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Home.faculty'),
        ),
    ]
