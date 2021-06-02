# Generated by Django 3.1.8 on 2021-05-31 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tiger', '0045_auto_20210530_2114'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickerstats',
            name='price_close',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tickerstats',
            name='price_high',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tickerstats',
            name='price_low',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tickerstats',
            name='price_open',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
