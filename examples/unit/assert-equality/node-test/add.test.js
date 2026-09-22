import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { add } from "../../../../samples/js-counter/src/index.js";

describe("add", () => {
  it("returns the sum of two numbers", () => {
    assert.equal(add(2, 3), 5);
  });
});
