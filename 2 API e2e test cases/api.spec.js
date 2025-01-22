// cypress/tests/api/api-users.spec.ts

describe("1. GET /berry by ID (valid & invalid) Tests", () => {
    it("get berry using valid id = 1", () => {
      cy.request({
        method: "GET",
        url: "https://pokeapi.co/api/v2/berry/1",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.item.name).to.eq("cheri-berry");
      });
    });
  
    it("get berry with invalid id", () => {
      cy.request({
        method: "GET",
        url: "https://pokeapi.co/api/v2/berry/112312321",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  
  describe("2. GET /berry by Name (valid & invalid) Tests", () => {
    it('gets berry with name = "pecha"', () => {
      cy.request({
        method: "GET",
        url: "https://pokeapi.co/api/v2/berry/pecha",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.item.name).to.eq("pecha-berry");
      });
    });
  
    it("get berry with invalid name", () => {
      cy.request({
        method: "GET",
        url: "https://pokeapi.co/api/v2/berry/trex",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  
  describe("3. GET /berry-flavor Tests", () => {
    it("gets berry-flavor with valid name", () => {
      const flavorName = "spicy";
  
      cy.request({
        method: "GET",
        url: `https://pokeapi.co/api/v2/berry-flavor/${flavorName}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("name", flavorName);
      });
    });
  
    it('gets the highest-potency "spicy" berry and fetches its berry info', () => {
      // 1. Request the "spicy" flavor
      cy.request({
        method: "GET",
        url: "https://pokeapi.co/api/v2/berry-flavor/spicy",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("name", "spicy");
        expect(response.body).to.have.property("berries").and.be.an("array");
  
        // 2. Find the berry with the highest potency
        const berriesArray = response.body.berries;
        let berryWithMaxPotency = berriesArray[0];
  
        for (const berry of berriesArray) {
          if (berry.potency > berryWithMaxPotency.potency) {
            berryWithMaxPotency = berry;
          }
        }
  
        const maxPotencyBerryName = berryWithMaxPotency.berry.name;
        const maxPotencyValue = berryWithMaxPotency.potency;
  
        cy.log(
          `Berry with max potency: ${maxPotencyBerryName} (${maxPotencyValue})`
        );
  
        // 3. Request the chosen berry by name
        cy.request({
          method: "GET",
          url: `https://pokeapi.co/api/v2/berry/${maxPotencyBerryName}`,
        }).then((berryResponse) => {
          expect(berryResponse.status).to.eq(200);
          expect(berryResponse.body).to.have.property(
            "name",
            maxPotencyBerryName
          );
        });
      });
    });
  });
  