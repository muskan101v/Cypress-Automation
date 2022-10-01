/// <reference types="cypress" />
/// <reference types="cypress-iframe"/>
import "cypress-iframe";

// cypress not know about iframe install package npm i cypress-iframe
describe("Iframe testing", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });
  it("should test iframe", () => {
    // cy.frameLoaded command will focus on the ifram provided with the locator (autosuggestion will work when you use reffrence type cypress-iframe)
    cy.frameLoaded("#courses-iframe");

    // after that cy.iframe can perform susquent ops on that loaded frame
    cy.iframe().find("a[href=mentorship]").eq(0).click();
    // cy.iframe().find("h1.pricing-title").should("have.length", 2); // will not work cypress iframe is not suitable inner frames switching
  });
});
