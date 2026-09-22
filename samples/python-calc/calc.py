"""Tiny Python twin of the JS counter SUT."""


def add(a: float, b: float) -> float:
    return a + b


def clamp(n: float, min_value: float, max_value: float) -> float:
    if min_value > max_value:
        raise ValueError("min must be <= max")
    return min(max_value, max(min_value, n))


def price_with_tax(tax_service, amount: float, region: str) -> float:
    rate = tax_service.get_tax_rate(region)
    return amount * (1 + rate)
