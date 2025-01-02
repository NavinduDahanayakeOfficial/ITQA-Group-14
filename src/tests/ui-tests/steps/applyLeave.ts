import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { LeaveModule } from "../pages/leaveModule";

import { HomePage } from "../pages/home.page";
import { Logger } from "../../../utils/logger";

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
  await leavemodule.selectFromDate("2024-20-12");
  await leavemodule.selectToDate("2024-25-12");
  await leavemodule.addComments("Christmas Holidays");
});

Then('User clicks the "Submit" button', async function () {
  Logger.info('Clicking the "Submit" button');
  await leavemodule.clickApplyButton();
});
