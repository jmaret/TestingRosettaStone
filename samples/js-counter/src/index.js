/** Tiny shared system under test for unit/UX demos. */

/**
 * @param {number} a
 * @param {number} b
 */
export function add(a, b) {
  return a + b;
}

/**
 * Clamp n into [min, max].
 * @param {number} n
 * @param {number} min
 * @param {number} max
 */
export function clamp(n, min, max) {
  if (min > max) {
    throw new Error("min must be <= max");
  }
  return Math.min(max, Math.max(min, n));
}

/**
 * @param {{ getTaxRate: (code: string) => number }} taxService
 * @param {number} amount
 * @param {string} region
 */
export function priceWithTax(taxService, amount, region) {
  const rate = taxService.getTaxRate(region);
  return amount * (1 + rate);
}
