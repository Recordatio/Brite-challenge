/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => {
  // Ignore cross-origin script errors to prevent test failure
  return false;
});

describe("Frontend e2e test cases 2", () => {
  const baseUrl = "https://www.imdb.com";

  it("Rates the 2nd movie in Top Box Office with 5 stars", () => {
    // Step 1: Visit IMDb homepage
    cy.visit(baseUrl);

    // Step 2: Open the menu
    cy.contains("Menu").click(); // Locate and click the "Menu" button

    // Step 3: Navigate to the "Top Box Office" section
    cy.contains("Top Box Office").click(); // Find and click "Top Box Office"

    // Step 4: Select and open the 2nd movie in the Top Box Office list
    cy.get('.ipc-title__text') // Locate all movie titles in the list
      .eq(3) // Select the 2nd movie (adjusting for 0-based indexing)
      .click(); // Open the movie's details page

    // Step 5: Click on the rating section
    cy.get('[class="sc-d541859f-3 dwhNqC"]').first().click(); // Click the rating section on the page

    // Step 6: Open the rating modal
    cy.contains("Rate").click(); // Locate and click the "Rate" button

    // Step 7: Select 5 stars in the rating modal
    cy.get('[aria-label="Rate 5"]') // Locate the 5-star rating button
      .wait(2000) // Allow animations or UI updates to complete
      .click({ force: true }); // Click the 5-star rating, forcing if necessary

    // Step 8: Confirm the rating
    cy.get('.ipc-btn--core-accent1') // Locate the "Rate" confirmation button
      .contains("Rate") // Ensure it matches the "Rate" text
      .click({ force: true }); // Click to submit the rating
  });
});
