// Vitest runner + SuperTest HTTP assertions against Express
import { describe, it, expect } from "vitest";
import request from "supertest";
// Import the app factory — SuperTest drives it in-process (no real port)
import { createApp } from "../../../../samples/js-api/src/app.js";

describe("GET /items/:id missing", () => {
  it("returns the not_found JSON contract", async () => {
    const app = createApp();
    // SuperTest issues a real HTTP request through the Express stack
    const res = await request(app).get("/items/999");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "not_found", id: "999" });
  });
});
