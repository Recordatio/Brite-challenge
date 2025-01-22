/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => {
  // Ignore cross-origin script errors
  return false;
});

describe("Frontend e2e test cases 3", () => {
  const baseUrl = "https://www.imdb.com";

  it("Filters photos for Danny Trejo in Breaking Bad and clicks the 2nd photo", () => {
    // Step 1: Visit IMDb and navigate to Top 250 TV Shows
    cy.visit(baseUrl);
    cy.contains("Menu").click();
    cy.contains("Top 250 TV Shows").click();

    // Step 2: Open Breaking Bad's page
    cy.contains("Breaking Bad").click();

    // Step 3: Open the Photos section
    cy.contains("Photos").scrollIntoView().click();
    cy.get('[data-testid="mv-gallery-button"]').click();

    // Step 4: Apply the filter for Danny Trejo
    cy.get('[data-testid="image-chip-dropdown-test-id"]').click();
    cy.get('[data-testid="select-dropdown-test-id"]')
      .first()
      .then(($dropdown) => {
        let selectedOption;
        $dropdown.find("option").each((_, option) => {
          if (option.textContent.includes("Danny Trejo")) {
            selectedOption = option.value;
          }
        });
        if (selectedOption) {
          cy.wrap($dropdown).select(selectedOption);
        } else {
          cy.log("Option for Danny Trejo not found.");
        }
      });

    cy.wait(2000); // Wait for UI updates
    cy.get('[class="ipc-icon-button ipc-icon-button--baseAlt ipc-icon-button--onBase"]').click();

    // Step 5: Click on the 2nd image in the filtered results
    cy.get('[data-testid="sub-section-images"] img', { timeout: 10000 })
      .should("be.visible")
      .eq(1)
      .click();

    // Step 6: Verify navigation and take a screenshot
    cy.url().should("include", "/mediaviewer/");
    cy.get("body").screenshot("filtered-photo-page");
  });
});
