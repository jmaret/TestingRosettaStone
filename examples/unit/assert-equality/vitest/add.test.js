import { describe, it, expect } from "vitest";
import { add } from "../../../../samples/js-counter/src/index.js";

describe("add", () => {
  it("returns the sum of two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
