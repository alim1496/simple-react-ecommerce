const BASE_URL = "https://dummyjson.com";

export const API_ENDPOINTS = {
    PRODUCTS: `${BASE_URL}/products`,
    PRODUCTS_CATEGORIES: `${BASE_URL}/products/categories`,
    PRODUCTS_SEARCH: `${BASE_URL}/products/search`,
    PRODUCTS_CATEGORY: `${BASE_URL}/products/category`,
    PRODUCTS_ID: `${BASE_URL}/products/:id`,
    PRODUCTS_CATEGORY_ID: `${BASE_URL}/products/category/:id`,
    PRODUCTS_CATEGORY_ID_PRODUCTS: `${BASE_URL}/products/category/:id/products`,
    PRODUCTS_CATEGORY_ID_PRODUCTS_ID: `${BASE_URL}/products/category/:id/products/:id`,
    PRODUCTS_CATEGORY_ID_PRODUCTS_ID_PRODUCTS: `${BASE_URL}/products/category/:id/products/:id/products`,
    USER: `${BASE_URL}/user/:id`,
}
