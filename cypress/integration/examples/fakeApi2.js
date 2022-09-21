/// <reference types="cypress"/>

describe("My First Test Suite", function () {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  });
  it("My FirstTest case", function () {
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",

      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";
        req.continue((res) => {
          expect(res.statusCode).to.equal(404);
        });
      }
    ).as("dummyUrl");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@dummyUrl");
  });
});
