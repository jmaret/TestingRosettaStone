# TDD cycle: red (failing example) → green (smallest pass) → refactor.
# These tests are the order the coupon rules were added — not a dump after the fact.
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

from calc import apply_coupon


def test_no_coupon_leaves_the_subtotal():
    # Red #1: no published code → pay what you already owed
    assert apply_coupon(80, "") == 80


def test_save10_is_ten_percent_off():
    # Red #2: first real rule — SAVE10 is always 10% off
    assert apply_coupon(80, "SAVE10") == 72


def test_save20_ignored_below_minimum():
    # Red #3: SAVE20 only after a $50 cart
    assert apply_coupon(40, "SAVE20") == 40


def test_save20_is_twenty_percent_off_at_minimum():
    # Green follow-up for the same rule: at/above the floor, 20% off
    assert apply_coupon(80, "SAVE20") == 64


def test_unknown_coupon_is_ignored():
    # Guard: unknown marketing codes must not invent a discount
    assert apply_coupon(80, "NOSUCH") == 80
