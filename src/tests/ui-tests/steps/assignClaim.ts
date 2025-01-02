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

Then('User verifies the claim assignment page is displayed', async function () {
    Logger.info('Verifying claim assignment page is displayed');
    const isAssignClaimPageVisible = await claimmodule.verifyAssignClaimPage();
    expect(isAssignClaimPageVisible).toBe(true);
});

Then('User should see a warning message for Employee Name', async function () {
    Logger.info('Checking for "Required" message under Employee Name');
    const isRequiredVisible = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/span').isVisible();
    const requiredText = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/span').textContent();
    expect(isRequiredVisible).toBe(true);
    if (isRequiredVisible) {
        Logger.info('"Required" message is visible under Employee Name');
    }
    expect(requiredText).toContain('Required');
});

Then('User should see a warning message for Event', async function () {
    Logger.info('Checking for "Required" message under Event');
    const isRequiredVisible = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/span').isVisible();
    const requiredText = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/span').textContent();
    expect(isRequiredVisible).toBe(true);
    if (isRequiredVisible) {
        Logger.info('"Required" message is visible under Event');
    }
    expect(requiredText).toContain('Required');
});

Then('User should see a warning message for Currency', async function () {
    Logger.info('Checking for "Required" message under Currency');
    const isRequiredVisible = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/span').isVisible();
    const requiredText = await page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/span').textContent();
    expect(isRequiredVisible).toBe(true);
    if (isRequiredVisible) {
        Logger.info('"Required" message is visible under Currency');
    }
    expect(requiredText).toContain('Required');
}); 