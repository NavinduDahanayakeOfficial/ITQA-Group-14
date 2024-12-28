import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    readonly pimModule: Locator;
    readonly claimModule: Locator;

    constructor(page: Page) {
        super(page);
        this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
        this.claimModule = this.page.locator('//a[normalize-space()="Claim"]');
    }

    async clickPimModule() {
        await this.click(this.pimModule, 'PIM Module');
    }
    async clickClaimModule() {
        await this.click(this.claimModule, 'Claim Module');
    }
}
