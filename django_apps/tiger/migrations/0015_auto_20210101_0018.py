# Generated by Django 3.1.2 on 2021-01-01 05:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tiger', '0014_auto_20201231_1948'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Leg',
            new_name='LegSnapshot',
        ),
        migrations.RenameModel(
            old_name='Trade',
            new_name='TradeSnapshot',
        ),
    ]
