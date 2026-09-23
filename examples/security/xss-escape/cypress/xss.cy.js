// Cypress XSS oracle — same textContent contract as Playwright
const payload = `<img src=x onerror="window.__xss=1">`;

describe("xss escape", () => {
  it("script-like name is shown as text and does not run", () => {
    cy.visit("/signup.html");
    cy.get("#name").type(payload, { parseSpecialCharSequences: false });
    cy.contains("button", "Submit").click();
    cy.get("#thanks-name").should("have.text", payload);
    cy.window().should((win) => {
      expect(win.__xss).to.equal(undefined);
    });
    cy.get("#success img").should("not.exist");
  });
});
