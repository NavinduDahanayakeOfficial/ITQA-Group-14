import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly pimModule: Locator;
  readonly leaveModule: Locator;

  constructor(page: Page) {
    super(page);
    this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
    this.leaveModule = this.page.locator('//a[normalize-space()="Leave"]');
  }

  async clickPimModule() {
    await this.click(this.pimModule, "PIM Module");
  }

  async clickLeaveModule() {
    await this.click(this.leaveModule, "Leave Module");
  }
}
