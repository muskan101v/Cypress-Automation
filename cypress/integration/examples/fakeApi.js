/// <reference types="cypress"/>

describe("My First Test Suite", function () {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  });
  it("My FirstTest case", function () {
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },

      {
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "RSU",
            aisle: "2301",
          },
        ],
      }
    ).as("bookretrievals");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@bookretrievals").should(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
      //   response.body.length;
    });
    cy.get("p").should("have.text", "Oops only 1 Book available");

    //length of the response array = rows of the table
  });
});
