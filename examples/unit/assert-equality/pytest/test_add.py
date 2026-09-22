import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

from calc import add


def test_add_returns_sum():
    assert add(2, 3) == 5
