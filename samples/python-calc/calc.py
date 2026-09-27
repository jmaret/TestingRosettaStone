"""Tiny Python twin of the JS counter SUT."""

from typing import Optional


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


def apply_coupon(subtotal: float, coupon: Optional[str] = None) -> float:
    """Apply a published checkout coupon. Twin of JS applyCoupon()."""
    if subtotal < 0:
        raise ValueError("subtotal must be a non-negative number")
    # SAVE10: always 10% off
    if coupon == "SAVE10":
        return subtotal * 0.9
    # SAVE20: 20% off only when the cart is at least 50
    if coupon == "SAVE20" and subtotal >= 50:
        return subtotal * 0.8
    # Missing, unknown, or SAVE20-below-minimum → pay the original subtotal
    return subtotal


def reserve_room(party_size: int, seats_free: int) -> dict:
    """Reserve seats. Twin of JS reserveRoom() — used only by the BDD scenario."""
    if party_size < 1:
        raise ValueError("partySize must be at least 1")
    if seats_free < 0:
        raise ValueError("seatsFree must be a non-negative number")
    if party_size > seats_free:
        return {"confirmed": False, "seats_free": seats_free}
    return {"confirmed": True, "seats_free": seats_free - party_size}
