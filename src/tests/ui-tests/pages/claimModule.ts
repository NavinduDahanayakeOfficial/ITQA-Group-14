import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";
import { Logger } from "../../../utils/logger";


export class ClaimModule extends BasePage {
   readonly submitClaimButton: Locator;
   readonly eventTypeDropdown: Locator;
   readonly createButton: Locator;
   readonly remarksField: Locator ;
   readonly currencyTypeDropdown: Locator;
   readonly claimSuccessMessage: Locator; 
   readonly assignClaimButton: Locator;


   constructor(page: Page) {
    super(page);
    this.submitClaimButton = this.page.locator('//a[normalize-space()="Submit Claim"]');
    this.eventTypeDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div');
    this.currencyTypeDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div');
    this.createButton = this.page.locator('//button[normalize-space()="Create"]');
    this.remarksField = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div/div/div[2]/textarea');
    this.claimSuccessMessage = this.page.locator('//div[contains(@class, "success-message")]'); 
    this.assignClaimButton = this.page.locator('//a[normalize-space()="Assign Claim"]'); 

   }

   async clickSubmitClaim() {
      await this.click(this.submitClaimButton, "Submit Claim button");
   }

   async clickAssignClaim() {
    await this.click(this.assignClaimButton, "Assign Claim button");
 }

   async selectEventDropdown() {
    Logger.info("Selecting Event Type dropdown");
    await this.click(this.eventTypeDropdown, "Event Type dropdown");
    await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
    await this.page.waitForTimeout(1000);
    await this.page.locator(".oxd-select-dropdown .oxd-select-option").nth(1).click();
    Logger.info("Event Type dropdown option selected");
 }
 
 async selectCurrencyDropdown() {
    Logger.info("Attempting to select a currency from the dropdown");
    await this.click(this.currencyTypeDropdown, "Currency Type dropdown");
    await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
    Logger.info("Currency dropdown options are visible");
    await this.page.waitForTimeout(1000);
    const options = await this.page.locator(".oxd-select-dropdown .oxd-select-option");
    await options.nth(1).click(); 
    Logger.info("Currency option selected");
 }
 
  async addRemarks(remarks: string) {
    Logger.info("Waiting for remarks field");
    await this.page.waitForTimeout(2000); 
    await this.remarksField.fill(remarks);
    Logger.info("Remarks filled");
 }
 

  async clickCreateButton() {
    await this.click(this.createButton, "Create button");
  }

  async verifyClaimSuccess() {
    await this.claimSuccessMessage.waitFor({ state: "visible", timeout: 5000 });
    const successMessageText = await this.claimSuccessMessage.innerText();
    Logger.info("Claim success message: " + successMessageText);
    return successMessageText;
 }
 
 


}