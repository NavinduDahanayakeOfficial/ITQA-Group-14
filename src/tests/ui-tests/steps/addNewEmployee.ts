import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { PimModule } from '../pages/pimmodule';

let homepage: HomePage;
let pimmodule: PimModule;

Given('User navigates to the "PIM" module', async function () {
  homepage = new HomePage(page);
  await homepage.clickPimModule();
  console.log('Clicked on PIM Module');
});

When('User clicks on "Add Employee"', async function () {
  pimmodule = new PimModule(page);
  await pimmodule.clickAddEmployee();
  console.log('Clicked on Add Employee');
});

When('User fills in the employee details', async function () {
  await pimmodule.fillEmployeeDetails('Dilshan', 'Ekanayaka');
  console.log('Filled in the employee details');
});

When('User clicks Save button', async function () {
  await pimmodule.clickSaveBtn();
  console.log('Clicked on Save Button');
});

When('User should see the employee profile', async function () {
  const employeeName = await pimmodule.getEmployeeName();
  expect(employeeName).not.toBeNull();
  console.log('Employee profile is displayed');
});

Then('User get the success toast message', async function () {
    await pimmodule.getSuccessToastMsg();
    console.log('Success toast message is displayed');
});