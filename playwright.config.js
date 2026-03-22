// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // folder where all test files are stored
  fullyParallel: true, // run all tests at the same time
  forbidOnly: !!process.env.CI, // prevent test.only from being committed
  retries: 1, // retry failed tests once
  workers: process.env.CI ? 1 : undefined, // single worker on CI, auto on local
  reporter: 'html', // generate HTML report after tests run
  timeout: 60000, // global timeout 60 seconds for all tests

  use: {
    baseURL: 'https://jashhgowda.github.io/jashtestwebsite', // your live website URL
    trace: 'on-first-retry', // record trace when test fails and retries
    headless: false, // show the browser when tests run
    actionTimeout: 15000, // wait 15 seconds for each action
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // run tests on Chrome
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }, // run tests on Safari
    },
  ],

});