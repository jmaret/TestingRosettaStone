// Security contract: isolation headers on every JSON response
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../../../samples/js-api/src/app.js";

describe("security headers", () => {
  it("GET /health sends nosniff and DENY framing", async () => {
    const app = createApp();
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    // MIME sniffing off — browsers must honor application/json
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    // Do not allow this API response to be framed
    expect(res.headers["x-frame-options"]).toBe("DENY");
  });
});
