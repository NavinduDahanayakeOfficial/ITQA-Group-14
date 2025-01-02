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

When('User fills in the Currency and Remarks', async function () {
    Logger.info("Filling in the Currency and Remarks");
    await claimmodule.selectCurrencyDropdown();
    Logger.info("Currency dropdown selected");
    await claimmodule.addRemarks("Christmas Holidays");
    Logger.info("Remarks added");
});

When('User fills in the Event and Remarks', async function () {
    Logger.info("Filling in the Event and Remarks");
    await claimmodule.selectEventDropdown();
    Logger.info("Event dropdown selected");
    await claimmodule.addRemarks("Christmas Holidays");
    Logger.info("Remarks added");
});

When('User fills in the Remarks', async function () {
    Logger.info("Filling in the Remarks");
    await claimmodule.addRemarks("Christmas Holidays");
    Logger.info("Remarks added");
});

Then('User verifies the claim submission success', async function () {
    Logger.info('Verifying claim submission success');
    const isPageLoaded = await claimmodule.verifyClaimSuccess();
    Logger.info('Claim submission page loaded: ' + isPageLoaded);
    expect(isPageLoaded).toBe(true);
});

Then('User sees "Required" message for Event field', async function () {
    Logger.info('Checking for "Required" message for Event field');
    const isEventRequiredVisible = await claimmodule.isEventRequiredVisible();
    if (isEventRequiredVisible) {
        Logger.info('"Required" message is visible for Event field');
    }
    expect(isEventRequiredVisible).toBe(true);
});

Then('User sees "Required" message for Currency field', async function () {
    Logger.info('Checking for "Required" message for Currency field');
    const isCurrencyRequiredVisible = await claimmodule.isCurrencyRequiredVisible();
    if (isCurrencyRequiredVisible) {
        Logger.info('"Required" message is visible for Currency field');
    }
    expect(isCurrencyRequiredVisible).toBe(true);
});

Then('User sees "Required" message for both Event and Currency fields', async function () {
    Logger.info('Checking for "Required" message for both Event and Currency fields');
    const isEventRequiredVisible = await claimmodule.isEventRequiredVisible();
    const isCurrencyRequiredVisible = await claimmodule.isCurrencyRequiredVisible();
    if (isEventRequiredVisible) {
        Logger.info('"Required" message is visible for Event field');
    }
    if (isCurrencyRequiredVisible) {
        Logger.info('"Required" message is visible for Currency field');
    }
    expect(isEventRequiredVisible).toBe(true);
    expect(isCurrencyRequiredVisible).toBe(true);
});
 