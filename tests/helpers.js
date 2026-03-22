async function login(page) {
  await page.goto('/jashtestwebsite/'); // open login page
  await page.waitForSelector('#email', { state: 'visible' }); // wait for email field to be visible
  await page.fill('#email', 'test@example.com'); // enter email
  await page.fill('#password', 'password123'); // enter password
  await page.keyboard.press('Enter'); // press Enter to submit login form
  await page.waitForURL(/dashboard/); // wait for dashboard to load
}

export { login }; // export login function so other files can use it