class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async addItemToCart(itemName) {
    const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
    const buttonId = 'add-to-cart-' + formattedName;
    await this.page.click('#' + buttonId);
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async verifyItemInInventory(itemName) {
    await this.page.waitForSelector('text=' + itemName);
  }
}

module.exports = { InventoryPage };
