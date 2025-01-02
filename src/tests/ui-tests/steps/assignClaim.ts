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
    Logger.info("Filling in the Assign Claim details");
    await claimmodule.fillEmployeeName("John Doeeeee");
    await claimmodule.selectAssignEventDropdown();
    await claimmodule.selectAssignCurrencyDropdown();
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