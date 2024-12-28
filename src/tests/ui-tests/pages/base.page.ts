import { Locator, Page } from "playwright";
import { Logger } from "../../../utils/logger";

export class BasePage {
   protected page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   protected async click(locator: Locator, description: string) {
      try {
         await locator.click();
         Logger.info(`Clicked on ${description}`);
      } catch (error) {
         Logger.error(`Failed to click on ${description}: ${error}`);
         throw error;
      }
   }

   protected async fill(locator: Locator, value: string, description: string) {
      try {
         await locator.fill(value);
         Logger.info(`Filled ${description} with value: ${value}`);
      } catch (error) {
         Logger.error(`Failed to fill ${description}: ${error}`);
         throw error;
      }
   }

   protected async isVisible(locator: Locator): Promise<boolean> {
      try {
         return await locator.isVisible();
      } catch (error) {
         Logger.error(`Error checking visibility: ${error}`);
         return false;
      }
   }
}
