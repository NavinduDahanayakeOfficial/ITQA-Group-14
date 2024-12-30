import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    readonly pimModule: Locator;
    readonly myInfoModule: Locator;

    constructor(page: Page) {
        super(page);
        this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
        this.myInfoModule = this.page.locator('//a[normalize-space()="My Info"]');
    }

    async clickPimModule() {
        await this.click(this.pimModule, 'PIM Module');
    }
}