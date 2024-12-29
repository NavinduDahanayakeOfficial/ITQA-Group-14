import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';
import { Logger } from "../../../utils/logger";

export class PerfomanceModule extends BasePage {

    readonly configureBtn: Locator;
    readonly kpi: Locator;
    readonly addBtn: Locator;
    readonly addKPI: Locator;
    readonly jobTitleDropdown: Locator;
    readonly saveBtn: Locator;
    readonly kpiSection: Locator;

    constructor(page: Page) {
        super(page);
        
        this.configureBtn = this.page.locator('//span[normalize-space()="Configure"]');
        this.kpi = this.page.locator('//a[normalize-space()="KPIs"]');
        this.addBtn = this.page.locator('//button[normalize-space()="Add"]');
        this.addKPI = this.page.locator('//label[text()="Key Performance Indicator"]/following::input[1]');
        this.jobTitleDropdown = this.page.locator('//div[@class="oxd-select-text-input"]');
        this.saveBtn = this.page.locator('//button[@type="submit"]');
        this.kpiSection = this.page.locator('//h5[@class="oxd-text oxd-text--h5 oxd-table-filter-title"]');

    }

    async clickConfigureButton() {
        await this.click(this.configureBtn, 'Configure Button');
    }
    async clickKPIButton() {
        await this.click(this.kpi, 'KPI option');
    }

    async clickAddBtn() {
        await this.click(this.addBtn, 'Add Button');
    }
    async fillKPI(kpi: string) {
        await this.page.waitForTimeout(1000);
        await this.addKPI.fill(kpi);
        
}
async selectJobTitle() {
    await this.click(this.jobTitleDropdown, "Job Title");
    await this.page.waitForSelector('.oxd-select-dropdown .oxd-select-option', { state: 'visible' }); 
    await this.page.waitForTimeout(1000); 
    await this.page.locator('.oxd-select-dropdown .oxd-select-option').nth(1).click(); 
 }

    async clickSaveBtn() {
        await this.click(this.saveBtn, 'Save Button');
    }

    async verifyKPISection() {
        await this.page.waitForTimeout(2000);
      return await this.kpiSection.innerText();
    }

}
