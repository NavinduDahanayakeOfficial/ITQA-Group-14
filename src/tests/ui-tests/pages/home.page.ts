import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
   readonly pimModule: Locator;
   readonly claimModule: Locator;
   readonly myInfoModule: Locator;
   readonly recruitModule: Locator;
   readonly performanceModule: Locator;
   readonly leaveModule: Locator;
   readonly buzzModule: Locator;

   constructor(page: Page) {
      super(page);
      this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
      this.claimModule = this.page.locator('//a[normalize-space()="Claim"]');
      this.myInfoModule = this.page.locator('//a[normalize-space()="My Info"]');
      this.recruitModule = this.page.locator(
         '//a[normalize-space()="Recruitment"]'
      );
      this.performanceModule = this.page.locator(
         '//a[normalize-space()="Performance"]'
      );
      this.leaveModule = this.page.locator('//a[normalize-space()="Leave"]');
      this.buzzModule = this.page.locator('//a[normalize-space()="Buzz"]');
   }

   async clickPimModule() {
      await this.click(this.pimModule, "PIM Module");
   }

   async clickClaimModule() {
      await this.click(this.claimModule, "Claim Module");
   }

   async clickMyInfoModule() {
      await this.click(this.myInfoModule, "My Info Module");
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
   async clickBuzzModule() {
      await this.click(this.buzzModule, 'Buzz Module');
      await this.page.waitForTimeout(4000);
  }
}
