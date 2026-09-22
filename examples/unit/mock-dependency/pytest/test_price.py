# Make the shared Python sample importable from this example folder
import sys
from pathlib import Path
# unittest.mock.Mock is the pytest-world twin of vi.fn / jest.fn
from unittest.mock import Mock

import pytest

# Walk up to the repo root (parents[4] from this file)
ROOT = Path(__file__).resolve().parents[4]
# Put samples/python-calc on sys.path so `import calc` works
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

from calc import price_with_tax


def test_price_with_tax_uses_service_rate():
    # Stub collaborator and configure the rate it should return
    tax_service = Mock()
    tax_service.get_tax_rate.return_value = 0.1

    # 100 + 10% tax → 110 (approx for floats)
    assert price_with_tax(tax_service, 100, "US-CA") == pytest.approx(110)
    # Prove the SUT asked the mock with the region we passed
    tax_service.get_tax_rate.assert_called_once_with("US-CA")
