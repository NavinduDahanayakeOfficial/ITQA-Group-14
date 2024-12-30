import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    readonly pimModule: Locator;
    readonly recruitModule: Locator;

    constructor(page: Page) {
        super(page);
        this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
        this.recruitModule= this.page.locator('//a[normalize-space()="Recruitment"]');
    }

    async clickPimModule() {
        await this.click(this.pimModule, 'PIM Module');
    }

    async clickRecruitmentModule() {
        await this.click(this.recruitModule, 'Recruitment Module');
    }
}