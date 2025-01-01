import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly pimModule: Locator;
  readonly recruitModule: Locator;
  readonly performanceModule: Locator;
  readonly leaveModule: Locator;

  constructor(page: Page) {
    super(page);
    this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
    this.recruitModule = this.page.locator('//a[normalize-space()="Recruitment"]');
    this.performanceModule = this.page.locator('//a[normalize-space()="Performance"]');
    this.leaveModule = this.page.locator('//a[normalize-space()="Leave"]');
  }

  async clickPimModule() {
    await this.click(this.pimModule, "PIM Module");
  }

  async clickRecruitmentModule() {
    await this.click(this.recruitModule, "Recruitment Module");
  }

  async clickPerformanceModule() {
    await this.click(this.performanceModule, "Performance Module");
  }
  async clickLeaveModule() {
    await this.click(this.leaveModule, "Leave Module");
  }
}
