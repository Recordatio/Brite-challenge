/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => {
  // Ignore uncaught exceptions to prevent test failure
  return false;
});

describe("Frontend e2e test cases 1", () => {
  const baseUrl = "https://www.imdb.com";

  it("Searches for Nicolas Cage and validates the first 'In Production' movie in Upcoming Credits", () => {
    // Step 1: Visit the IMDb homepage
    cy.visit(baseUrl);

    // Step 2: Search for "Nicolas Cage"
    cy.get('input[name="q"]').type("Nicolas Cage{enter}");

    // Step 3: Click on Nicolas Cage's profile from the search results
    cy.get(".find-name-result").contains("Nicolas Cage").click();

    // Step 4: Scroll to the "Credits" section
    cy.get("#credits").scrollIntoView().should("be.visible");

    // Step 5: Open the "Upcoming" tab using a forced click for Firefox compatibility
    cy.contains("Upcoming")
      .should("be.visible")
      .click({ force: true });

    // Step 6: Click on the first movie under the "In Production" section
    cy.get("#actor-upcoming-projects")
      .contains("In Production")
      .first()
      .parentsUntil("#actor-upcoming-projects")
      .find("a")
      .first()
      .should("be.visible")
      .click();
  });
});
