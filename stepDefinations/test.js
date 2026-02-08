const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

setDefaultTimeout(60 * 1000);

Then('I take the scrrenshot of landng page', async function () {

    await this.page.screenshot({ path: 'screenshots/landing_page.png' });
    const invetoryPage = this.pom.getInventoryPage();
    await invetoryPage.goToCart()
});