import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    readonly pimModule: Locator;
    readonly claimModule: Locator;
    readonly myInfoModule: Locator;
    readonly recruitModule: Locator;

    constructor(page: Page) {
        super(page);
        this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
        this.claimModule = this.page.locator('//a[normalize-space()="Claim"]');
        this.myInfoModule = this.page.locator('//a[normalize-space()="My Info"]');
        this.recruitModule= this.page.locator('//a[normalize-space()="Recruitment"]');
    }

    async clickPimModule() {
        await this.click(this.pimModule, 'PIM Module');
    }
    async clickClaimModule() {
        await this.click(this.claimModule, 'Claim Module');
    }

    async clickRecruitmentModule() {
        await this.click(this.recruitModule, 'Recruitment Module');
    }
}
