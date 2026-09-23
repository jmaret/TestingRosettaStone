// Cypress browser test — same click → URL/heading contract as Playwright
describe("navigation", () => {
  it("clicking About shows the about heading", () => {
    // Load the home page served by samples/js-ui
    cy.visit("/index.html");
    // Click the same nav control a user would
    cy.contains("a", "About").click();
    // URL and heading are the observable UX contract
    cy.url().should("include", "about.html");
    cy.get("h1").should("have.text", "About this counter");
  });
});
