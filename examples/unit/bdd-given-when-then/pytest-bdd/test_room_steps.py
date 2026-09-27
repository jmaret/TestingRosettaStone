# Glue only — the examples live in room.feature so facilities/QA can read them.
import re
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "samples" / "python-calc"))

from calc import reserve_room

FEATURE = Path(__file__).resolve().parent.parent / "room.feature"

try:
    from pytest_bdd import given, parsers, scenarios, then, when

    scenarios(str(FEATURE))

    @given(parsers.parse("{seats:d} seats are free"), target_fixture="seats_free")
    def given_seats_free(seats):
        return seats

    @given(parsers.parse("a party of {size:d}"), target_fixture="party_size")
    def given_party_size(size):
        return size

    @when("I reserve the room", target_fixture="result")
    def reserve(party_size, seats_free):
        return reserve_room(party_size, seats_free)

    @then("the reservation is confirmed")
    def confirmed(result):
        assert result["confirmed"] is True

    @then("the reservation is refused")
    def refused(result):
        assert result["confirmed"] is False

    @then(parsers.parse("{left:d} seats remain"))
    def seats_remain(result, left):
        assert result["seats_free"] == left

except ImportError:
    _SCENARIO = re.compile(r"^\s+Scenario:\s+(.+)$")
    _SEATS = re.compile(r"(\d+) seats are free")
    _PARTY = re.compile(r"a party of (\d+)")
    _REMAIN = re.compile(r"(\d+) seats remain")

    def _cases():
        rows = []
        name = seats = party = remain = None
        confirmed = None
        for line in FEATURE.read_text().splitlines():
            heading = _SCENARIO.match(line)
            if heading:
                if name:
                    rows.append((name, party, seats, confirmed, remain))
                name = heading.group(1).strip()
                seats = party = remain = confirmed = None
                continue
            found = _SEATS.search(line)
            if found:
                seats = int(found.group(1))
            found = _PARTY.search(line)
            if found:
                party = int(found.group(1))
            if "reservation is confirmed" in line:
                confirmed = True
            if "reservation is refused" in line:
                confirmed = False
            found = _REMAIN.search(line)
            if found:
                remain = int(found.group(1))
        if name:
            rows.append((name, party, seats, confirmed, remain))
        return rows

    @pytest.mark.parametrize("name,party,seats,confirmed,remain", _cases())
    def test_feature_scenario(name, party, seats, confirmed, remain):
        result = reserve_room(party, seats)
        assert result["confirmed"] is confirmed
        assert result["seats_free"] == remain
