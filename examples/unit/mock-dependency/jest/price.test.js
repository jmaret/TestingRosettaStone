// Explicit Jest ESM mock helper
import { jest } from "@jest/globals";
// Function that depends on an injected taxService
import { priceWithTax } from "../../../../samples/js-counter/src/index.js";

describe("priceWithTax", () => {
  it("applies the rate from the tax service", () => {
    // Stub collaborator: always return 10% for any region
    const taxService = {
      getTaxRate: jest.fn().mockReturnValue(0.1),
    };

    // 100 + 10% tax → 110 (floating compare)
    expect(priceWithTax(taxService, 100, "US-CA")).toBeCloseTo(110);
    // Prove the SUT asked the mock with the region we passed
    expect(taxService.getTaxRate).toHaveBeenCalledWith("US-CA");
  });
});
