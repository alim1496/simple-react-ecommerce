describe("testing navbar functions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("clicking on products works properly", () => {
    cy.get('[data-test="main-products"]').click();
    cy.location("pathname").should("equal", "/products");
  });

  it("clicking on products works properly", () => {
    cy.get('[data-test="main-logo"]').click();
    cy.location("pathname").should("equal", "/");
  });

  it("clicking on a product works properly", () => {
    cy.get('[data-test="product-card"]').first().click();
    cy.location("pathname").should("equal", "/product/1");
  });

  it("login & logout works properly", () => {
    cy.get('[data-test="login-btn"]').click();
    cy.get('[data-test="input-username"]').type("atuny0");
    cy.get('[data-test="input-password"]').type("9uQFF1Lh");
    cy.get('[data-test="input-submit"]').click();
    cy.get('[data-test="username-popup"]').click();
    cy.get('[data-test="popup-content-list"]').should("be.visible");
    cy.get('[data-test="logout-btn"]').click();
    cy.get('[data-test="popup-content-list"]').should("not.exist");
    cy.get('[data-test="login-btn"]').should("be.visible");
  });
});
