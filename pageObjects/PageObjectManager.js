const { LoginPage } = require('./LoginPage');
const { InventoryPage } = require('./InventoryPage');
const { CartPage } = require('./CartPage');

class PageObjectManager {
  constructor(page) {
    this.page = page;
    this.loginPage = null;
    this.inventoryPage = null;
    this.cartPage = null;
  }

  getLoginPage() {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
    }
    return this.loginPage;
  }

  getInventoryPage() {
    if (!this.inventoryPage) {
      this.inventoryPage = new InventoryPage(this.page);
    }
    return this.inventoryPage;
  }

  getCartPage() {
    if (!this.cartPage) {
      this.cartPage = new CartPage(this.page);
    }
    return this.cartPage;
  }
}

module.exports = { PageObjectManager };
