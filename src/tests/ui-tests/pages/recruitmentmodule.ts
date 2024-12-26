import { Page } from 'playwright';
import { BasePage } from './base.page';

export class RecruitmentModule extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Select an option from a dropdown based on its label.
   * @param label - The label of the dropdown (e.g., "Job Title", "Vacancy").
   * @param option - The option to select from the dropdown.
   */
  async selectDropdownOption(label: string, option: string) {
    const dropdownLocator = this.page.locator(
      `//label[text()="${label}"]/following-sibling::div//div[@class="oxd-select-text"]`
    );
    await dropdownLocator.click(); // Open the dropdown

    const optionLocator = this.page.locator(
      `//div[@role="option" and normalize-space(text())="${option}"]`
    );
    await optionLocator.click(); // Select the option
  }

  /**
   * Click on the Search button.
   */
  async clickSearchButton() {
    const searchButton = this.page.locator('//button[@type="submit"]');
    await searchButton.click(); // Click the Search button
  }

  /**
   * Verify if candidates matching the selected criteria are displayed.
   */
  async verifySearchResults() {
    const resultRows = this.page.locator('//table[@class="oxd-table"]/tbody/tr');
    const rowCount = await resultRows.count();

    // Ensure at least one row is displayed in the results table
    if (rowCount === 0) {
      throw new Error('No candidates found matching the selected criteria');
    }
  }
}


// import { Locator, Page} from 'playwright';
// import { BasePage } from './base.page';
// import { Logger } from '../utils/logger';

// export class RecruitmentModule extends BasePage {
//   readonly jobTitleDropdown: Locator;
//   readonly vacancyDropDown: Locator;
//   readonly hiringManagerDropDown: Locator;
//   readonly statusDropdown: Locator;
//   readonly jobTitle: Locator;
//   readonly vacancy: Locator;
//   readonly hiringManager: Locator;
//   readonly status: Locator;
//   readonly searchBtn: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.jobTitleDropdown = this.page.locator('/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]');
//     this.jobTitle = this.page.locator('//div[@class="oxd-select-text-input"][normalize-space()="Payroll Administrator"]'); 
//     this.vacancyDropDown = this.page.locator('/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]');
//     this.vacancy = this.page.locator('//div[@class="oxd-select-text-input"][normalize-space()="Payroll Administrator"]');
//     this.hiringManagerDropDown = this.page.locator('/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]');
//     this.hiringManager = this.page.locator('/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]'); 
//     this.statusDropdown = this.page.locator('/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[4]/div[1]/div[2]/div[1]/div[1]/div[1]');
//     this.status = this.page.locator('/html[1]/body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[4]/div[1]/div[2]/div[1]/div[1]/div[1]');
//     this.searchBtn = this.page.locator('//button[@type="submit"]');
//   }
//   async searchCandidate(name: string) {
//     await this.searchBtn.click();
//   }
//   async clickSearchBtn() {
//     await this.page.waitForTimeout(5000);
//     await this.click(this.searchBtn, 'Search button');
// }
// }