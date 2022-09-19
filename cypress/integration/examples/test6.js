/// <reference types="Cypress" />

describe("My Second Test Suite", function () {
  it("My FirstTest case", function () {
    //Check boxes
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    //show method is used to display a hidden and selected element
    // cy.get("#mousehover").invoke("show");

    //show method is applied on immediate parent of hidden element
    // cy.get(".mouse-hover-content").invoke("show"); //this is used when your test case is that verify pop up is diaplaying on mouse over and click on tp button

    //{force:true is use handle an element that are not in visisble mode}
    cy.contains("Top").click({ force: true });
    cy.url().should("include", "top");
  });
});

// you can traverse to sibling with next() and it only works on get
//mouse hover events are supported in cypress , ALternatively  use jquery or force click
//cypress does not suport child window
