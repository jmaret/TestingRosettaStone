// Bring in Vitest helpers, including table-driven `it.each`
import { describe, it, expect } from "vitest";
// Import the clamp helper under test
import { clamp } from "../../../../samples/js-counter/src/index.js";

describe("clamp", () => {
  // Each row is [n, min, max, expected] — one test run per row
  it.each([
    [5, 0, 10, 5], // already inside the range → unchanged
    [-1, 0, 10, 0], // below min → raised to 0
    [99, 0, 10, 10], // above max → lowered to 10
  ])("clamp(%i, %i, %i) -> %i", (n, min, max, expected) => {
    // Same assertion shape for every table row
    expect(clamp(n, min, max)).toBe(expected);
  });
});
