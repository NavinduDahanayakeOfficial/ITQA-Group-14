import { Locator, Page } from 'playwright';
import { BasePage } from './base.page';
import { Logger } from '../utils/logger';

export class ClaimModule extends BasePage {
    readonly assignClaim: Locator;
    readonly claimNameField: Locator;
    readonly claimDescriptionField: Locator;
    readonly claimAmountField: Locator;
    readonly saveBtn: Locator;
    readonly searchField: Locator;
    readonly searchBtn: Locator;
    readonly resultClaimName: Locator;
    readonly deleteBtn: Locator;
    readonly confirmDeleteBtn: Locator;
    readonly noRecordsFound: Locator;

    constructor(page: Page) {
        super(page);
        this.assignClaim = this.page.locator('//a[normalize-space()="Assign Claim"]');
        this.claimNameField = this.page.locator('//input[@placeholder="Claim Name"]');
        this.claimDescriptionField = this.page.locator('//textarea[@placeholder="Description"]');
        this.claimAmountField = this.page.locator('//input[@placeholder="Amount"]');
        this.saveBtn = this.page.locator('//button[normalize-space()="Save"]');
        this.searchField = this.page.locator('//input[@placeholder="Search Claims"]');
        this.searchBtn = this.page.locator('//button[normalize-space()="Search"]');
        this.resultClaimName = this.page.locator('//div[@role="table"]/div[2]/div[1]');
        this.deleteBtn = this.page.locator('//button[normalize-space()="Delete"]');
        this.confirmDeleteBtn = this.page.locator('//button[normalize-space()="Yes, Delete"]');
        this.noRecordsFound = this.page.locator('//span[normalize-space()="No Records Found"]');
    }

    async clickAssignClaim() {
        await this.click(this.assignClaim, 'Assign Claim button');
    }

    async fillClaimDetails(claimName: string, description: string, amount: string) {
        await this.claimNameField.fill(claimName);
        await this.claimDescriptionField.fill(description);
        await this.claimAmountField.fill(amount);
    }

    async clickSaveBtn() {
        await this.click(this.saveBtn, 'Save button');
    }

    async searchClaim(claimName: string) {
        await this.fill(this.searchField, claimName, 'Search Claims');
    }

    async clickSearchBtn() {
        await this.click(this.searchBtn, 'Search button');
    }

    async getSearchResults() {
        return await this.resultClaimName.innerText();
    }

    async deleteClaim() {
        await this.click(this.deleteBtn, 'Delete button');
        await this.click(this.confirmDeleteBtn, 'Confirm Delete button');
    }

    async isClaimDeleted() {
        return await this.noRecordsFound.innerText();
    }
}
