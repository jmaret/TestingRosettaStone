import { clamp } from "../../../../samples/js-counter/src/index.js";

describe("clamp", () => {
  it.each([
    [5, 0, 10, 5],
    [-1, 0, 10, 0],
    [99, 0, 10, 10],
  ])("clamp(%i, %i, %i) -> %i", (n, min, max, expected) => {
    expect(clamp(n, min, max)).toBe(expected);
  });
});
