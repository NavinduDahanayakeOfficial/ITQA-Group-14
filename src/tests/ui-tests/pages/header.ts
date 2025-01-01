import { Locator, Page } from "@playwright/test";

export class Header{
    readonly pageTitle: Locator;
    
    constructor(page: Page){
        this.pageTitle =  page.locator("h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
    }

    async getPageTitle(){
        return await this.pageTitle.innerText();
    }
}