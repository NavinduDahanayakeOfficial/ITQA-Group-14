import { Locator, Page} from 'playwright';

export class HomePage {

    readonly page: Page;
    readonly pimModule: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
    }

    async clickPimModule() {
        await this.pimModule.click();
    }
}