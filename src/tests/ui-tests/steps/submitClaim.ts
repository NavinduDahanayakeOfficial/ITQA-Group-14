import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { HomePage } from "../pages/home.page";
import { ClaimModule } from "../pages/claimModule";
import { Logger } from "../../../utils/logger";
import { expect } from "@playwright/test";


let homepage: HomePage;
let claimmodule: ClaimModule;

Given('User navigates to the "Claim" module', async function () {
   homepage = new HomePage(page);  // Instantiate HomePage with the current page
   await homepage.clickClaimModule();  // Click the Claim Module link
});

When('User clicks on "Submit Claim"', async function () {
   claimmodule = new ClaimModule(page);
   await claimmodule.clickSubmitClaim();
});

When("User fills in the Claim details", async function () {
    Logger.info("Filling in the Claim details");
    await claimmodule.selectEventDropdown();
    Logger.info("Event dropdown selected");
    await claimmodule.selectCurrencyDropdown();
    Logger.info("Currency dropdown selected");
    await claimmodule.addRemarks("Christmas Holidays");
    Logger.info("Remarks added");
});

When('User clicks the "Create" button', async function () {
    Logger.info('Clicking the "Create" button');
    await claimmodule.clickCreateButton();
    await page.waitForTimeout(2000);  
 });

  Then('User verifies the claim submission success', async function () {
    Logger.info('Verifying claim submission success');
    const successMessage = await claimmodule.verifyClaimSuccess();
    Logger.info('Claim submission success message: ' + successMessage);
    expect(successMessage).toContain('Claim successfully submitted');
 });
 