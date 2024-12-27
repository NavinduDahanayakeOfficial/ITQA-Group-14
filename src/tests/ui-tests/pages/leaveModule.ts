import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";
import { Logger } from "../utils/logger";

export class LeaveModule extends BasePage {
  readonly applyLeaveButton: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDateField: Locator;
  readonly toDateField: Locator;
  readonly commentsField: Locator;
  readonly applyButton: Locator;
  readonly leaveRequestSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Locators for the leave module
    this.applyLeaveButton = this.page.locator('//a[normalize-space()="Apply"]');
    this.leaveTypeDropdown = this.page.locator('//i[@class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"]'); // Replace with the correct path
    this.fromDateField = this.page.locator('//input[@name="fromDate"]'); // Replace with the correct path
    this.toDateField = this.page.locator('//input[@name="toDate"]'); // Replace with the correct path
    this.commentsField = this.page.locator('//textarea[@placeholder="Comments"]'); // Replace with the correct path
    this.applyButton = this.page.locator('//button[text()="Submit"]'); // Replace with the correct path
    this.leaveRequestSuccessMessage = this.page.locator('//div[contains(text(), "Successfully Submitted")]'); // Replace with correct path
  }

  // Select an option from a dropdown
  async selectDropdown(dropdown: Locator, option: string, description: string) {
    Logger.info(`Selecting ${option} from ${description}`);
    await dropdown.selectOption({ label: option });
  }

  // Navigate to the Leave module
  async navigateToLeaveModule() {
    Logger.info("Navigating to the Leave module");
    await this.applyLeaveButton.click();
  }

  // Click the 'Apply Leave' button
  async clickApplyLeave() {
    Logger.info("Clicking on the Apply Leave button");
    await this.click(this.applyLeaveButton, "Apply Leave button");
  }

  // Fill leave details
  async fillLeaveDetails(leaveType: string, fromDate: string, toDate: string, comments: string) {
    Logger.info("Filling leave details");
    await this.selectDropdown(this.leaveTypeDropdown, leaveType, "Leave Type dropdown");
    await this.fromDateField.fill(fromDate);
    await this.toDateField.fill(toDate);
    await this.commentsField.fill(comments);
  }

  // Click the 'Apply' button
  async clickApplyButton() {
    Logger.info("Clicking on the Apply button");
    await this.click(this.applyButton, "Apply button");
  }

  // Get the submission message
  async getSubmissionMessage() {
    Logger.info("Retrieving submission message");
    return await this.leaveRequestSuccessMessage.textContent();
  }
}
