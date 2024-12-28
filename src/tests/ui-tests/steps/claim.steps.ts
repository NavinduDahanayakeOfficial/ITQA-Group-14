import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { ClaimModule } from '../pages/claim.page';
import { expect } from '@playwright/test';
import { Logger } from '../utils/logger';

let claimModule: ClaimModule;

Given('User clicks the "Assign Claim" button', async function () {
    claimModule = new ClaimModule(page);
    await claimModule.clickAssignClaim();
    Logger.info('Clicked the Assign Claim button');
});

When(
    'User fills in the claim details with name {string}, description {string}, and amount {string}',
    async function (name: string, description: string, amount: string) {
        await claimModule.fillClaimDetails(name, description, amount);
        Logger.info(`Filled claim details: Name: ${name}, Description: ${description}, Amount: ${amount}`);
    }
);

When('User clicks the "Save" button', async function () {
    await claimModule.clickSaveBtn();
});

Then('User should see the assigned claim in the list', async function () {
    const results = await claimModule.getSearchResults();
    Logger.info('Search results: ' + results);
    expect(results).toContain('Travel Reimbursement');
});

Given('User enters the claim name {string} in the search field', async function (claimName: string) {
    await claimModule.searchClaim(claimName);
    Logger.info(`Entered claim name: ${claimName}`);
});

When('User clicks the "Search" button', async function () {
    await claimModule.clickSearchBtn();
});

Then('User should see the search results displaying the correct claim', async function () {
    const results = await claimModule.getSearchResults();
    Logger.info('Search results: ' + results);
    expect(results).toContain('Travel Reimbursement');
});

When('User deletes the claim', async function () {
    await claimModule.deleteClaim();
    Logger.info('Claim deleted');
});

Then('User should see a message {string}', async function (message: string) {
    const noRecordsMessage = await claimModule.isClaimDeleted();
    Logger.info('Deletion result: ' + noRecordsMessage);
    expect(noRecordsMessage).toContain(message);
});
