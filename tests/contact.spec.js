import { test, expect } from '@playwright/test'; // import test and expect tools from playwright
import { login } from './helpers.js'; // import login helper function

test.describe('Contact Page', () => { // group all contact tests together

  test.beforeEach(async ({ page }) => {
    await login(page); // login before every test using helper function
  });

  test('should load contact page successfully', async ({ page }) => {
    await page.goto('/jashtestwebsite/contact.html'); // open contact page
    await expect(page).toHaveTitle(/Contact/); // check page title contains "Contact"
  });

  test('should show errors when form is empty', async ({ page }) => {
    await page.goto('/jashtestwebsite/contact.html'); // open contact page
    await page.click('#formView button'); // click send button without filling anything
    await expect(page.locator('#fnameErr')).toBeVisible(); // check first name error is visible
    await expect(page.locator('#lnameErr')).toBeVisible(); // check last name error is visible
    await expect(page.locator('#cemailErr')).toBeVisible(); // check email error is visible
    await expect(page.locator('#subjectErr')).toBeVisible(); // check subject error is visible
    await expect(page.locator('#messageErr')).toBeVisible(); // check message error is visible
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('/jashtestwebsite/contact.html'); // open contact page
    await page.fill('#fname', 'Jash'); // enter first name
    await page.fill('#lname', 'Kumar'); // enter last name
    await page.fill('#cemail', 'invalidemail'); // enter invalid email
    await page.selectOption('#subject', 'general'); // select subject
    await page.fill('#message', 'This is a test message'); // enter message
    await page.click('#formView button'); // click send button
    await expect(page.locator('#cemailErr')).toBeVisible(); // check email error is visible
    await expect(page.locator('#cemailErr')).toHaveText('Enter a valid email address.'); // check exact error message
  });

  test('should show error when subject not selected', async ({ page }) => {
    await page.goto('/jashtestwebsite/contact.html'); // open contact page
    await page.fill('#fname', 'Jash'); // enter first name
    await page.fill('#lname', 'Kumar'); // enter last name
    await page.fill('#cemail', 'test@example.com'); // enter valid email
    await page.fill('#message', 'This is a test message'); // enter message
    await page.click('#formView button'); // click send button without selecting subject
    await expect(page.locator('#subjectErr')).toBeVisible(); // check subject error is visible
    await expect(page.locator('#subjectErr')).toHaveText('Please select a topic.'); // check exact error message
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    await page.goto('/jashtestwebsite/contact.html'); // open contact page
    await page.fill('#fname', 'Jon'); // enter first name
    await page.fill('#lname', 'Snow'); // enter last name
    await page.fill('#cemail', 'test@example.com'); // enter valid email
    await page.selectOption('#subject', 'general'); // select subject
    await page.fill('#message', 'This is a test message'); // enter message
    await page.click('#formView button'); // click send button
    await expect(page.locator('#successView')).toBeVisible(); // check success message is visible
    await expect(page.locator('#successView h3')).toHaveText('Message Sent!'); // check success heading
  });

});