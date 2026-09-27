/** Tiny shared system under test for unit/UX demos. */

/**
 * Add two numbers and return their sum.
 * @param {number} a - First operand
 * @param {number} b - Second operand
 */
export function add(a, b) {
  // Pure arithmetic — no I/O, no side effects
  return a + b;
}

/**
 * Keep n inside the inclusive range [min, max].
 * @param {number} n - Value to clamp
 * @param {number} min - Lower bound
 * @param {number} max - Upper bound
 */
export function clamp(n, min, max) {
  // Guard: a flipped range is a caller bug, not a silent no-op
  if (min > max) {
    throw new Error("min must be <= max");
  }
  // Raise floor first, then lower the ceiling
  return Math.min(max, Math.max(min, n));
}

/**
 * Apply a region tax rate from an injected service.
 * @param {{ getTaxRate: (code: string) => number }} taxService - Collaborator that owns tax rates
 * @param {number} amount - Pre-tax amount
 * @param {string} region - Region code passed to the tax service
 */
export function priceWithTax(taxService, amount, region) {
  // Ask the dependency for the rate (easy to mock in unit tests)
  const rate = taxService.getTaxRate(region);
  // Gross = net × (1 + rate), e.g. 100 at 10% → 110
  return amount * (1 + rate);
}

/**
 * Apply a published checkout coupon to a subtotal.
 * Grown via TDD in unit.tdd-red-green (this scenario only — BDD uses reserveRoom).
 * @param {number} subtotal - Cart total before the coupon
 * @param {string} [coupon] - Published code, or empty / unknown
 */
export function applyCoupon(subtotal, coupon) {
  if (typeof subtotal !== "number" || subtotal < 0) {
    throw new Error("subtotal must be a non-negative number");
  }
  // SAVE10: always 10% off
  if (coupon === "SAVE10") {
    return subtotal * 0.9;
  }
  // SAVE20: 20% off only when the cart is at least 50
  if (coupon === "SAVE20" && subtotal >= 50) {
    return subtotal * 0.8;
  }
  // Missing, unknown, or SAVE20-below-minimum → pay the original subtotal
  return subtotal;
}

/**
 * Reserve seats in a meeting room.
 * Specified in Gherkin in unit.bdd-given-when-then (this scenario only — TDD uses applyCoupon).
 * @param {number} partySize - Guests who want the room
 * @param {number} seatsFree - Seats still open
 * @returns {{ confirmed: boolean, seatsFree: number }}
 */
export function reserveRoom(partySize, seatsFree) {
  if (typeof partySize !== "number" || partySize < 1) {
    throw new Error("partySize must be at least 1");
  }
  if (typeof seatsFree !== "number" || seatsFree < 0) {
    throw new Error("seatsFree must be a non-negative number");
  }
  if (partySize > seatsFree) {
    return { confirmed: false, seatsFree };
  }
  return { confirmed: true, seatsFree: seatsFree - partySize };
}
