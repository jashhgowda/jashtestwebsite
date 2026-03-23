import { test, expect } from '@playwright/test'; // import test and expect tools from playwright

test.describe('Login Page', () => { // group all login tests together

  test('should load login page successfully', async ({ page }) => { // first test case
    await page.goto('/jashtestwebsite/'); // open the login page
    await expect(page).toHaveTitle(/Login/); // check page title contains word "Login"
  });

  test('should login successfully with valid credentials', async ({ page }) => { // second test case
    await page.goto('/jashtestwebsite/'); // open login page
    await page.fill('#email', 'test@example.com'); // type email into email field
   await page.fill('#password', 'password123'); // type password into password field
    await page.click('#loginBtn'); // click the sign in button
    await expect(page).toHaveURL(/dashboard/); // check URL changed to dashboard
  });

  test('should show error for wrong password', async ({ page }) => { // third test case
    await page.goto('/jashtestwebsite/'); // open login page
    await page.fill('#email', 'test@example.com'); // type correct email
    await page.fill('#password', 'wrongpassword'); // type wrong password
    await page.click('#loginBtn'); // click sign in button
    await expect(page.locator('#passwordErr')).toBeVisible(); // check error message is visible
    await expect(page.locator('#passwordErr')).toHaveText('Incorrect password. Please try again.'); // check exact error message
  });
  
test('should show error for wrong email', async ({ page }) => { // fourth test case
    await page.goto('/jashtestwebsite/'); // open login page
    await page.fill('#email', 'wrong@example.com'); // type email that does not exist
    await page.fill('#password', 'password123'); // type password
    await page.click('#loginBtn'); // click sign in button
    await expect(page.locator('#emailErr')).toBeVisible(); // check email error is visible
    await expect(page.locator('#emailErr')).toHaveText('No account found with this email.'); // check exact error message
  });

  test('should show error when fields are empty', async ({ page }) => { // fifth test case
    await page.goto('/jashtestwebsite/'); // open login page
    await page.click('#loginBtn'); // click sign in without filling anything
    await expect(page.locator('#emailErr')).toBeVisible(); // check email error is visible
    await expect(page.locator('#passwordErr')).toBeVisible(); // check password error is visible
  });
});