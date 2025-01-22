/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => {
  // Ignore cross-origin script errors
  return false;
});

describe("Frontend e2e test cases 4", () => {
  const baseUrl = "https://www.imdb.com";

  it("Filters celebrities born yesterday and clicks the 3rd name", () => {
    // Step 1: Visit IMDb and open the menu
    cy.visit(baseUrl);
    cy.contains("Menu").click();

    // Step 2: Navigate to the "Born Today" section
    cy.contains("Born Today").click();

    // Step 3: Click on the specific birthday chip by data-testid
    cy.get('[data-testid^="selected-input-chip-list-birthday-01-"]', { timeout: 10000 })
      .should("be.visible")
      .click();

    // Step 4: Open the Birthday filter and enter yesterday's date
    cy.contains("Birthday").click();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = `${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(
      yesterday.getDate()
    ).padStart(2, "0")}`;

    cy.get('[data-testid="birthday-input-test-id"]').clear().type(formattedDate).type("{enter}");

    // Step 5: Apply the filter and select the 3rd name
    cy.contains("See results").click();
    cy.get(".ipc-metadata-list-summary-item", { timeout: 10000 })
      .eq(2) // Select the 3rd item
      .scrollIntoView()
      .within(() => {
        cy.get("a").first().click(); // Click the name link
      });

    // Step 6: Verify the profile page and take a screenshot
    cy.url().should("include", "/name/");
    cy.get('[data-testid="hero__primary-text"]', { timeout: 10000 }).should("be.visible");
    cy.get('[data-testid="hero-parent"]').screenshot("actor-profile-container");
  });
});
