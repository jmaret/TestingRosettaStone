import sys
from pathlib import Path
from unittest.mock import Mock

import pytest

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

from calc import price_with_tax


def test_price_with_tax_uses_service_rate():
    tax_service = Mock()
    tax_service.get_tax_rate.return_value = 0.1

    assert price_with_tax(tax_service, 100, "US-CA") == pytest.approx(110)
    tax_service.get_tax_rate.assert_called_once_with("US-CA")
