// Vitest runner + SuperTest HTTP assertions against Express
import { describe, it, expect } from "vitest";
import request from "supertest";
// Import the app factory — SuperTest drives it in-process (no real port)
import { createApp } from "../../../../samples/js-api/src/app.js";

describe("GET /items/:id", () => {
  it("returns the known item", async () => {
    const app = createApp();
    // SuperTest issues a real HTTP request through the Express stack
    const res = await request(app).get("/items/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "1", name: "Notebook" });
  });
});
