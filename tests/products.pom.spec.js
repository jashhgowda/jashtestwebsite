import { test, expect } from '@playwright/test'; // import test and expect tools
import { ProductsPage } from '../pages/ProductsPage.js'; // import ProductsPage class
import { login } from './helpers.js'; // import login helper

test.describe('Products Page — POM', () => { // group all products POM tests

  test.beforeEach(async ({ page }) => {
    await login(page); // login before every test
  });

  test('should load products page successfully', async ({ page }) => {
    const productsPage = new ProductsPage(page); // create ProductsPage instance
    await productsPage.goto(); // navigate to products page
    await expect(page).toHaveTitle(/Products/); // check page title
  });

  test('should search and filter products', async ({ page }) => {
    const productsPage = new ProductsPage(page); // create ProductsPage instance
    await productsPage.goto(); // navigate to products page
    await productsPage.search('Headphones'); // search for Headphones
    await expect(productsPage.productCards.first()).toBeVisible(); // check product card visible
    await expect(productsPage.productNames.first()).toContainText('Headphones'); // check product name
  });

  test('should filter by electronics category', async ({ page }) => {
    const productsPage = new ProductsPage(page); // create ProductsPage instance
    await productsPage.goto(); // navigate to products page
    await productsPage.filterByCategory('Electronics'); // click Electronics filter
    await expect(productsPage.productCards.first()).toBeVisible(); // check product cards visible
    await expect(productsPage.productCategory.first()).toContainText('electronics'); // check category
  });

  test('should sort products by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page); // create ProductsPage instance
    await productsPage.goto(); // navigate to products page
    await productsPage.sortBy('price-asc'); // sort by price low to high
    await expect(productsPage.productCards.first()).toBeVisible(); // check products visible
  });

  test('should add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page); // create ProductsPage instance
    await productsPage.goto(); // navigate to products page
    await productsPage.addFirstProductToCart(); // add first product to cart
    await expect(productsPage.cartCount).not.toHaveText('0'); // check cart count updated
  });

});