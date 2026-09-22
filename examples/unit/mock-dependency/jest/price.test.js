import { jest } from "@jest/globals";
import { priceWithTax } from "../../../../samples/js-counter/src/index.js";

describe("priceWithTax", () => {
  it("applies the rate from the tax service", () => {
    const taxService = {
      getTaxRate: jest.fn().mockReturnValue(0.1),
    };

    expect(priceWithTax(taxService, 100, "US-CA")).toBeCloseTo(110);
    expect(taxService.getTaxRate).toHaveBeenCalledWith("US-CA");
  });
});
