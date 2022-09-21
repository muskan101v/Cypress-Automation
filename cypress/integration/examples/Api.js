/// <reference types= "cypress"/>

describe("testing for Api", () => {
  it("Api Testing", () => {
    cy.request("POST", "https://dummyjson.com/products/add", {
      title: "BMW Pencil",
      name: "Angular Framework",
      isbn: "bcd",
      aisle: "227",
      author: "John foe",
    }).then((response) => {
      cy.log(response.body);
      expect(response.body).to.have.property("title", "BMW Pencil");
    });
  });
});
