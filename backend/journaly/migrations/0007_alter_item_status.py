# Generated by Django 4.0b1 on 2021-11-10 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journaly', '0006_alter_item_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='Status',
            field=models.CharField(choices=[('Completed', 'Completed'), ('Pending', 'Pending')], max_length=10),
        ),
    ]
