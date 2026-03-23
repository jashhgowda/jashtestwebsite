import { test, expect } from '@playwright/test'; // import test and expect tools
import { LoginPage } from '../pages/LoginPage.js'; // import LoginPage class

test.describe('Login Page — POM', () => { // group all login POM tests

  test('should load login page successfully', async ({ page }) => {
    const loginPage = new LoginPage(page); // create LoginPage instance
    await loginPage.goto(); // navigate to login page
    await expect(page).toHaveTitle(/Login/); // check page title
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page); // create LoginPage instance
    await loginPage.goto(); // navigate to login page
    await loginPage.login('test@example.com', 'password123'); // login using POM method
    await expect(page).toHaveURL(/dashboard/); // check redirected to dashboard
  });

  test('should show error for wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page); // create LoginPage instance
    await loginPage.goto(); // navigate to login page
    await loginPage.login('test@example.com', 'wrongpassword'); // login with wrong password
    await expect(loginPage.passwordError).toBeVisible(); // check password error visible
    await expect(loginPage.passwordError).toHaveText('Incorrect password. Please try again.'); // check error text
  });

  test('should show error for wrong email', async ({ page }) => {
    const loginPage = new LoginPage(page); // create LoginPage instance
    await loginPage.goto(); // navigate to login page
    await loginPage.login('wrong@example.com', 'password123'); // login with wrong email
    await expect(loginPage.emailError).toBeVisible(); // check email error visible
    await expect(loginPage.emailError).toHaveText('No account found with this email.'); // check error text
  });

  test('should show error when fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page); // create LoginPage instance
    await loginPage.goto(); // navigate to login page
    await page.click('#loginBtn'); // click sign in without filling anything
    await expect(loginPage.emailError).toBeVisible(); // check email error visible
    await expect(loginPage.passwordError).toBeVisible(); // check password error visible
  });

});