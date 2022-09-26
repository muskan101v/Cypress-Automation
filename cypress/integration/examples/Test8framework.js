/// <reference types="cypress" />

import HomePage from "../../support/pageObjects/homePage";
import ProductPage from "../../support/pageObjects/productPage";

describe("website testing ", function () {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${Cypress.env("url")}/angularpractice/`);
  });

  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });

  it("navigate to url-visit", function () {
    const homePage = new HomePage();
    const productPage = new ProductPage();

    homePage.getEditBox().type(this.data.name);
    homePage.getGender().select(this.data.gender);
    homePage.getTwoWayData().should("have.value", this.data.name);
    homePage.getEditBox().should("have.attr", "minlength", "2");
    homePage.getEnterprenourRadioButton().should("be.disabled");
    Cypress.config("defaultCommandTimeout", 8000); // we can declare explicity in a particular testcase
    homePage.getShopTab().click();

    productPage.getUrl().should("include", "/shop");
    this.data.productName.forEach(function (element) {
      cy.selectProduct(element);
    });
    productPage.CheckoutBtn().click();
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
      }); // we are resolving promise because to said next command you have to wait until this promise will resolve ,
    //if we are not using "then" then sum will take 0 value rather than the sum

    cy.get("h3 strong").then((element) => {
      const amount = element.text();
      var res = amount.split(" ");
      var total = res[1].trim();
      expect(Number(total)).to.equal(sum);
    });

    productPage.checkout().click();
    productPage.getCountryInput().type("ind");
    // cy.wait(4000);
    productPage.getCountrybutton().each(($el, index, $list) => {
      if ($el.text() == "India") {
        cy.wrap($el).click();
      }
    });
    cy.get("#checkbox2").check({ force: true });
    cy.contains("Purchase").click();
    // cy.get(".alert").should(
    //   "have.text",
    //   "Success! Thank you! Your order will be delivered in next few weeks :-)."
    // );
    cy.get(".alert").then((element) => {
      const text = element.text();
      expect(text.includes("Success")).to.be.true;
    });
    // cy.selectProduct("iphone X");
    // cy.selectProduct("Nokia Edge");
  });
});

//So all the excess loading is recommended to write in before hook
//anything if we need for every testcase we will place it into beforeEach ,if we place into before we will get only in first testcase
//like data we can access it only in first test case , if i will try to access it another testcase it will give undefined
