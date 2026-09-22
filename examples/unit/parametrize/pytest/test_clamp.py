import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

from calc import clamp


@pytest.mark.parametrize(
    ("n", "min_value", "max_value", "expected"),
    [
        (5, 0, 10, 5),
        (-1, 0, 10, 0),
        (99, 0, 10, 10),
    ],
)
def test_clamp(n, min_value, max_value, expected):
    assert clamp(n, min_value, max_value) == expected
