// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // load environment variables from .env file

export default defineConfig({
  testDir: './tests', // folder where all test files are stored
  fullyParallel: true, // run all tests at the same time
  forbidOnly: !!process.env.CI, // prevent test.only from being committed
  retries: 1, // retry failed tests once before marking as failed
  workers: process.env.CI ? 1 : undefined, // single worker on CI, auto on local

  reporter: [
    ['html', { open: 'on-failure' }], // playwright HTML report
    ['list'], // show results in terminal as they run
    ['allure-playwright'], // allure report
  ],

  timeout: 60000, // global timeout 60 seconds per test

  use: {
    baseURL: process.env.BASE_URL || 'https://jashhgowda.github.io/jashtestwebsite', // use env variable or fallback
    trace: 'on-first-retry', // record trace when test fails and retries
    headless: false, // show the browser when tests run
    actionTimeout: 15000, // wait 15 seconds for each action
    screenshot: 'only-on-failure', // take screenshot only when test fails
    video: 'retain-on-failure', // record video only when test fails
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