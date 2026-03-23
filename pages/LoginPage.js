export class LoginPage {

  constructor(page) {
    this.page = page; // store the page object

    // selectors — all login page elements defined here
    this.emailInput    = page.locator('#email'); // email input field
    this.passwordInput = page.locator('#password'); // password input field
    this.loginButton   = page.locator('#loginBtn'); // sign in button
    this.emailError    = page.locator('#emailErr'); // email error message
    this.passwordError = page.locator('#passwordErr'); // password error message
    this.attemptBar    = page.locator('#attemptBar'); // attempt warning bar
  }

  async goto() {
    await this.page.goto('/jashtestwebsite/'); // navigate to login page
  }

  async login(email, password) {
    await this.emailInput.fill(email); // type email
    await this.passwordInput.fill(password); // type password
    await this.page.keyboard.press('Enter'); // press enter to submit
  }

  async getEmailError() {
    return this.emailError.textContent(); // return email error text
  }

  async getPasswordError() {
    return this.passwordError.textContent(); // return password error text
  }

}