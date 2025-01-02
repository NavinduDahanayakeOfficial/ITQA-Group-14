import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { ClaimModule } from "../pages/claimModule";
import { Logger } from "../../../utils/logger";
import { expect } from "@playwright/test";

let claimmodule: ClaimModule;

When('User clicks on "Assign Claim"', async function () {
    claimmodule = new ClaimModule(page);
    await claimmodule.clickAssignClaim();
});

When('User fills in the Assign Claim details', async function () {
    Logger.info("Filling in the Assign Claim details with all required fields");
    await claimmodule.fillEmployeeName("John Doe");
    await claimmodule.selectAssignEventDropdown();
    await claimmodule.selectAssignCurrencyDropdown();
    await claimmodule.addAssignRemarks("Assignment Remarks");
});

When('User fills in the Assign Claim details except Employee Name', async function () {
    Logger.info("Filling in the Assign Claim details except Employee Name");
    await claimmodule.selectAssignEventDropdown();
    await claimmodule.selectAssignCurrencyDropdown();
    await claimmodule.addAssignRemarks("Assignment Remarks");
});

When('User fills in the Assign Claim details except Event', async function () {
    Logger.info("Filling in the Assign Claim details except Event");
    await claimmodule.fillEmployeeName("John Doe");
    await claimmodule.selectAssignCurrencyDropdown();
    await claimmodule.addAssignRemarks("Assignment Remarks");
});

When('User fills in the Assign Claim details except Currency', async function () {
    Logger.info("Filling in the Assign Claim details except Currency");
    await claimmodule.fillEmployeeName("John Doe");
    await claimmodule.selectAssignEventDropdown();
    await claimmodule.addAssignRemarks("Assignment Remarks");
});

Then('User clicks the "Create" button to assign the claim', async function () {
    Logger.info('Clicking the "Create" button to assign the claim');
    await claimmodule.clickCreateButton();
    await page.waitForTimeout(2000);
});

Then('User verifies the claim assignment success', async function () {
    Logger.info('Verifying claim assignment success');
    const successMessage = await claimmodule.verifyClaimSuccess();
    Logger.info('Claim assignment success message: ' + successMessage);
    expect(successMessage).toContain('Claim successfully assigned');
});

Then('User should see a warning message for Employee Name', async function () {
    Logger.info('Checking for warning message for missing Employee Name');
    const warningMessage = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/span').textContent();
    expect(warningMessage).toContain('required');
});

Then('User should see a warning message for Event', async function () {
    Logger.info('Checking for warning message for missing Event');
    const warningMessage = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/span').textContent();
    expect(warningMessage).toContain('required');
});

Then('User should see a warning message for Currency', async function () {
    Logger.info('Checking for warning message for missing Currency');
    const warningMessage = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/span').textContent();
    expect(warningMessage).toContain('required');
}); 