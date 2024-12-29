import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { LeaveModule } from "../pages/leaveModule";
import { Logger } from "../utils/logger";
import { HomePage } from "../pages/home.page";

let homepage: HomePage;
let leavemodule: LeaveModule;

// Given('User navigates to the "Leave" module', async function () {
//   Logger.info('Navigating to the "Leave" module');
//   homepage = new HomePage(page);
//   await homepage.clickLeaveModule();
// });

When('User clicks the "Assign Leave" button', async function () {
  Logger.info('Clicking the "Assign Leave" button');
  leavemodule = new LeaveModule(page);
  await leavemodule.clickAssignLeave();
});

When("User fills in the leave details to assign", async function () {
  Logger.info("Filling in the leave details");
  await leavemodule.enterEmployeeName("gan Jerrold Doe");
  await leavemodule.selectDropdown();
  await leavemodule.selectFromDate("2024-20-12");
  await leavemodule.selectToDate("2024-25-12");
  await leavemodule.addComments("Christmas Holidays");
});

Then('User clicks the "Assign" button', async function () {
  Logger.info('Clicking the "Assign" button');
  await leavemodule.clickAssignButton();
});
