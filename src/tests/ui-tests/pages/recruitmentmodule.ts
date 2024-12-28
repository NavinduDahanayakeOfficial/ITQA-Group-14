import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";
import { Logger } from "../utils/logger";

export class RecruitmentModule extends BasePage {
  readonly jobTitleDropdown: Locator;
  readonly vacancyDropdown: Locator;
  readonly hiringManagerDropdown: Locator;
  readonly statusDropdown: Locator;
  readonly searchButton: Locator;
  readonly results: Locator;
  readonly addCandidate: Locator;
  readonly firstName: Locator;
  readonly middletName: Locator;
  readonly email: Locator;
  readonly lastName: Locator;
  readonly saveButton: Locator;
  readonly candidateName: Locator;
  readonly deleteButton: Locator;
  readonly confirmButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.jobTitleDropdown = this.page.locator(
      '(//div[contains(@class, "oxd-select-wrapper")])[1]'
    );
    this.vacancyDropdown = this.page.locator(
      '(//div[contains(@class, "oxd-select-wrapper")])[2]'
    );
    this.hiringManagerDropdown = this.page.locator(
      '(//div[contains(@class, "oxd-select-wrapper")])[3]'
    );
    this.statusDropdown = this.page.locator(
      '(//div[contains(@class, "oxd-select-wrapper")])[4]'
    );
    this.searchButton = this.page.locator('//button[@type="submit"]');
    this.results = this.page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]'
    );
    this.addCandidate = this.page.locator('//button[normalize-space()="Add"]');
    this.firstName = this.page.locator('//input[@placeholder="First Name"]');
    this.middletName = this.page.locator('//input[@placeholder="Middle Name"]');
    this.lastName = this.page.locator('//input[@placeholder="Last Name"]');
    this.email = this.page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[1]/div/div[2]/input'
    );
    this.saveButton = this.page.locator(
      '//button[@type="submit" and text()=" Save "]'
    );
    this.candidateName = this.page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/p'
    );
    this.deleteButton = this.page.locator(
      '//div[@role="table"]//div[1]//div[1]//div[7]//div[1]//button[2]//i[1]'
    );
    this.confirmButton = this.page.locator(
      '//button[normalize-space()="Yes, Delete"]'
    );
    this.successMessage = this.page.locator('//p[@class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text"]')
  }

  async selectJobTitle() {
    await this.click(this.jobTitleDropdown, "Job Title Dropdown");
    await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", {
      state: "visible",
    });
    await this.page.waitForTimeout(1000);
    await this.page
      .locator(".oxd-select-dropdown .oxd-select-option")
      .nth(0)
      .click();
  }

  async selectVacancy() {
    await this.click(this.vacancyDropdown, "Vacancy Dropdown");
    await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", {
      state: "visible",
    });
    await this.page.waitForTimeout(1000);
    await this.page
      .locator(".oxd-select-dropdown .oxd-select-option")
      .nth(3)
      .click();
  }

  async selectHiringManager() {
    await this.click(this.hiringManagerDropdown, "Hiring Manager Dropdown");
    await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", {
      state: "visible",
    });
    await this.page.waitForTimeout(1000);
    await this.page
      .locator(".oxd-select-dropdown .oxd-select-option")
      .nth(1)
      .click();
  }

  async selectStatus() {
    await this.click(this.statusDropdown, "Status Dropdown");
    await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", {
      state: "visible",
    });
    await this.page.waitForTimeout(1000);
    await this.page
      .locator(".oxd-select-dropdown .oxd-select-option")
      .nth(1)
      .click();
  }

  async clickSearchButton() {
    await this.page.waitForTimeout(5000);
    await this.click(this.searchButton, "Search Button");
  }
  async getSearchResults() {
    await this.page.waitForTimeout(7000);
    return await this.results.innerText();
  }

  async clickAddCandidate() {
    await this.click(this.addCandidate, "Add Candidate Button");
  }

  async fillCandidateDetails(
    fname: string,
    mname: string,
    lname: string,
    email: string
  ) {
    await this.firstName.fill(fname);
    await this.middletName.fill(mname);
    await this.lastName.fill(lname);
    await this.email.fill(email);
  }

  async clickSaveButton() {
    await this.page.waitForTimeout(5000);
    await this.click(this.saveButton, "Save Button");
  }

  async getCandidateName() {
    await this.page.waitForTimeout(20000);
    const candidateName = await this.candidateName.innerText();
    Logger.info("Employee Name: " + candidateName);
    return candidateName;
  }

  async deleteCandidate() {
    await this.page.waitForTimeout(5000);
    await this.click(this.deleteButton, "Delete Button");
    await this.page.waitForTimeout(5000);
    await this.click(this.confirmButton, "Delete Confirmation Button");
  }

  async getSuccessMessage() {
    const message = this.successMessage.textContent();
    await this.page.waitForTimeout(5000);
    return message;
  }
}