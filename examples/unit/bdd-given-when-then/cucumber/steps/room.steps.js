// Glue only — the examples live in room.feature so facilities/QA can read them.
import { Given, When, Then } from "@cucumber/cucumber";
import assert from "node:assert/strict";
import { reserveRoom } from "../../../../../samples/js-counter/src/index.js";

Given("{int} seats are free", function (seats) {
  this.seatsFree = seats;
});

Given("a party of {int}", function (size) {
  this.partySize = size;
});

When("I reserve the room", function () {
  this.result = reserveRoom(this.partySize, this.seatsFree);
});

Then("the reservation is confirmed", function () {
  assert.equal(this.result.confirmed, true);
});

Then("the reservation is refused", function () {
  assert.equal(this.result.confirmed, false);
});

Then("{int} seats remain", function (expected) {
  assert.equal(this.result.seatsFree, expected);
});
