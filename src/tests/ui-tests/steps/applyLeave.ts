import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { LeaveModule } from "../pages/leaveModule";
import { Logger } from "../utils/logger";

let leavemodule: LeaveModule;

Given('User navigates to the "Leave" module', async function () {
  leavemodule = new LeaveModule(page);
  Logger.info("Navigating to the Leave module");
  await leavemodule.navigateToLeaveModule();
});

When('User clicks the "Apply" button', async function () {
  Logger.info("Clicking the Apply Leave button");
  await leavemodule.clickApplyLeave();
});

When("User fills in the leave details", async function () {
  Logger.info("Filling leave details with hardcoded data");
  await leavemodule.fillLeaveDetails("Annual Leave", "2023-12-01", "2023-12-10", "Vacation");
});

When('User clicks the "apply" button', async function () {
  Logger.info("Clicking the apply button");
  await leavemodule.clickApplyButton();
});

Then("Verifies that the leave request is successfully submitted", async function () {
  Logger.info("Verifying successful leave request submission");
  const successMessage = await leavemodule.getSubmissionMessage();
  expect(successMessage).toContain("Successfully Submitted");
});
