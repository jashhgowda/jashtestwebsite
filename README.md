# JashwanthTestWebsite — Web App & Playwright Automation Framework

A multi-page web application built from scratch using HTML, CSS and JavaScript, paired with a complete Playwright end-to-end test automation framework.

---

## Live Website

https://jashhgowda.github.io/jashtestwebsite

---

## About the Project

This project was built to demonstrate full-stack testing skills — from designing and developing a web application to automating it with Playwright. The website simulates a real-world application with user authentication, a product catalogue, shopping cart, and contact form.

---

## Pages

| Page | URL | Description |
|---|---|---|
| Login | /index.html | Login with validation, attempt tracking and error handling |
| Register | /register.html | Registration form with password strength meter |
| Dashboard | /dashboard.html | Post-login landing page with stats and activity feed |
| Products | /products.html | Product listing with search, filter and sort |
| Cart | /cart.html | Shopping cart with quantity update and checkout |
| Contact | /contact.html | Contact form with field validation |
| 404 | /404.html | Custom error page with auto redirect |

---

## Test Credentials

| Email | Password |
|---|---|
| test@example.com | password123 |
| admin@test.com | admin123 |

---

## Project Structure

```
jashtestwebsite/
│
├── index.html
├── register.html
├── dashboard.html
├── products.html
├── cart.html
├── contact.html
├── logout.html
├── 404.html
├── session.js
│
├── playwright.config.js
├── package.json
├── README.md
│
└── tests/
    ├── helpers.js
    ├── login.spec.js
    ├── products.spec.js
    ├── cart.spec.js
    └── contact.spec.js
```

---

## Test Coverage

| Test File | Scenarios Covered |
|---|---|
| login.spec.js | Page load, valid login, wrong password, wrong email, empty fields |
| products.spec.js | Page load, search, category filter, sort by price, add to cart |
| cart.spec.js | Page load, empty cart, add product, increase quantity, remove item, total price, checkout |
| contact.spec.js | Page load, empty form errors, invalid email, missing subject, successful submission |

Total: 44 tests passing across Chrome and Safari.

---

## Prerequisites

- Node.js v16 or above
- Git

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jashhgowda/jashtestwebsite.git
cd jashtestwebsite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Run all tests

```bash
npx playwright test
```

---

## Running Specific Tests

```bash
# Run only login tests
npx playwright test tests/login.spec.js

# Run only cart tests
npx playwright test tests/cart.spec.js

# Run in headed mode to watch the browser
npx playwright test --headed

# Run on a specific browser
npx playwright test --project=chromium
npx playwright test --project=webkit
```

---

## View Test Report

```bash
npx playwright show-report
```

---

## Key Features Implemented

- Session management with 20-minute inactivity timeout
- Warning modal before auto logout
- Dedicated logout page with session summary
- Login attempt tracking with lockout after 5 failed attempts
- Reusable login helper function used across all test files
- Cross-browser testing on Chrome and Safari

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Testing | Playwright |
| Hosting | GitHub Pages |
| Version Control | Git and GitHub |

---

## Author

Jashwanth — QA Automation Engineer

- GitHub: https://github.com/jashhgowda
- Live Site: https://jashhgowda.github.io/jashtestwebsite
- LinkedIn: https://linkedin.com/in/jashwanth-h-374053175