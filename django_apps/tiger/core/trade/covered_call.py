from tiger.utils import timestamp_to_datetime_with_default_tz

from .base import Trade


class CoveredCall(Trade):
    def __init__(self, stock, legs, target_price_lower=None, target_price_upper=None):
        # TODO: add validation.
        super().__init__('covered_call', stock, legs, target_price_lower, target_price_upper)

    @property
    def display_name(self):
        short_call_leg = self.get_short_call_leg()
        expiration_date_str = timestamp_to_datetime_with_default_tz(short_call_leg.contract.expiration) \
            .strftime("%m/%d/%Y")
        return '[{}][Covered call] {} {} strike ${} - ${} at ${:.2f} per position' \
            .format(self.stock.ticker.symbol, '{}X'.format(short_call_leg.units) if short_call_leg.units > 1 else '',
                    expiration_date_str, short_call_leg.contract.strike, short_call_leg.contract.strike,
                    self.cost / short_call_leg.units)

    @property
    def break_even_price(self):
        return self.stock.stock_price - self.get_short_call_leg().contract.premium

    @property
    def profit_cap_price(self):
        return self.get_short_call_leg().contract.strike