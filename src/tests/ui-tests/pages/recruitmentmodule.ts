import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";
import { Logger } from "../utils/logger";

export class RecruitmentModule extends BasePage {
  readonly jobTitleDropdown: Locator;
  //   readonly vacancyDropDown: Locator;
  //   readonly hiringManagerDropDown: Locator;
  //   readonly statusDropdown: Locator;
  //   readonly jobTitleOption: Locator;
  //   readonly vacancy: Locator;
  //   readonly hiringManager: Locator;
  //   readonly status: Locator;
  readonly searchBtn: Locator;
  readonly results: Locator;
  readonly addCandidate: Locator;
  readonly firstName: Locator;
  readonly middletName: Locator;
  readonly email: Locator;
  readonly lastName: Locator;
  readonly saveBtn: Locator;
  readonly candidateName: Locator;

  constructor(page: Page) {
    super(page);
    this.jobTitleDropdown = this.page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/div[1]'
    );
    // this.jobTitleOption = this.page.locator(
    //   '.oxd-select-dropdown.--position-bottom > div.oxd-select-option:nth-of-type(17) > span'
    // );
    // this.vacancyDropDown = this.page.locator(
    //   "/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]"
    // );
    // this.vacancy = this.page.locator(
    //   '//div[@class="oxd-select-text-input"][normalize-space()="Payroll Administrator"]'
    // );
    // this.hiringManagerDropDown = this.page.locator(
    //   "/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]"
    // );
    // this.hiringManager = this.page.locator(
    //   "/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]"
    // );
    // this.statusDropdown = this.page.locator(
    //   "/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[4]/div[1]/div[2]/div[1]/div[1]/div[1]"
    // );
    // this.status = this.page.locator(
    //   "/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[4]/div[1]/div[2]/div[1]/div[1]/div[1]"
    // );
    this.searchBtn = this.page.locator('//button[@type="submit"]');
    this.results = this.page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div'
    );
    this.addCandidate = this.page.locator('//button[normalize-space()="Add"]');
    this.firstName = this.page.locator('//input[@placeholder="First Name"]');
    this.middletName = this.page.locator('//input[@placeholder="Middle Name"]');
    this.lastName = this.page.locator('//input[@placeholder="Last Name"]');
    this.email = this.page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[1]/div/div[2]/input'
    );
    this.saveBtn = this.page.locator(
      '//button[@type="submit" and text()=" Save "]'
    );
    this.candidateName = this.page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/p'
    );
  }
  async selectJobTitle() {
    // Open the Job Title dropdown
    await this.jobTitleDropdown.click();
    Logger.info("Drop down selected");
    // Select the specific Job Title option
    // await this.jobTitleOption.click();
  }

  async clickSearchButton() {
    await this.page.waitForTimeout(5000);
    await this.click(this.searchBtn, "Search button");
  }
  async getSearchResults() {
    await this.page.waitForTimeout(7000);
    return await this.results.innerText();
  }

  async clickAddCandidate() {
    await this.click(this.addCandidate, 'Add Candidate Button');
}

async fillCandidateDetails(fname: string, mname: string, lname: string, email: string) {
    await this.firstName.fill(fname);
    await this.middletName.fill(mname); 
    await this.lastName.fill(lname);
    await this.email.fill(email);
  }

async clickSaveButton() {
   await this.page.waitForTimeout(5000);
   await this.click(this.saveBtn, 'Save Button');
}

async getCandidateName() {
    await this.page.waitForTimeout(20000);
    const nameEmp = await this.candidateName.innerText();
    Logger.info('Employee Name: ' + nameEmp);
    return nameEmp;
}
}
