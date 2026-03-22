import { test, expect } from '@playwright/test'; // import test and expect tools from playwright
import { login } from './helpers.js'; // import login helper function

test.describe('Cart Page', () => { // group all cart tests together

  test.beforeEach(async ({ page }) => {
    await login(page); // login before every test using helper function
  });

  test('should load cart page successfully', async ({ page }) => {
    await page.goto('/jashtestwebsite/cart.html'); // open cart page
    await expect(page).toHaveTitle(/Cart/); // check page title contains "Cart"
  });

  test('should show empty cart when no items added', async ({ page }) => {
    await page.goto('/jashtestwebsite/cart.html'); // open cart page directly
    await expect(page.locator('text=Your cart is empty.')).toBeVisible(); // check empty message is visible
  });

  test('should add product and see it in cart', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // go to products page
    await page.click('.add-btn'); // add first product to cart
    await page.goto('/jashtestwebsite/cart.html'); // go to cart page
    await expect(page.locator('.cart-item').first()).toBeVisible(); // check cart item is visible
  });

  test('should increase quantity of item in cart', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // go to products page
    await page.click('.add-btn'); // add first product to cart
    await page.goto('/jashtestwebsite/cart.html'); // go to cart page
    const qtyBefore = await page.locator('.qty-val').first().innerText(); // get quantity before
    await page.locator('.qty-btn').last().click(); // click + button to increase quantity
    const qtyAfter = await page.locator('.qty-val').first().innerText(); // get quantity after
    expect(Number(qtyAfter)).toBeGreaterThan(Number(qtyBefore)); // check quantity increased
  });

  test('should remove item from cart', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // go to products page
    await page.click('.add-btn'); // add first product to cart
    await page.goto('/jashtestwebsite/cart.html'); // go to cart page
    await page.click('.remove-btn'); // click remove button
    await expect(page.locator('text=Your cart is empty.')).toBeVisible(); // check cart is empty
  });

  test('should show total price in order summary', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // go to products page
    await page.click('.add-btn'); // add first product to cart
    await page.goto('/jashtestwebsite/cart.html'); // go to cart page
    await expect(page.locator('.summary-row.total')).toBeVisible(); // check total row is visible
  });

  test('should checkout and clear cart', async ({ page }) => {
    await page.goto('/jashtestwebsite/products.html'); // go to products page
    await page.click('.add-btn'); // add first product to cart
    await page.goto('/jashtestwebsite/cart.html'); // go to cart page
    await page.click('.checkout-btn'); // click checkout button
    await expect(page.locator('text=Your cart is empty.')).toBeVisible(); // check cart is empty after checkout
  });

});