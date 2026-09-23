# Same isolation-header contract as SuperTest, over a real TCP port
import sys
from pathlib import Path

import httpx
import pytest

# Shared spawn helper lives next to the integration examples
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "integration"))
from _node_api import start_api, stop_api


@pytest.fixture()
def base_url():
    proc, url = start_api()
    yield url
    stop_api(proc)


def test_health_sends_isolation_headers(base_url):
    res = httpx.get(f"{base_url}/health")
    assert res.status_code == 200
    assert res.headers["x-content-type-options"] == "nosniff"
    assert res.headers["x-frame-options"] == "DENY"
