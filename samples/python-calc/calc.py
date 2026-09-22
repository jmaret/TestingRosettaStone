"""Tiny Python twin of the JS counter SUT."""


def add(a: float, b: float) -> float:
    # Pure arithmetic — no I/O, no side effects
    return a + b


def clamp(n: float, min_value: float, max_value: float) -> float:
    # Guard: a flipped range is a caller bug, not a silent no-op
    if min_value > max_value:
        raise ValueError("min must be <= max")
    # Raise floor first, then lower the ceiling
    return min(max_value, max(min_value, n))


def price_with_tax(tax_service, amount: float, region: str) -> float:
    # Ask the dependency for the rate (easy to mock in unit tests)
    rate = tax_service.get_tax_rate(region)
    # Gross = net × (1 + rate), e.g. 100 at 10% → 110
    return amount * (1 + rate)
