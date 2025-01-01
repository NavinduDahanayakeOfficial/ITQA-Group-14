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
   readonly employeeNameField: Locator;
   readonly assignEventDropdown: Locator;
   readonly assignCurrencyDropdown: Locator;
   readonly assignRemarksField: Locator;
   readonly employeeClaimsButton: Locator;
   readonly eventNameDropdown: Locator;
   readonly statusDropdown: Locator;
   readonly searchButton: Locator;


   constructor(page: Page) {
    super(page);
    this.submitClaimButton = this.page.locator('//a[normalize-space()="Submit Claim"]');
    this.eventTypeDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div');
    this.currencyTypeDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div');
    this.createButton = this.page.locator('//button[normalize-space()="Create"]');
    this.remarksField = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div/div/div[2]/textarea');
    this.claimSuccessMessage = this.page.locator('//div[contains(@class, "success-message")]'); 
    this.assignClaimButton = this.page.locator('//a[normalize-space()="Assign Claim"]'); 
    this.employeeNameField = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/div[2]/div/div/input');
    this.assignEventDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/div/div');
    this.assignCurrencyDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/div/div');
    this.assignRemarksField = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div/div/div[2]/textarea');
    this.employeeClaimsButton = this.page.locator('//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[4]/a');
    this.eventNameDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div');
    this.statusDropdown = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div[2]/form/div[1]/div/div[4]/div/div[2]/div/div');
    this.searchButton = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div[2]/form/div[3]/button[2]');

   }

   async clickSubmitClaim() {
      await this.click(this.submitClaimButton, "Submit Claim button");
   }

   async clickAssignClaim() {
    await this.click(this.assignClaimButton, "Assign Claim button");
 }
 async clickEmployeeClaims() {
   await this.click(this.employeeClaimsButton, "Employee Claims button");
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
 

   async fillEmployeeName(name: string) {
       Logger.info("Filling employee name");
       await this.employeeNameField.fill(name);
   }

   async selectAssignEventDropdown() {
       Logger.info("Selecting Assign Event Type dropdown");
       await this.click(this.assignEventDropdown, "Assign Event Type dropdown");
       await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
       await this.page.waitForTimeout(1000);
       await this.page.locator(".oxd-select-dropdown .oxd-select-option").nth(1).click();
       Logger.info("Assign Event Type dropdown option selected");
   }

   async selectAssignCurrencyDropdown() {
       Logger.info("Selecting Assign Currency dropdown");
       await this.click(this.assignCurrencyDropdown, "Assign Currency Type dropdown");
       await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
       await this.page.waitForTimeout(1000);
       await this.page.locator(".oxd-select-dropdown .oxd-select-option").nth(1).click();
       Logger.info("Assign Currency option selected");
   }

   async addAssignRemarks(remarks: string) {
       Logger.info("Adding assign remarks");
       await this.assignRemarksField.fill(remarks);
   }

   async selectEventName(eventName: string) {
      Logger.info(`Attempting to select Event Name: ${eventName}`);
      await this.click(this.eventNameDropdown, "Event Name dropdown");
      await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
      await this.page.waitForTimeout(1000);
      
      // Get all available options
      const options = await this.page.locator(".oxd-select-dropdown .oxd-select-option").allTextContents();
      Logger.info("Available dropdown options: " + JSON.stringify(options));

      // Select the first non-empty option
      const validOptions = options.filter(option => option.trim() !== '');
      if (validOptions.length > 0) {
          const selectedOption = validOptions[1]; // Take the first valid option
          Logger.info(`Selecting option: "${selectedOption}"`);
          
          await this.page.locator(`.oxd-select-dropdown .oxd-select-option`).first().click();
          Logger.info(`Successfully selected: "${selectedOption}"`);
          
          return selectedOption; // Return the selected value for verification
      } else {
          Logger.error("No valid options found in dropdown");
          throw new Error("No valid options available in Event Name dropdown");
      }
   }

   async selectStatus(status: string) {
      Logger.info(`Attempting to select Status: ${status}`);
      await this.click(this.statusDropdown, "Status dropdown");
      await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
      await this.page.waitForTimeout(1000);
      
      // Get all available options
      const options = await this.page.locator(".oxd-select-dropdown .oxd-select-option").allTextContents();
      Logger.info("Available dropdown options: " + JSON.stringify(options));

      // Select the first non-empty option
      const validOptions = options.filter(option => option.trim() !== '');
      if (validOptions.length > 0) {
          const selectedOption = validOptions[1]; // Take the second valid option (usually first is a placeholder)
          Logger.info(`Selecting option: "${selectedOption}"`);
          
          await this.page.locator(`.oxd-select-dropdown .oxd-select-option`).nth(1).click();
          Logger.info(`Successfully selected: "${selectedOption}"`);
          
          return selectedOption; // Return the selected value for verification
      } else {
          Logger.error("No valid options found in Status dropdown");
          throw new Error("No valid options available in Status dropdown");
      }
   }

   async clickSearchButton() {
      Logger.info("Clicking Search button");
      await this.click(this.searchButton, "Search button");
   }

}
