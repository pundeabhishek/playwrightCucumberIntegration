const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('../pageObjects/PageObjectManager');

test.describe('SauceDemo E2E Flow with PageObjectManager', () => {

  test('User can log in successfully', async ({ page, baseURL }) => {
    const pom = new PageObjectManager(page);
    const loginPage = pom.getLoginPage();

    await page.goto(baseURL);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('Add item to cart', async ({ page, baseURL }) => {
    const pom = new PageObjectManager(page);
    const loginPage = pom.getLoginPage();
    const inventoryPage = pom.getInventoryPage();

    await page.goto(baseURL);
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });

  test('Remove item from cart', async ({ page, baseURL }) => {
    const pom = new PageObjectManager(page);
    const loginPage = pom.getLoginPage();
    const inventoryPage = pom.getInventoryPage();
    const cartPage = pom.getCartPage();

    await page.goto(baseURL);
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.removeItem('Sauce Labs Backpack');
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

});
