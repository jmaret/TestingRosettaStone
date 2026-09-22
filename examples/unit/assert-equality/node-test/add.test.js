// Node's built-in test runner — no third-party test framework
import { describe, it } from "node:test";
// Strict assert helpers (throws on failure)
import assert from "node:assert/strict";
// Import the pure function under test from the shared sample
import { add } from "../../../../samples/js-counter/src/index.js";

// Group related examples under one describe block
describe("add", () => {
  // One concrete behavior: 2 + 3 should equal 5
  it("returns the sum of two numbers", () => {
    // Call the SUT, then assert exact equality
    assert.equal(add(2, 3), 5);
  });
});
