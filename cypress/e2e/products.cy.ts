describe("testing the products page", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://dummyjson.com/products/categories").as(
      "categories"
    );
    cy.intercept("GET", "https://dummyjson.com/products?limit=100").as(
      "products"
    );
    cy.visit("/products");
  });

  it("products page loads", () => {
    cy.contains("Products").should("be.visible");
  });

  it("categories are loaded", () => {
    cy.wait("@categories").then((interpect) => {
      expect(interpect.response.statusCode).to.be.equal(200);
      expect(interpect.response.body).not.to.be.empty;
      cy.contains("womens-jewellery").should("be.visible");
    });
  });

  it("products are filtered by category", () => {
    cy.wait("@categories").then(() => {
      cy.contains("furniture").click();
      cy.get('[data-test="product-card"]').should("have.length", 5);
      cy.contains("3 Tier Corner Shelves").should("be.visible");
      cy.contains("3 DOOR PORTABLE").should("be.visible");
    });
  });

  it("products are loaded", () => {
    cy.wait("@products").then((intercept) => {
      expect(intercept.response.statusCode).to.be.equal(200);
      expect(intercept.response.body).not.to.be.empty;
      cy.contains("iPhone 9").should("be.visible");
    });
  });

  it.only("products are sorted", () => {
    cy.wait("@products").then(() => {
      cy.get('[data-test="product-card"]')
        .first()
        .should("contain.text", "iPhone 9");
      cy.get("select").select("asc");
      cy.get('[data-test="product-card"]')
        .first()
        .should("contain.text", "FREE FIRE T Shirt");
      cy.get("select").select("default");
      cy.get('[data-test="product-card"]')
        .first()
        .should("contain.text", "iPhone 9");
    });
  });
});
