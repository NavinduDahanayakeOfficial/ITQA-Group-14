import { Given, Then, When } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { ClaimModule } from "../pages/claimModule";
import { Logger } from "../../../utils/logger";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

let claimModule: ClaimModule;
let homepage: HomePage;

Given('User navigates to the "Employee Claims" section', async function () {
    homepage = new HomePage(page);
    await homepage.clickClaimModule();
    await claimModule.clickEmployeeClaims();
    await page.waitForSelector('selector-for-employee-claims-page', { state: 'visible' });
});

When('User clicks on "Employee Claims"', async function () {
    claimModule = new ClaimModule(page);
    await claimModule.clickEmployeeClaims();
    await page.waitForSelector('//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/h5', { state: 'visible', timeout: 5000 });
});

Then('User should see the Employee Claims page', async function () {
    Logger.info('Verifying Employee Claims page is visible');
    const pageTitle = await page.title();
    expect(pageTitle).toContain('OrangeHRM');
    Logger.info('Employee Claims page is verified');
});

When('User selects {string} from Event Name dropdown', async function (eventName) {
    await claimModule.selectEventName(eventName);
});

When('User selects {string} from Status dropdown', async function (status) {
    await claimModule.selectStatus(status);
});

When('User clicks the Search button', async function () {
    await claimModule.clickSearchButton();
});

When('User searches all combinations from Event Name and Status dropdowns', async function () {
    await claimModule.searchAllCombinations();
});

Then('User should be able to see the filtered results', async function () {
    const selectedEventName = await claimModule.getSelectedEventName();
    const selectedStatus = await claimModule.getSelectedStatus();
    const resultsMatch = await claimModule.verifySearchResults(selectedEventName, selectedStatus);

    if (!resultsMatch) {
        throw new Error('Search results do not match the selected criteria');
    }

    Logger.info('Search results verified successfully');
}); 