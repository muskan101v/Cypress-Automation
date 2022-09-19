/// <reference types="cypress" />

describe("website testing ", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });

  it("navigate to url-visit", () => {
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);

    // cy.get(".product").should("have.length", 5); // normal css selector
    // cy.get(".product:visible").should("have.length", 4); //jquery css selector
    //   cy.get(".products .product").should("have.length", 4); // parent child selector

    //make alais of locator using as command & use it usinf @aliasName in get command
    cy.get(".products").as("productsLabels");

    //parent child chaining by using find command
    cy.get("@productsLabels").find(".product").should("have.length", 4);

    // clcik on add to cart for search 2 item using nth-child(4) > .stepper-input > .increment (not ideal if future new item got added it will show incorrect result)
    // cy.get(".products>.product:nth-child(4)")
    //   .find(">.product-action>button")
    //   .click();

    // using eq command from index 0
    cy.get("@productsLabels")
      .find(".product")
      .eq(2)
      .contains("ADD TO CART")
      .click();
    /*cy.get(".products")
      .find(".product")
      .eq(3)
      .get(":nth-child(4) > .stepper-input > .increment")
      .click();
    cy.get(".products").find(".product").eq(3).contains("ADD TO CART").click();*/

    //iterate on the resulted list that we searched for using each command
    //(cy.get(".products").find(".product") "return an array that we will iterate through each method of array ")
    cy.get(".products")
      .find(".product")
      .each(($el, $index, $list) => {
        //each command have 3 parameter element index and list
        // type is not cypress commend is a jquery selector
        const textveg = $el.find("h4.product-name").text();
        if (textveg.includes("Carrot")) {
          // $el.find("button").click(); // as $el return promise which is not resolved so click is depreciated for that
          cy.wrap($el).find("button").click();
        }
      });

    //assert logo text is correct display
    //text is not a cypress method but it will resolve by parent child chainig parent commend internally & then pass to the child command
    // text is jquery method,cypress support jquery command so that we can use text method
    cy.get(".brand").should("have.text", "GREENKART");

    // cy.get(".brands").text(); // it will throw an error text is not an function

    // cypress command parent child chainig parent commend internally & then pass to the child command
    // cypress command is asynchronus in nature so that it handle promise itslef

    //this is for prints logs
    cy.get(".brand").then((logoelement) => {
      cy.log(logoelement.text());
    });
  });
});

// cypress is asynchronus in nature d there is no guarntee in sequence  of execution but cyprea  take care of it
// In asynchronus return promise on every state
//promise come with 3 different state {reject, resolve, pending }
// non cypress commands cannot esolve promise by themselves we need to mannually resolve it by then ()
//aliasing is use for reused locators
