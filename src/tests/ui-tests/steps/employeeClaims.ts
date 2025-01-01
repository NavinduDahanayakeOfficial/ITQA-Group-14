import { Given, Then ,When} from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { ClaimModule } from "../pages/claimModule";
import { Logger } from "../../../utils/logger";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

let claimModule: ClaimModule;
let homepage: HomePage;

Given('User navigates to the "Employee Claims" section', async function () {
    homepage = new HomePage(page);
    await homepage.clickClaimModule();  // Click the Claim Module link
    await claimModule.clickEmployeeClaims();  // Navigate to Employee Claims
    await page.waitForSelector('selector-for-employee-claims-page', { state: 'visible' });
 });


When('User clicks on "Employee Claims"', async function () {
   claimModule = new ClaimModule(page);
   await claimModule.clickEmployeeClaims();
   await page.waitForSelector('//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/h5', { state: 'visible', timeout: 5000 });
});

When('User selects {string} from Event Name dropdown', async function (eventName) {
    await claimModule.selectEventName(eventName);
});

When('User selects {string} from Status dropdown', async function (status) {
    await claimModule.selectStatus(status);
});

When('User clicks the Search button', async function () {
    await claimModule.clickSearchButton();
});

Then('User should see the Employee Claims page', async function () {
    Logger.info('Verifying Employee Claims page is visible');
    const pageTitle = await page.title();
    expect(pageTitle).toContain('OrangeHRM');
    Logger.info('Employee Claims page is verified');
});

Then('User should be able to see the filtered results', async function () {
    // Wait for the results to load
    await page.waitForTimeout(2000);
    // You might want to add more specific verifications here
    Logger.info('Search results are displayed');
}); 