import { test, expect } from '@playwright/test'; // import test and expect tools from playwright
import { login } from './helpers.js'; // import login helper function

test.describe('Products Page', () => { // group all product tests together

  test.beforeEach(async ({ page }) => {
    await login(page); // login before every test using helper function
  });

  test('should load products page successfully', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await expect(page).toHaveTitle(/Products/); // check page title contains "Products"
  });

  test('should search and filter products', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.fill('#searchInput', 'Headphones'); // type Headphones in search box
    await expect(page.locator('.product-card').first()).toBeVisible(); // check product card is visible
    await expect(page.locator('.product-name').first()).toContainText('Headphones'); // check product name contains Headphones
  });

  test('should filter by electronics category', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.click('text=Electronics'); // click electronics filter button
    await expect(page.locator('.product-card').first()).toBeVisible(); // check product cards are visible
    await expect(page.locator('.product-category').first()).toContainText('electronics'); // check category is electronics
  });

  test('should sort products by price low to high', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.selectOption('#sortSelect', 'price-asc'); // select price low to high from dropdown
    await expect(page.locator('.product-card').first()).toBeVisible(); // check products are still visible
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.click('.add-btn'); // click add to cart button
    await expect(page.locator('#cartCount')).not.toHaveText('0'); // check cart count is not 0
  });

});