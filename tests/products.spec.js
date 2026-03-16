import { test, expect } from '@playwright/test'; // import test and expect tools from playwright

test.describe('Products Page', () => { // group all product tests together

  test('should load products page successfully', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await expect(page).toHaveTitle(/Products/); // check page title contains "Products"
  });

  test('should search and filter products', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.fill('SELECTOR_FOR_SEARCH_INPUT', 'Headphones'); // 👈 find this selector yourself
    await expect(page.locator('SELECTOR_FOR_PRODUCT_CARD').first()).toBeVisible(); // 👈 find product card selector
    await expect(page.locator('SELECTOR_FOR_PRODUCT_NAME').first()).toContainText('Headphones'); // 👈 find product name selector
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.click('SELECTOR_FOR_ELECTRONICS_BUTTON'); // 👈 find electronics filter button selector
    await expect(page.locator('SELECTOR_FOR_PRODUCT_CARD').first()).toBeVisible(); // 👈 find product card selector
  });

  test('should sort products by price low to high', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.selectOption('SELECTOR_FOR_SORT_DROPDOWN', 'price-asc'); // 👈 find sort dropdown selector
    await expect(page.locator('SELECTOR_FOR_PRODUCT_CARD').first()).toBeVisible(); // 👈 product card selector
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // open products page
    await page.click('SELECTOR_FOR_FIRST_ADD_TO_CART_BUTTON'); // 👈 find add to cart button selector
    await expect(page.locator('SELECTOR_FOR_CART_COUNT')).not.toHaveText('0'); // 👈 find cart count selector
  });

});

