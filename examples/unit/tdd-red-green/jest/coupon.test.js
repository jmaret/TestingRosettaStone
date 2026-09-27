// TDD cycle: red (failing example) → green (smallest pass) → refactor.
// These tests are the order the coupon rules were added — not a dump after the fact.
import { applyCoupon } from "../../../../samples/js-counter/src/index.js";

describe("applyCoupon (TDD)", () => {
  // Red #1: no published code → pay what you already owed
  it("leaves the subtotal unchanged when there is no coupon", () => {
    expect(applyCoupon(80, "")).toBe(80);
  });

  // Red #2: first real rule — SAVE10 is always 10% off
  it("applies SAVE10 as ten percent off", () => {
    expect(applyCoupon(80, "SAVE10")).toBe(72);
  });

  // Red #3: SAVE20 only after a $50 cart (below the floor stays full price)
  it("ignores SAVE20 when the subtotal is under 50", () => {
    expect(applyCoupon(40, "SAVE20")).toBe(40);
  });

  // Green follow-up for the same rule: at/above the floor, 20% off
  it("applies SAVE20 as twenty percent off when the subtotal is at least 50", () => {
    expect(applyCoupon(80, "SAVE20")).toBe(64);
  });

  // Guard: unknown marketing codes must not invent a discount
  it("ignores an unknown coupon code", () => {
    expect(applyCoupon(80, "NOSUCH")).toBe(80);
  });
});
