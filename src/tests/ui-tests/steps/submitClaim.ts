import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { HomePage } from "../pages/home.page";
import { ClaimModule } from "../pages/claimmodule";
import { Logger } from "../../../utils/logger";

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

  
  Then('User clicks the "Create" button', async function () {
    Logger.info('Clicking the "Create" button');
    await claimmodule.clickCreateButton();
  });