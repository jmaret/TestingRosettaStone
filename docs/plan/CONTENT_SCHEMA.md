# Scenario content schema (draft)

Canonical TypeScript types for scenario metadata. When the web app lands, mirror this with Zod and a JSON Schema export for CI validation.

```ts
export type TestCategory =
  | "unit"
  | "integration"
  | "ux"
  | "performance"
  | "a11y";

export type ScenarioVariant = {
  /** Stable id, e.g. "vitest" | "pytest" | "playwright" */
  framework: string;
  /** Human label */
  label: string;
  language: "typescript" | "javascript" | "python" | "java" | "go" | "gherkin";
  /** SPDX license id of the framework itself */
  frameworkLicense: string;
  /** Paths relative to repo root */
  files: string[];
  /** Verified locally and in CI */
  run: {
    cwd: string;
    command: string;
  };
  /** Idiomatic differences vs the “primary” variant */
  notes?: string;
  /** How this variant reaches the SUT */
  architecture?: string;
  /** Shared tool-catalog key (default: framework) */
  toolId?: string;
};

export type Scenario = {
  id: string;
  title: string;
  category: TestCategory;
  /** One-sentence concept */
  summary: string;
  /** Longer teaching blurb (markdown) */
  description: string;
  /** How this scenario is structured, independent of framework */
  architecture?: string;
  /** Sample under test id */
  sut: string;
  tags: string[];
  variants: ScenarioVariant[];
};
```

## Example instance

```json
{
  "id": "unit.assert-equality",
  "title": "Assert equality on a pure function",
  "category": "unit",
  "summary": "Call a pure function and assert the exact result.",
  "description": "The smallest useful unit test: no I/O, no mocks, one behavior.",
  "sut": "js-counter",
  "tags": ["assert", "pure-function", "beginner"],
  "variants": [
    {
      "framework": "vitest",
      "label": "Vitest",
      "language": "typescript",
      "frameworkLicense": "MIT",
      "files": ["examples/unit/assert-equality/vitest/add.test.ts"],
      "run": {
        "cwd": "examples/unit/assert-equality/vitest",
        "command": "npx vitest run"
      }
    },
    {
      "framework": "pytest",
      "label": "pytest",
      "language": "python",
      "frameworkLicense": "MIT",
      "files": ["examples/unit/assert-equality/pytest/test_add.py"],
      "run": {
        "cwd": "examples/unit/assert-equality/pytest",
        "command": "pytest"
      }
    }
  ]
}
```
