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
   readonly searchResultsTable: Locator;
   readonly searchResultRows: Locator;
   readonly noRecordsMessage: Locator;

   private selectedEventName: string | null = null;
   private selectedStatus: string | null = null;

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
    this.searchResultsTable = this.page.locator('//div[contains(@class, "orangehrm-container")]');
    this.searchResultRows = this.page.locator('//div[contains(@class, "oxd-table-card")]');
    this.noRecordsMessage = this.page.locator('//span[contains(text(), "No Records Found")]');

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

       // Find the index of the desired event name
       const options = await this.page.locator(".oxd-select-dropdown .oxd-select-option").allTextContents();
       const index = options.findIndex(option => option.trim() === eventName);

       if (index !== -1) {
           Logger.info(`Selecting option: "${eventName}" at index ${index}`);
           await this.page.locator(".oxd-select-dropdown .oxd-select-option").nth(index).click();
           Logger.info(`Successfully selected: "${eventName}"`);
           this.selectedEventName = eventName;
       } else {
           Logger.error(`Event Name: "${eventName}" not found in dropdown options`);
           throw new Error(`Event Name: "${eventName}" not found in dropdown options`);
       }
   }

   async selectStatus(status: string) {
       Logger.info(`Attempting to select Status: ${status}`);
       await this.click(this.statusDropdown, "Status dropdown");
       await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });

       // Find the index of the desired status
       const options = await this.page.locator(".oxd-select-dropdown .oxd-select-option").allTextContents();
       const index = options.findIndex(option => option.trim() === status);

       if (index !== -1) {
           Logger.info(`Selecting option: "${status}" at index ${index}`);
           await this.page.locator(".oxd-select-dropdown .oxd-select-option").nth(index).click();
           Logger.info(`Successfully selected: "${status}"`);
           this.selectedStatus = status;
       } else {
           Logger.error(`Status: "${status}" not found in dropdown options`);
           throw new Error(`Status: "${status}" not found in dropdown options`);
       }
   }

   async clickSearchButton() {
      Logger.info("Clicking Search button");
      await this.click(this.searchButton, "Search button");
   }

   async verifySearchResults(expectedEventName: string, expectedStatus: string) {
       Logger.info(`Verifying search results for Event: ${expectedEventName}, Status: ${expectedStatus}`);
       
       // Wait for either results or no records message
       await this.page.waitForTimeout(2000);
       
       // Check if we have any results
       const noRecordsExists = await this.noRecordsMessage.isVisible();
       if (noRecordsExists) {
           Logger.info("No records found for the search criteria");
           return false;
       }

       // Wait for results table
       await this.searchResultsTable.waitFor({ state: 'visible', timeout: 5000 });
       
       // Get all rows using the base XPath
       const baseXPath = '//*[@id="app"]/div[1]/div[2]/div[2]/div[2]/div[3]/div/div[2]/div';
       const rows = await this.page.locator(`${baseXPath}`).all();
       Logger.info(`Found ${rows.length} results`);

       let matchingResults = 0;
       
       // Check each row
       for (let i = 1; i <= rows.length; i++) {
           // Dynamic XPaths for event name and status based on row number
           const eventNameXPath = `${baseXPath}[${i}]/div/div[3]`;
           const statusXPath = `${baseXPath}[${i}]/div/div[7]`;
           
           const eventNameCell = await this.page.locator(eventNameXPath).textContent();
           const statusCell = await this.page.locator(statusXPath).textContent();
           
           Logger.info(`Row ${i} data - Event: ${eventNameCell}, Status: ${statusCell}`);
           
           // Check if values match (trim to remove whitespace)
           if (eventNameCell?.trim() === expectedEventName && 
               statusCell?.trim() === expectedStatus) {
               matchingResults++;
               Logger.info(`Match found in row ${i}`);
           }
       }

       Logger.info(`Found ${matchingResults} matching results out of ${rows.length} total results`);
       
       if (matchingResults === 0) {
           Logger.error(`No matches found for Event: ${expectedEventName}, Status: ${expectedStatus}`);
           return false;
       }
       
       return true;
   }

   async getSelectedEventName(): Promise<string> {
       return this.selectedEventName || '';
   }

   async getSelectedStatus(): Promise<string> {
       return this.selectedStatus || '';
   }

   async getEventNameOptions(): Promise<string[]> {
       await this.click(this.eventNameDropdown, "Event Name dropdown");
       await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
       await this.page.waitForTimeout(1000); // Additional wait to ensure content is loaded

       const options = await this.page.locator(".oxd-select-dropdown .oxd-select-option").allTextContents();
       Logger.info(`Event Name options retrieved: ${JSON.stringify(options)}`);

       // Filter out empty options and the "-- Select --" placeholder
       return options.filter(option => option.trim() !== '' && option.trim() !== '-- Select --');
   }

   async getStatusOptions(): Promise<string[]> {
       await this.click(this.statusDropdown, "Status dropdown");
       await this.page.waitForSelector(".oxd-select-dropdown .oxd-select-option", { state: "visible", timeout: 5000 });
       await this.page.waitForTimeout(1000); // Additional wait to ensure content is loaded

       const options = await this.page.locator(".oxd-select-dropdown .oxd-select-option").allTextContents();
       Logger.info(`Status options retrieved: ${JSON.stringify(options)}`);

       // Filter out empty options and the "-- Select --" placeholder
       return options.filter(option => option.trim() !== '' && option.trim() !== '-- Select --');
   }

   async searchAllCombinations() {
       const eventNames = await this.getEventNameOptions();
       const statuses = await this.getStatusOptions();
       Logger.info(`Event Name options: ${eventNames.join(', ')}`);
       Logger.info(`Status options: ${statuses.join(', ')}`);

       for (const eventName of eventNames) {
           for (const status of statuses) {
               Logger.info(`Searching for combination: Event Name - ${eventName}, Status - ${status}`);
               await this.selectEventName(eventName);
               await this.selectStatus(status);
               await this.clickSearchButton();

               // Check for "No Records Found" message
               const noRecordsVisible = await this.noRecordsMessage.isVisible();
               if (noRecordsVisible) {
                   Logger.info(`No records found for Event Name: ${eventName}, Status: ${status}`);
                   continue; // Skip further processing for this combination
               }

               const resultsMatch = await this.verifySearchResults(eventName, status);
               if (!resultsMatch) {
                   Logger.error(`Search results do not match for Event Name: ${eventName}, Status: ${status}`);
               } else {
                   Logger.info(`Search results verified successfully for Event Name: ${eventName}, Status: ${status}`);
               }
           }
       }
   }

}
