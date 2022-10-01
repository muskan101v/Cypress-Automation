/// <reference types="cypress" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../../support/pageObjects/homePage";
import ProductPage from "../../../../support/pageObjects/productPage";

//npx cypress-tags run --spec cypress/integration/examples/BDD/*.feature -e TAGS='@Smoke' --headed --browser chrome
// add cucumber report options in package.json
const homePage = new HomePage();
const productPage = new ProductPage();
let name;

Given("I open Ecommerce Page", function () {
  cy.viewport(1280, 720);
  cy.visit(`${Cypress.env("url")}/angularpractice/`);
});

//When I add item to cart

When("I add item to cart", function () {
  homePage.getShopTab().click();
  productPage.getUrl().should("include", "/shop");
  this.data.productName.forEach(function (element) {
    cy.selectProduct(element);
  });
  productPage.CheckoutBtn().click();
});

// And Validate total price
And("Validate total price", function () {
  var sum = 0;
  cy.get("tr td:nth-child(4) strong")
    .each(($el, index, $list) => {
      const amount = $el.text();
      var res = amount.split(" ");
      res = res[1].trim();
      sum = Number(sum) + Number(res);
    })
    .then(() => {
      cy.log(sum);
    });
  cy.get("h3 strong").then(function (element) {
    const amount = element.text();
    var res = amount.split(" ");
    var total = res[1].trim();
    expect(Number(total)).to.equal(sum);
  });
});

//Then select the country submit and verify Thankyou

Then("select the country submit and verify Thankyou", function () {
  productPage.checkout().click();
  productPage.getCountryInput().type("ind");
  //   wait(4000);
  productPage.getCountrybutton().each(($el, index, $list) => {
    if ($el.text() == "India") {
      cy.wrap($el).click();
    }
  });
  cy.get("#checkbox2").check({ force: true });
  cy.contains("Purchase").click();
  cy.get(".alert").then((element) => {
    const text = element.text();
    expect(text.includes("Success")).to.be.true;
  });
});

//  Scenario: Filling the form to shop

// I fill the form details
When("I fill the form details", function (datatable) {
  name = datatable.rawTable[1][0];
  homePage.getEditBox().type(datatable.rawTable[1][0]);
  homePage.getGender().select(datatable.rawTable[1][1]);
});
// Then validate the forms behaviour
Then("validate the forms behaviour", function () {
  homePage.getTwoWayData().should("have.value", name);
  homePage
    .getGender()
    .select(this.data.gender)
    .should("have.value", this.data.gender);
  homePage.getEditBox().should("have.attr", "minlength", "2");
  homePage.getEnterprenourRadioButton().should("be.disabled");
  Cypress.config("defaultCommandTimeout", 8000);
});
// And Select the shop page
And("Select the shop page", function () {
  homePage.getShopTab().click();
});

//whatever written in the datatable we can retirve it and use it in place of fixture file of cypress
