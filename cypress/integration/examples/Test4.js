/// <reference types="cypress" />
describe("website testing ", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });
  it("popup testcases", () => {
    cy.get("#alertbtn").click();
    cy.get("[value='Confirm']").click();
    cy.on("window:alert", (str) => {
      //Mocha give a method to compare a string rather than cypress
      expect(str).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });
    cy.on("window:confirm", (str) => {
      //Mocha give a method to compare a string rather than cypress
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });
    cy.get("#opentab").invoke("removeAttr", "target").click();
    // cy.get("#opentab").click();
    cy.url().should("include", "rahulshettyacademy");
    cy.go("back");
  });
});

//Cypress auto accept the alerts and popup
// cypress have capability to browser events
//if alert is trigerred (window:alert ) automatically this event trigerred for that browser
//Cypress have capability of browser event
//window:alert is the event which get fired on alert open
//so you are firing the event through cypress to get access to that alert
