class ProductPage {
  getUrl() {
    return cy.url();
  }
  CheckoutBtn() {
    return cy.get("#navbarResponsive > .navbar-nav > .nav-item > .nav-link");
  }
  checkout() {
    return cy.contains("Checkout");
  }
  getCountryInput() {
    return cy.get("#country");
  }
  getCountrybutton() {
    return cy.get(".suggestions > :nth-child(1) > li >a");
  }
}
export default ProductPage;
