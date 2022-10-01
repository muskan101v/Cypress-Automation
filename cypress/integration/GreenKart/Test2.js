/// <reference types="cypress" />

describe("website testing ", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });

  it("navigate to url-visit", () => {
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    cy.get(".products").as("productsLabels");
    cy.get("@productsLabels")
      .find(".product")
      .each(($el, $index, $list) => {
        const textveg = $el.find("h4.product-name").text();
        if (textveg.includes("Carrot")) {
          cy.wrap($el).find("button").click();
        }
      });
    cy.get(".cart-icon > img").click();
    cy.contains("PROCEED TO CHECKOUT").click();
    cy.contains("Place Order").click();
    cy.get("select").select("India").should("have.value", "India");
    cy.get("input[type=checkbox]").check();
    cy.get("input[type=checkbox]").should("be.checked");
    cy.contains("Proceed").click();
    cy.get(".wrapperTwo span").then((element) => {
      const text = element.text();
      expect(text.includes("successfully")).to.be.true;
    });
  });
});
