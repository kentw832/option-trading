# Generated by Django 3.1.8 on 2021-05-31 01:14

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tiger', '0044_auto_20210530_1337'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='disabled_strategies',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), blank=True, default=list, size=None),
        ),
    ]
