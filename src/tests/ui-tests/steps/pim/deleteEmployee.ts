import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { PimModule } from '../pages/pimmodule';

let pimmodule: PimModule;


Given('User selects the employee from the search results', async function () {
    pimmodule = new PimModule(page);
    await pimmodule.selectEmployee();
});

When('User clicks the "Delete" button and confirms the deletion', async function () {
    await pimmodule.deleteEmployee();
});

Then('User should no longer see the employee profile in the search results', async function () {
    const isDeleted = await pimmodule.isEmployeeDeleted();
    expect(isDeleted).toEqual('No Records Found');
});