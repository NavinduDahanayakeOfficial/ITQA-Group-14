import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    readonly pimModule: Locator;
    readonly performanceModule: Locator;

    constructor(page: Page) {
        super(page);
        this.pimModule = this.page.locator('//a[normalize-space()="PIM"]');
        this.performanceModule = this.page.locator('//a[normalize-space()="Performance"]');
    
    }

    async clickPimModule() {
        await this.click(this.pimModule, 'PIM Module');
    }
    
    async clickPerformanceModule() {
        await this.click(this.performanceModule, 'Performance Module');
    }
}