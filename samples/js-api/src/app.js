import express from "express";

/** In-memory catalog — no DB so integration tests stay local and cheap. */
const ITEMS = new Map([["1", { id: "1", name: "Notebook" }]]);

/**
 * Build the Express app (no listen). Tests import this and bind a port themselves.
 */
export function createApp() {
  const app = express();
  // Parse JSON bodies if a later POST example needs them
  app.use(express.json());
  // Baseline browser-isolation headers — asserted by security.http-headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    next();
  });

  // Liveness probe — integration + load/microbench examples hit this
  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  // Read one item by id from the in-memory store
  app.get("/items/:id", (req, res) => {
    const item = ITEMS.get(req.params.id);
    if (!item) {
      // Stable error contract: same JSON shape for every missing id
      res.status(404).json({ error: "not_found", id: req.params.id });
      return;
    }
    res.json(item);
  });

  return app;
}
