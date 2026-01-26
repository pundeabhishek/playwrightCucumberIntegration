class CartPage {
  constructor(page) {
    this.page = page;
  }

  async verifyItemInCart(itemName) {
    await this.page.waitForSelector(`text=${itemName}`);
  }

  async removeItem(itemName) {
    await this.page.click(`button[id^="remove"]`);
  }
}

module.exports = { CartPage };
