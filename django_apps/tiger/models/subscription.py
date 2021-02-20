import base64
import json

import requests
from django.conf import settings
from django.db import models
from tiger.utils import get_now

from .base import BaseModel
from .user import User


class Subscription(BaseModel):
    STATUS_CHOICES = (
        ('', 'Unknown'),
        ('INACTIVE', 'Inactive'),
        ('ACTIVE', 'Active'),
    )

    paypal_subscription_id = models.CharField(max_length=200, unique=True)
    paypal_plan_id = models.CharField(max_length=200, null=True, blank=True)
    status = models.CharField("Subscription status", max_length=200, default='', choices=STATUS_CHOICES)
    last_checked = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    cancellation_reason = models.TextField(null=True, blank=True)

    def get_paypal_headers(self):
        encoded = base64.b64encode(
            bytes(f'{settings.PAYPAL_CLIENT_ID}:{settings.PAYPAL_SECRET}', 'UTF-8'))
        return {
            "Content-Type": "application/json",
            "Authorization": f"Basic {encoded.decode('ascii')}"
        }

    def get_detail(self):
        response = requests.get(
            f'{settings.PAYPAL_ENDPOINT}/v1/billing/subscriptions/{self.paypal_subscription_id}',
            headers=self.get_paypal_headers())
        response.raise_for_status()
        return response

    def cancel(self, reason):
        # make api call to cancel subscription
        data = {"reason": reason}
        url = f'{settings.PAYPAL_ENDPOINT}/v1/billing/subscriptions/{self.paypal_subscription_id}/cancel'
        response = requests.post(url, data=json.dumps(data), headers=self.get_paypal_headers())
        response.raise_for_status()
        self.cancellation_reason = reason
        self.save()
