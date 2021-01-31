from tiger.utils import timestamp_to_datetime_with_default_tz

from .base import Trade


class BullCallSpread(Trade):
    def __init__(self, stock, legs, target_price_lower=None, target_price_upper=None):
        # TODO: add validation.
        super().__init__('bull_call_spread', stock, legs, target_price_lower, target_price_upper)

    @property
    def display_name(self):
        long_call_leg = self.get_long_call_leg()
        short_call_leg = self.get_short_call_leg()
        expiration_date_str = timestamp_to_datetime_with_default_tz(long_call_leg.contract.expiration) \
            .strftime("%m/%d/%Y")
        return '[{}][Bull call spread] {} {} strike ${} / ${} at ${:.2f} net debit' \
            .format(self.stock.ticker.symbol, '{}X'.format(long_call_leg.units) if long_call_leg.units > 1 else '',
                    expiration_date_str, long_call_leg.contract.strike, short_call_leg.contract.strike,
                    long_call_leg.contract.premium - short_call_leg.contract.premium)

    @property
    def break_even_price(self):
        return self.get_long_call_leg().contract.strike \
               + self.get_long_call_leg().contract.premium \
               - self.get_short_call_leg().contract.premium

    @property
    def profit_cap_price(self):
        return self.get_short_call_leg().contract.strike