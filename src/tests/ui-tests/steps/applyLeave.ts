import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { LeaveModule } from "../pages/leaveModule";
import { Logger } from "../utils/logger";
import { HomePage } from "../pages/home.page";

let homepage: HomePage;
let leavemodule: LeaveModule;

Given('User navigates to the "Leave" module', async function () {
  Logger.info('Navigating to the "Leave" module');
  homepage = new HomePage(page);
  await homepage.clickLeaveModule();
});

When('User clicks the "Apply" button', async function () {
  Logger.info('Clicking the "Apply" button');
  leavemodule = new LeaveModule(page);
  await leavemodule.clickApplyLeave();
});

When("User fills in the leave details", async function () {
  Logger.info("Filling in the leave details");
  await leavemodule.selectDropdown();
  await leavemodule.selectFromDate("20-12-2024");
  await leavemodule.selectToDate("25-12-2024");
  await leavemodule.addComments("Christmas Holidays");
});

Then('User clicks the "Submit" button', async function () {
  Logger.info('Clicking the "Submit" button');
  await leavemodule.clickApplyButton();
});
