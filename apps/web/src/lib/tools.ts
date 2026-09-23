export type ToolGuide = {
  id: string;
  name: string;
  homepage: string;
  role: string;
  overview: string;
  architecture: string;
};

export const TOOLS: Record<string, ToolGuide> = {
  vitest: {
    id: "vitest",
    name: "Vitest",
    homepage: "https://vitest.dev/",
    role: "Unit / component test runner (Vite-native)",
    overview:
      "Vitest is a fast test runner for JavaScript and TypeScript. Its API matches Jest (describe, it, expect, vi.fn), so teams can move between the two with little rewrite. It runs in Vite’s transform pipeline, which keeps ESM and modern syntax cheap.",
    architecture:
      "A runner process loads each test file, executes describe/it blocks, and reports pass/fail. Assertions come from expect(). The SUT is imported as a normal module — no HTTP server, no browser. Mocks live on vi (vi.fn, vi.mock).",
  },
  jest: {
    id: "jest",
    name: "Jest",
    homepage: "https://jestjs.io/",
    role: "Unit / component test runner",
    overview:
      "Jest is the long-standing default runner in many Node and React codebases. It bundles a runner, assertion library, mocking (jest.fn), and snapshot testing. This repo uses ESM via NODE_OPTIONS=--experimental-vm-modules.",
    architecture:
      "Jest discovers test files, wraps them in a VM, and provides describe/it/expect as globals (or via @jest/globals in ESM). The SUT is imported in-process. Isolation is per-file by default, not a real network hop.",
  },
  "node-test": {
    id: "node-test",
    name: "node:test",
    homepage: "https://nodejs.org/api/test.html",
    role: "Built-in Node.js test runner",
    overview:
      "node:test ships with Node — no extra test-framework dependency. You import describe/it from node:test and assert from node:assert/strict. Output is TAP-like diagnostics on the CLI.",
    architecture:
      "node --test loads files, runs each it() as a test, and fails the process on the first assertion throw. There is no built-in expect() matcher DSL; equality is assert.equal. The SUT is still a direct import.",
  },
  pytest: {
    id: "pytest",
    name: "pytest",
    homepage: "https://pytest.org/",
    role: "Python test runner",
    overview:
      "pytest is the usual Python runner: files named test_*.py, functions named test_*, rich fixtures, and first-class parametrize. Assertions are plain assert statements that pytest rewrites with better diffs.",
    architecture:
      "pytest collects test functions, optionally injects fixtures, and reports failures with the rewritten assertion. For unit examples here, the SUT is imported from samples/python-calc after sys.path is adjusted. No HTTP is involved.",
  },
  httpx: {
    id: "httpx",
    name: "pytest + httpx",
    homepage: "https://www.python-httpx.org/",
    role: "Python HTTP client used under pytest",
    overview:
      "httpx is a modern Python HTTP client (requests-like API, HTTP/2 capable). Combined with pytest it is the Python twin of SuperTest / Playwright request: a real GET/POST against a running server, then assert on status and JSON.",
    architecture:
      "pytest starts a fixture that spawns samples/js-api on an ephemeral port (Node script prints the base URL). httpx then issues a real TCP request to that process. After the test, the fixture terminates the server.",
  },
  supertest: {
    id: "supertest",
    name: "Supertest",
    homepage: "https://github.com/ladjs/supertest",
    role: "HTTP integration helper on top of a JS runner",
    overview:
      "Supertest drives an Express/Connect/Fastify app without you opening a public port. You pass the app instance; SuperTest injects requests through the middleware stack and exposes .get/.post plus status and body.",
    architecture:
      "This repo runs SuperTest inside Vitest. createApp() returns Express; request(app).get(...) walks routing and JSON handlers in-process. That is still an integration test (full HTTP stack) but cheaper than bind + curl.",
  },
  playwright: {
    id: "playwright",
    name: "Playwright (APIRequest)",
    homepage: "https://playwright.dev/",
    role: "Browser E2E toolkit — used here as an HTTP client",
    overview:
      "Playwright is best known for driving Chromium/Firefox/WebKit. It also ships APIRequest: a first-party HTTP client with the same expect() matchers. These scenarios launch no browser; they only use request.newContext().",
    architecture:
      "beforeAll binds createApp() to listen(0). Each test opens an APIRequest context aimed at that base URL, issues GET, and asserts status + JSON. afterAll closes the server. Same contract as SuperTest, over a real port.",
  },
  "playwright-browser": {
    id: "playwright-browser",
    name: "Playwright",
    homepage: "https://playwright.dev/",
    role: "Browser UX / E2E runner",
    overview:
      "Playwright launches a real browser (Chromium here), gives you a page object, and uses locators plus expect() to assert what the user sees. Traces and auto-waiting make flaky clicks easier to debug than raw WebDriver.",
    architecture:
      "webServer starts samples/js-ui. Each test opens a page, interacts through roles and CSS, and asserts URL or visible text. The SUT is HTML/CSS/JS in the browser — not an imported function.",
  },
  cypress: {
    id: "cypress",
    name: "Cypress",
    homepage: "https://www.cypress.io/",
    role: "Browser UX / E2E runner",
    overview:
      "Cypress runs tests in (or beside) the browser with a chainable API: cy.visit, cy.click, cy.should. The open-source runner is enough for these demos; we do not use Cypress Cloud.",
    architecture:
      "start-server-and-test boots js-ui, then cypress run visits the page, clicks, and asserts. Commands retry until the assertion passes or times out — that retry is Cypress’s default stability model.",
  },
};

const CATEGORY_ARCHITECTURE: Record<string, string> = {
  unit:
    "Unit tests call one function (or a small graph of functions) in the same process. They avoid I/O so failures point at logic, not the environment. The SUT is imported; the runner never starts Express or a browser.",
  integration:
    "Integration tests cross a real boundary — here, HTTP. The Express app in samples/js-api is the SUT. Variants either inject requests in-process (SuperTest) or speak TCP to an ephemeral port (Playwright request, pytest + httpx). Assertions target status codes and JSON contracts, not private helpers.",
  ux:
    "UX / E2E tests drive a real browser against samples/js-ui. The test is a user path: click a link or submit a form, then assert what appears on screen or in the URL. Failures point at markup, CSS, or client JS — not at a unit-tested helper alone.",
};

export function getToolGuide(toolId: string): ToolGuide | null {
  return TOOLS[toolId] ?? null;
}

export function resolveToolId(framework: string, label?: string): string {
  if (framework === "pytest" && label?.toLowerCase().includes("httpx")) return "httpx";
  return framework;
}

export function getCategoryArchitecture(category: string): string | null {
  return CATEGORY_ARCHITECTURE[category] ?? null;
}
