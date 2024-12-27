import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";
import { Logger } from "../utils/logger";
import { takeCoverage } from "v8";

export class LeaveModule extends BasePage {
  readonly applyLeaveButton: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDateField: Locator;
  readonly toDateField: Locator;
  readonly commentsField: Locator;
  readonly applyButton: Locator;

  constructor(page: Page) {
    super(page);

    // Locators for the leave module
    this.applyLeaveButton = this.page.locator('//a[normalize-space()="Apply"]');
    this.leaveTypeDropdown = this.page.locator('//div[contains(@class, "oxd-select-wrapper")]');
    this.fromDateField = this.page.locator('(//div[contains(@class, "oxd-date-input")]//input)[1]');
    this.toDateField = this.page.locator('(//div[contains(@class, "oxd-date-input")]//input)[2]');
    this.commentsField = this.page.locator('//textarea[contains(@class, "oxd-textarea")]');
    this.applyButton = this.page.locator('//button[normalize-space()="Apply"]');
  }

  // Navigate to the Leave module
  async navigateToLeaveModule() {
    Logger.info("Navigating to the Leave module");
    await this.applyLeaveButton.click();
  }

  // Click the 'Apply Leave' button
  async clickApplyLeave() {
    await this.click(this.applyLeaveButton, "Apply Leave button");
  }

  // Select an option from a dropdown
  async selectDropdown() {
    await this.click(this.leaveTypeDropdown, "Leave Type dropdown");
    await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible" });
    await this.page.waitForTimeout(1000);
    await this.page.locator(".oxd-select-dropdown .oxd-select-option").nth(1).click();
  }

  async selectFromDate(date: string) {
    await this.page.waitForTimeout(2000);
    await this.fromDateField.clear();
    await this.fromDateField.fill(date);
  }

  async selectToDate(date: string) {
    await this.page.waitForTimeout(2000);
    await this.toDateField.clear();
    await this.toDateField.fill(date);
  }

  async addComments(comments: string) {
    await this.page.waitForTimeout(2000);
    await this.commentsField.fill(comments);
  }

  // Click the 'Apply' button
  async clickApplyButton() {
    await this.click(this.applyButton, "Apply button");
  }
}
