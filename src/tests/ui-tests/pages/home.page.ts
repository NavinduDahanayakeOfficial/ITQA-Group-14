import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
   readonly pimModule: Locator;
   readonly myInfoModule: Locator;
   readonly recruitModule: Locator;

   constructor(page: Page) {
      super(page);
      this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
      this.recruitModule = this.page.locator('//a[normalize-space()="Recruitment"]');
      this.myInfoModule = this.page.locator('//a[normalize-space()="My Info"]');
   }

   async clickPimModule() {
      await this.click(this.pimModule, "PIM Module");
   }

   async clickRecruitmentModule() {
      await this.click(this.recruitModule, "Recruitment Module");
   }

   async clickMyInfoModule() {
      await this.click(this.myInfoModule, "My Info Module");
   }
}
