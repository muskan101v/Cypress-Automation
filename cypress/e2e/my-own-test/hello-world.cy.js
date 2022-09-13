/// <reference types="cypress" />

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pc2h0aTEwMSIsIl9pZCI6IjYzMjAxZDQ3MjY4ZWZkMDAwOTdhZTBiNCIsIm5hbWUiOiJtaXNodGkiLCJpYXQiOjE2NjMwNTI1MDAsImV4cCI6MTY2ODIzNjUwMH0.CzguNle4HtXukUUegBcRDTbxLaqDNZJkn37jy4JeoEQ";

describe("Basic unauthenticate Test ", () => {
  // before(() => {
  //   // cy.then(() => {
  //   //   window.localStorage.setItem("__auth__token", token);
  //   // });
  // });
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://codedamn.com");
    // cy.then(() => {
    //   window.localStorage.setItem("__auth__token", token);
    // });
  });

  it("login page looks good", () => {
    cy.contains("Sign in").click();
    cy.contains("Sign in to codedamn").should("exist");
    cy.contains("Sign in with Google").should("exist");
    cy.contains("Sign in with GitHub").should("exist");
    cy.contains("Forgot your password?").should("exist");
    cy.contains("Don't have an account? Create one").should("exist");
  });

  it("login page links work", () => {
    // 1.sign in page
    cy.contains("Sign in").click();

    // 2.forgaot password page
    cy.contains("Forgot your password?").click({ force: true });

    // 3.verify password reset page
    cy.url().should("include", "/password-reset");

    // if you want to print any value of the assertion
    cy.url().then((value) => {
      cy.log("current url for reset password", value);
    });

    // 4.go back on the sign in page
    cy.go("back");

    cy.contains("Create one").click();

    cy.url().should("include", "/register");

    //for print
    cy.log("to console statement");
  });

  it("Login should display correct error", () => {
    cy.contains("Sign in").click();
    cy.contains("Unable to authorize").should("not.exist");
    // i have challenge to type string into the input while typing through cypress ,
    // this is because of annimation, due to annimation
    // input field take to render that why it will deatched from the dom and its error,
    // cy.get("[data-testid=username]").click({ waitForAnimations: false });
    cy.get("[id=email][data-testid=username]").type("Something", {
      force: true,
    });
    cy.get("[id=password][data-testid=password]").type("Something", {
      force: true,
    });
    cy.get("[data-testid=login]").click({
      force: true,
    });
    cy.contains("Unable to authorize").should("exist");
  });

  it("Login should work fine", () => {
    cy.contains("Sign in").click();
    cy.get("[id=email][data-testid=username]").type("mishti101", {
      force: true,
    });
    cy.get("[id=password][data-testid=password]").type("varshney@123", {
      force: true,
    });
    cy.get("[data-testid=login]").click({
      force: true,
    });

    cy.url().should("include", "/dashboard");
  });
});
