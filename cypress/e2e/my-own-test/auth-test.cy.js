/// <reference types="cypress" />

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pc2h0aTEwMSIsIl9pZCI6IjYzMjAxZDQ3MjY4ZWZkMDAwOTdhZTBiNCIsIm5hbWUiOiJtaXNodGkiLCJpYXQiOjE2NjMwNTI1MDAsImV4cCI6MTY2ODIzNjUwMH0.CzguNle4HtXukUUegBcRDTbxLaqDNZJkn37jy4JeoEQ";
describe("Basic unauthenticate Test ", () => {
  before(() => {
    cy.then(() => {
      window.localStorage.setItem("__auth__token", token);
    });
  });

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://codedamn.com");
  });

  it("should load playground correctly", () => {
    cy.visit("https://codedamn.com/playground/Y_b2HVOi_j97YE8uq_LpI");

    cy.log("checking loading svd loader in side bar");
    cy.get(".-ml-1").should("exist");

    cy.log("checking terminal text for loading");
    cy.get(".inline-block").should("include.text", "Getting your auth tokens");

    cy.log("check playground intalize");
    cy.get("[data-testid=explorer-column]", { timeout: 10 * 1000 }).should(
      "exist"
    );
    cy.get("#embedded_webdev_iframe").should("exist");

    cy.get("div");
    // cy.get("content-area svg");
    // cy.pause();
    // cy.debug();
  });

  it.only("setting up new file", () => {
    cy.visit("https://codedamn.com/playground/Y_b2HVOi_j97YE8uq_LpI");
    cy.get(".-ml-1").should("exist");
    cy.get(".relative span")
      .should("include.text", "Restoring files and access")
      .should("exist");
    cy.get("[data-testid=explorer-column]", {
      timeout: 10 * 1000,
    }).should("exist");

    cy.get("[data-testid=xterm] > .terminal > .xterm-screen textarea")
      .type("{ctrl}{c}", { force: true })
      .type("touch testcript.js{enter}");

    cy.contains("testcript.js").should("exist");
    cy.contains("testcript.js").rightclick();
    // cy.contains("Rename File").click();
    // cy.contains("input[data-testid=exp_testcript.js]").type("testscript1.js", {
    //   force: true,
    // });
  });
});
