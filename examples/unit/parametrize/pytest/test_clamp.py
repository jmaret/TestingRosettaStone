# Make the shared Python sample importable from this example folder
import sys
from pathlib import Path

import pytest

# Walk up to the repo root (parents[4] from this file)
ROOT = Path(__file__).resolve().parents[4]
# Put samples/python-calc on sys.path so `import calc` works
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

from calc import clamp


# Decorator expands one test function into many cases from the table
@pytest.mark.parametrize(
    ("n", "min_value", "max_value", "expected"),
    [
        (5, 0, 10, 5),  # already inside the range → unchanged
        (-1, 0, 10, 0),  # below min → raised to 0
        (99, 0, 10, 10),  # above max → lowered to 10
    ],
)
def test_clamp(n, min_value, max_value, expected):
    # Same assertion shape for every parametrized row
    assert clamp(n, min_value, max_value) == expected
