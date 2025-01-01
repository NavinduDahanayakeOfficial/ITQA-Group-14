import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { PimModule } from '../pages/pimmodule';
import { Logger } from '../utils/logger';

let pimmodule: PimModule;

Given('User enters the employee name in the search field', async function () {
    pimmodule = new PimModule(page);
    const empName = await pimmodule.searchEmployee('Dilshan Perera');
    Logger.info('Entered the employee name');
    expect(empName).not.toBeNull();
});

When('User clicks the "Search" button', async function () {
    await pimmodule.clickSearchBtn();
});

Then('User should see the search results displaying the correct employee', async function () {
    const results = await pimmodule.getSearchResults();
    Logger.info('results: ' + results);
});