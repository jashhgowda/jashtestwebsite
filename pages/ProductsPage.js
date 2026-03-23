export class ProductsPage {

  constructor(page) {
    this.page = page; // store the page object

    // selectors — all products page elements defined here
    this.searchInput    = page.locator('#searchInput'); // search input field
    this.sortDropdown   = page.locator('#sortSelect'); // sort dropdown
    this.productCards   = page.locator('.product-card'); // all product cards
    this.productNames   = page.locator('.product-name'); // all product names
    this.productCategory = page.locator('.product-category'); // all product categories
    this.addToCartBtn   = page.locator('.add-btn').first(); // first add to cart button
    this.cartCount      = page.locator('#cartCount'); // cart count in navbar
  }

  async goto() {
    await this.page.goto('/jashtestwebsite/products.html'); // navigate to products page
  }

  async search(keyword) {
    await this.searchInput.fill(keyword); // type keyword in search box
  }

  async filterByCategory(category) {
    await this.page.click(`text=${category}`); // click category filter button
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value); // select sort option from dropdown
  }

  async addFirstProductToCart() {
    await this.addToCartBtn.click(); // click first add to cart button
  }

  async getCartCount() {
    return this.cartCount.textContent(); // return cart count text
  }

}