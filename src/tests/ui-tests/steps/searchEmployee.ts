import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { PimModule } from '../pages/pimmodule';

let pimmodule: PimModule;

Given('User enters the employee name in the search field', async function () {
    pimmodule = new PimModule(page);
    await pimmodule.searchEmployee('Emily');
    console.log('Entered the employee name');
});

When('User clicks the "Search" button', async function () {
    await pimmodule.clickSearchBtn();
    console.log('Clicked on Search Button');
});

Then('User should see the search results displaying the correct employee', async function () {
    const results = await pimmodule.getSearchResults();
    console.log('results:', results);
});