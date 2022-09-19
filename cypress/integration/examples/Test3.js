/// <reference types="cypress" />
describe("website testing ", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });
  it("testcase for html DOM elements only ", () => {
    //checkbox
    // we can also use click instaed of check but check is more suitable for checkbox
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1");

    cy.get("#checkBoxOption1")
      .uncheck()
      .should("not.be.checked")
      .and("have.value", "option1");

    cy.get('input[type="checkbox"]').check(["option2", "option3"]);

    // Static dropdown
    cy.get("select").select("option2").should("have.value", "option2");

    // Dynamic Dropdown
    cy.get("#autocomplete").type("ind");

    cy.get(".ui-menu-item div").each(($el, index, $list) => {
      if ($el.text() == "India") {
        cy.wrap($el).click();
      }
    });
    cy.get("#autocomplete").should("have.value", "India");

    //visible invisible
    cy.get("#displayed-text").should("be.visible");
    cy.get("#hide-textbox").click();
    cy.get("#displayed-text").should("not.be.visible");
    cy.get("#show-textbox").click();
    cy.get("#displayed-text").should("be.visible");

    //radio
    cy.get("[value=radio2]")
      .check()
      .should("be.checked")
      .and("have.value", "radio2");
  });
});
//if it is behavior check it shold 'be.'
// for compare check should "have."
