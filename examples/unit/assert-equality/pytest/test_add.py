# Make the shared Python sample importable from this example folder
import sys
from pathlib import Path

# Walk up to the repo root (parents[4] from this file)
ROOT = Path(__file__).resolve().parents[4]
# Put samples/python-calc on sys.path so `import calc` works
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

# Import the pure function under test
from calc import add


def test_add_returns_sum():
    # Call the SUT, then assert exact equality with ==
    assert add(2, 3) == 5
