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
   await page.waitForSelector('selector-for-employee-claims-page', { state: 'visible' });
});

Then('User should see the Employee Claims page', async function () {
    Logger.info('Verifying Employee Claims page is visible');
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Employee Claims');
    Logger.info('Employee Claims page is verified');
}); 