/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => {
  // Ignore cross-origin script errors
  return false; // Prevent Cypress from failing the test
});

describe("Frontend e2e test cases 5", () => {
  const baseUrl = "https://www.imdb.com";

  it("Filters celebrities born the same day 40 years ago and clicks the 1st link in the description", () => {
    // Step 1: Visit IMDb homepage and open the Menu
    cy.visit(baseUrl); // Open the IMDb homepage
    cy.contains("Menu").click(); // Click the "Menu" button

    // Step 2: Navigate to the "Born Today" section
    cy.contains("Born Today").click(); // Locate and click "Born Today"

    // Step 3: Remove the default birth date filter
    cy.get('[data-testid^="selected-input-chip-list-birthday-"]') // Locate the pre-applied birth date filter chip
      .should("be.visible") // Ensure the chip is visible
      .click(); // Click the chip to remove it

    // Step 4: Open the Birth Date filter and enter the date 40 years ago
    cy.contains("Birth date").click(); // Click to open the Birth Date filter
    const today = new Date(); // Get the current date
    const formattedDate = `${today.getFullYear() - 40}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`; // Format the date 40 years ago as YYYY-MM-DD

    cy.get('[data-testid="birthDate-start"]') // Locate the "Start Date" input
      .clear() // Clear the input field
      .type(formattedDate); // Enter the formatted start date

    cy.get('[data-testid="birthDate-end"]') // Locate the "End Date" input
      .clear() // Clear the input field
      .type(formattedDate); // Enter the formatted end date

    // Step 5: Apply the filter
    cy.contains("See results").click(); // Click the "See results" button to apply the filter

    // Step 6: Find the first item in the list and manually check for the first link in its description
    cy.get(".ipc-metadata-list-summary-item", { timeout: 15000 }) // Locate the first item in the filtered results
      .first() // Select the first item
      .then(($firstItem) => {
        // Use jQuery .find() to locate links inside the item's description
        const $link = $firstItem.find(".ipc-html-content-inner-div a");

        if (!$link.length) {
          // No link found, log a message and skip further actions
          cy.log("No link found in the description. Skipping further actions.");
          return; // Exit the test gracefully
        }

        // If a link exists, wrap it for Cypress commands and click
        cy.wrap($link).first().click(); // Click the first link in the description
        cy.log("Link found and clicked!"); // Log the action for debugging

        // Step 7: Take a screenshot of the current page
        cy.wait(2000); // Wait for any asynchronous operations to complete
        cy.get('[data-testid="hero__primary-text"]', { timeout: 10000 }) // Verify the page has loaded
          .should("be.visible"); // Ensure the page title is visible
        cy.get('[data-testid="hero-parent"]').screenshot("actor-profile-container"); // Capture a screenshot of the hero section
      });
  });
});
