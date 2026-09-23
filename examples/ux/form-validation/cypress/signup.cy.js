// Cypress browser test — same empty-submit contract as Playwright
describe("signup form", () => {
  it("empty submit shows Name is required", () => {
    cy.visit("/signup.html");
    // Click Submit without typing a name
    cy.contains("button", "Submit").click();
    cy.get("#name-error").should("be.visible").and("have.text", "Name is required");
  });
});
