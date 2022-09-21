/// <reference types="cypress"/>

describe("login api test", function () {
  it("My FirstTest case", function () {
    const options = {
      method: "POST",
      url: "https://rahulshettyacademy.com/api/ecom/auth/login",
      body: {
        userEmail: "rahulshetty101@gmail.com",
        userPassword: "Muskan123@",
      },
    };
    cy.request(options)
      .then((res) => {
        expect(res.status).to.equal(200);
        Cypress.env("token", res.body.token);
      })
      .then(() => {
        cy.viewport(1280, 720);
        cy.visit("https://rahulshettyacademy.com/client", {
          onBeforeLoad: function (window) {
            window.localStorage.setItem("token", Cypress.env("token"));
          },
        });
      });
    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get("[routerLink*='cart']").click();
    cy.contains("Checkout").click();
    cy.get("input[placeholder='Select Country']").type("ind");
    cy.get(".ta-results button").each(($el, index, $list) => {
      if ($el.text() == " India") {
        cy.wrap($el).click();
      }
    });
    cy.get(".action__submit").click();
    cy.wait(2000);
    cy.get(".order-summary button").click();
  });
});
