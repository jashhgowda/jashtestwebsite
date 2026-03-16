// helper functions shared across all test files

async function login(page) {
  await page.goto('/jashtestwebsite/'); // open login page
  await page.fill('#email', 'test@example.com'); // enter email
  await page.fill('#password', 'password123'); // enter password
  await page.click('#loginBtn'); // click sign in button
  await page.waitForURL(/dashboard/); // wait for dashboard to load
}

export { login }; // export login function so other files can use it