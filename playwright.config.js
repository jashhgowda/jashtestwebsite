// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // folder where all test files are stored

  fullyParallel: true, // run all tests at the same time

  forbidOnly: !!process.env.CI, // prevent test.only from being committed

  retries: process.env.CI ? 2 : 0, // retry failed tests 2 times on CI only

  workers: process.env.CI ? 1 : undefined, // single worker on CI, auto on local

  reporter: 'html', // generate HTML report after tests run

  use: {
  baseURL: 'https://jashhgowda.github.io/jashtestwebsite', // your live website URL, // your live website URL
    trace: 'on-first-retry', // record trace when test fails and retries
    headless: false, // show the browser when tests run
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // run tests on Chrome
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }, // run tests on Firefox
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }, // run tests on Safari
    },
  ],

});