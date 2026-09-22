// Import the pure function under test from the shared sample
import { add } from "../../../../samples/js-counter/src/index.js";

// Group related examples under one describe block (Jest globals)
describe("add", () => {
  // One concrete behavior: 2 + 3 should equal 5
  it("returns the sum of two numbers", () => {
    // Call the SUT, then assert exact equality with toBe
    expect(add(2, 3)).toBe(5);
  });
});
