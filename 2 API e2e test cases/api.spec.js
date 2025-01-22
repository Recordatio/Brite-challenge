/// <reference types="cypress" />

// Tests for Pokémon API: Berries and Berry Flavors

describe("1. GET /berry by ID (valid & invalid) Tests", () => {
  // Test fetching a berry using a valid ID
  it("Fetches berry with valid ID = 1", () => {
    cy.request({
      method: "GET",
      url: "https://pokeapi.co/api/v2/berry/1",
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the status code is 200
      expect(response.body.item.name).to.eq("cheri-berry"); // Validate the berry name
    });
  });

  // Test fetching a berry using an invalid ID
  it("Fetches berry with invalid ID", () => {
    cy.request({
      method: "GET",
      url: "https://pokeapi.co/api/v2/berry/112312321",
      failOnStatusCode: false, // Allow 404 responses to avoid test failure
    }).then((response) => {
      expect(response.status).to.eq(404); // Ensure the status code is 404
    });
  });
});

describe("2. GET /berry by Name (valid & invalid) Tests", () => {
  // Test fetching a berry by its valid name
  it('Fetches berry with name = "pecha"', () => {
    cy.request({
      method: "GET",
      url: "https://pokeapi.co/api/v2/berry/pecha",
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the status code is 200
      expect(response.body.item.name).to.eq("pecha-berry"); // Validate the berry name
    });
  });

  // Test fetching a berry using an invalid name
  it("Fetches berry with invalid name", () => {
    cy.request({
      method: "GET",
      url: "https://pokeapi.co/api/v2/berry/trex",
      failOnStatusCode: false, // Allow 404 responses
    }).then((response) => {
      expect(response.status).to.eq(404); // Ensure the status code is 404
    });
  });
});

describe("3. GET /berry-flavor Tests", () => {
  // Test fetching a valid berry flavor by its name
  it("Fetches berry-flavor with valid name", () => {
    const flavorName = "spicy";

    cy.request({
      method: "GET",
      url: `https://pokeapi.co/api/v2/berry-flavor/${flavorName}`,
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the status code is 200
      expect(response.body).to.have.property("name", flavorName); // Validate the flavor name
    });
  });

  // Test fetching the berry with the highest potency for a specific flavor
  it('Finds the highest-potency "spicy" berry and fetches its information', () => {
    // Step 1: Fetch the "spicy" flavor details
    cy.request({
      method: "GET",
      url: "https://pokeapi.co/api/v2/berry-flavor/spicy",
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the status code is 200
      expect(response.body).to.have.property("name", "spicy"); // Validate the flavor name
      expect(response.body.berries).to.be.an("array"); // Ensure the berries list exists

      // Step 2: Find the berry with the highest potency using a for loop
      const berriesArray = response.body.berries;
      let berryWithMaxPotency = berriesArray[0]; // Start with the first berry as the maximum

      for (let i = 1; i < berriesArray.length; i++) {
        if (berriesArray[i].potency > berryWithMaxPotency.potency) {
          berryWithMaxPotency = berriesArray[i]; // Update the maximum potency berry
        }
      }

      const maxPotencyBerryName = berryWithMaxPotency.berry.name;
      const maxPotencyValue = berryWithMaxPotency.potency;

      cy.log(
        `Berry with highest potency: ${maxPotencyBerryName} (Potency: ${maxPotencyValue})`
      );

      // Step 3: Fetch the details of the berry with the highest potency
      cy.request({
        method: "GET",
        url: `https://pokeapi.co/api/v2/berry/${maxPotencyBerryName}`,
      }).then((berryResponse) => {
        expect(berryResponse.status).to.eq(200); // Ensure the status code is 200
        expect(berryResponse.body).to.have.property(
          "name",
          maxPotencyBerryName
        ); // Validate the berry name
      });
    });
  });
});
