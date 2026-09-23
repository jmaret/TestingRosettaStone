# Spawn the Node API, then GET with httpx (Python HTTP client)
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


def test_get_known_item(base_url):
    # Real HTTP GET against the running Node process
    res = httpx.get(f"{base_url}/items/1")
    assert res.status_code == 200
    assert res.json() == {"id": "1", "name": "Notebook"}
