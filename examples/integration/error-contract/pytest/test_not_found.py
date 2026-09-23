# Spawn the Node API, then GET a missing id with httpx
import sys
from pathlib import Path

import httpx
import pytest

# Import the shared spawn helper from examples/integration/
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from _node_api import start_api, stop_api


@pytest.fixture()
def base_url():
    # Start Express on an ephemeral port; first stdout line is the URL
    proc, url = start_api()
    yield url
    stop_api(proc)


def test_missing_item_error_contract(base_url):
    # Real HTTP GET — expect the documented 404 JSON shape
    res = httpx.get(f"{base_url}/items/999")
    assert res.status_code == 404
    assert res.json() == {"error": "not_found", "id": "999"}
