import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RecruitmentModule } from '../pages/recruitmentmodule';
import { Logger } from '../utils/logger';

let homepage: HomePage;
let recruitmentModule: RecruitmentModule;

// Given('User navigates to the "PIM" module', async function () {
//   homepage = new HomePage(page);
//   await homepage.clickPimModule();
// });

When('User clicks on "Add" button', async function () {
    recruitmentModule = new RecruitmentModule(page);
  await recruitmentModule.clickAddCandidate();
});

When('User fills in the candidate details', async function () {
  await recruitmentModule.fillCandidateDetails('Kasun','Kalhara','Perera','kasun@email.com');
   Logger.info('Filled in the employee details');
});

When('User clicks Save button to save candidate', async function () {
  await recruitmentModule.clickSaveButton();
});

When('User should see the candidate profile', async function () {
  await recruitmentModule.getCandidateName();
  Logger.info('Candidate profile is displayed');
});