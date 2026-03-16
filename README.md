# 🧪 JashTest Website — Playwright Automation Framework

A multi-page web application built from scratch using **HTML, CSS and JavaScript**, paired with a complete **Playwright end-to-end test automation framework**.

> Built to demonstrate full-stack testing skills — from building the application to automating it.

---

## 🌐 Live Website

👉 **[https://yourusername.github.io/jashtestwebsite](https://yourusername.github.io/jashtestwebsite)**

---

## 📄 Pages Covered

| Page | URL | Description |
|---|---|---|
| Login | `/index.html` | Login with validation and redirect |
| Register | `/register.html` | Registration with password strength meter |
| Dashboard | `/dashboard.html` | Landing page after login with stats |
| Products | `/products.html` | Product listing with search, filter, sort |
| Cart | `/cart.html` | Cart with qty update, remove, checkout |
| Contact | `/contact.html` | Contact form with validation |
| 404 | `/404.html` | Error page with auto-redirect |

---

## 🔐 Test Credentials

| Email | Password |
|---|---|
| test@example.com | password123 |
| admin@test.com | admin123 |

---

## 🗂️ Project Structure

```
jashtestwebsite/
│
├── index.html               ← Login page
├── register.html            ← Registration page
├── dashboard.html           ← Dashboard (post-login)
├── products.html            ← Product listing
├── cart.html                ← Shopping cart
├── contact.html             ← Contact form
├── 404.html                 ← Error page
│
├── playwright.config.js     ← Playwright configuration
├── package.json             ← Dependencies
├── README.md                ← You are here
│
└── tests/
    ├── login.spec.js        ← Login test cases
    ├── register.spec.js     ← Registration test cases
    ├── products.spec.js     ← Products test cases
    ├── cart.spec.js         ← Cart test cases
    └── contact.spec.js      ← Contact form test cases
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [Git](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/jashtestwebsite.git
cd jashtestwebsite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Run All Tests

```bash
npx playwright test
```

---

## 🧪 Running Specific Tests

```bash
# Run only login tests
npx playwright test tests/login.spec.js

# Run only products tests
npx playwright test tests/products.spec.js

# Run tests in headed mode (watch browser)
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📊 View Test Report

After running tests, open the HTML report:

```bash
npx playwright show-report
```

---

## ✅ Test Scenarios Covered

### Login (`login.spec.js`)
- Valid login redirects to dashboard
- Invalid password shows error message
- Empty fields shows validation
- Logout redirects back to login

### Register (`register.spec.js`)
- Empty form shows all field errors
- Invalid email format shows error
- Password mismatch shows error
- Password shorter than 8 chars shows error
- Valid registration redirects to login

### Products (`products.spec.js`)
- All products load on page
- Search filters results correctly
- Category filter works
- Sort by price low to high
- Sort by name A–Z
- Add to cart updates cart count

### Cart (`cart.spec.js`)
- Cart shows added items
- Increase quantity updates total
- Decrease quantity updates total
- Remove item clears it from cart
- Empty cart shows empty state
- Checkout clears the cart

### Contact (`contact.spec.js`)
- Empty form shows all errors
- Invalid email shows error
- Missing subject shows error
- Valid submission shows success message

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Testing | Playwright |
| Hosting | GitHub Pages |
| Version Control | Git & GitHub |

---

## 👨‍💻 Author

**Jash** — built for interview portfolio and Playwright automation practice.

- GitHub: [github.com/yourusername](https://github.com/yourusername)
- Live Site: [yourusername.github.io/jashtestwebsite](https://yourusername.github.io/jashtestwebsite)
