#!/usr/bin/env node
/**
 * Bind createApp() to an OS-assigned port and print the base URL.
 * Python httpx fixtures spawn this process and read the first stdout line.
 */
import { createApp } from "../src/app.js";

const app = createApp();
const server = app.listen(0, "127.0.0.1", () => {
  const { port } = server.address();
  console.log(`http://127.0.0.1:${port}`);
});
