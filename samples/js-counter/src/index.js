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
