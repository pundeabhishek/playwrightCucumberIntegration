const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(60 * 1000);

// Background: Navigate to login page
Given('the user is on the login page', async function () {

  console.log('Navigating to login page...');
  await this.page.goto('https://www.saucedemo.com');

});

// Background: Login with credentials
When('the user logs in using {string} and {string}', async function (username, password) {
  console.log('Logging in with username: ' + username);
  const loginPage = this.pom.getLoginPage();
  await loginPage.login(username, password);
});

// Background: Verify redirect to inventory
Then('the user should be redirected to the inventory page', async function () {
  console.log('Verifying redirect to inventory page');
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// Add item to cart
When('the user adds {string} to the cart', { timeout: 30 * 1000 }, async function (item) {
  console.log('Adding ' + item + ' to cart');
  const inventoryPage = this.pom.getInventoryPage();
  await inventoryPage.addItemToCart(item);
});

// Navigate to cart page
When('navigates to the cart page', async function () {
  console.log('Navigating to cart page');
  const inventoryPage = this.pom.getInventoryPage();
  await inventoryPage.goToCart();
});

// Verify item in cart
Then('the cart should display {string}', async function (item) {
  console.log('Verifying ' + item + ' in cart');
  const cartPage = this.pom.getCartPage();
  await cartPage.verifyItemInCart(item);
});

// Remove item from cart
When('the user removes {string} from the cart', async function (item) {
  console.log('Removing ' + item + ' from cart');
  const cartPage = this.pom.getCartPage();
  await cartPage.removeItem(item);
});

// Verify cart is empty
Then('the cart should be empty', async function () {
  console.log('Verifying cart is empty');
  const items = await this.page.locator('.cart_item').count();
  expect(items).toBe(0);
});



