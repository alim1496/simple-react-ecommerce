describe("testing the single product page", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://dummyjson.com/products/47").as("product");
    cy.intercept(
      "GET",
      "https://dummyjson.com/products/category/womens-shoes"
    ).as("similar");
    cy.visit("/product/47");
  });

  it("page loads properly", () => {
    cy.contains(/about the product/i).should("be.visible");
  });

  it("product details loads successfully", () => {
    cy.wait("@product").then(() => {
      cy.contains(/Synthetic Leather Casual Sneaker shoes for Women/i).should(
        "be.visible"
      );
    });
  });

  it("buy now works perfectly", () => {
    cy.wait("@product").then(() => {
      cy.get('[data-test="login-btn"]').click();
      cy.get('[data-test="input-username"]').type("atuny0");
      cy.get('[data-test="input-password"]').type("9uQFF1Lh");
      cy.get('[data-test="input-submit"]').click();
      cy.contains("BUY NOW").click();
      cy.get('[data-test="cart-item-quantity"]').should("have.text", "1");
      cy.get('[data-test="cart-close"]').click();
    });
  });

  it.only("add to wishlist works perfectly", () => {
    cy.wait("@product").then(() => {
      cy.get('[data-test="login-btn"]').click();
      cy.get('[data-test="input-username"]').type("atuny0");
      cy.get('[data-test="input-password"]').type("9uQFF1Lh");
      cy.get('[data-test="input-submit"]').click();
      cy.contains("ADD TO WISHLIST").click();
      cy.get('[data-test="username-popup"]').click();
      cy.get('[data-test="popup-content-list"]').should("be.visible");
      cy.get('[data-test="wishlist-container"]').click();
      cy.contains(/Sneaker shoes/i).should("be.visible");
      cy.contains(/womens-shoes/i).should("be.visible");
    });
  });

  it("reviews load successfully", () => {
    cy.wait("@product").then(() => {
      cy.get('[data-test="review-item"]').should("have.length", 5);
    });
  });

  it("similar products load successfully", () => {
    cy.wait("@similar").then(() => {
      cy.get('[data-test="product-card"]').should("have.length", 4);
      cy.contains(/Chappals & Shoe Ladies Metallic/i).should("be.visible");
    });
  });
});
