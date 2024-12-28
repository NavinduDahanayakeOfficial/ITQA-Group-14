import { Given, When, Then } from "@cucumber/cucumber";
import { RecruitmentModule } from "../pages/recruitmentmodule";
import { HomePage } from "../pages/home.page";
import { page } from "../pages/hooks";
import { Logger } from '../../../utils/logger';

let recruitmentModule: RecruitmentModule;
let homepage: HomePage;

Given('User navigates to the "Recruitment" module', async () => {
  homepage = new HomePage(page);
  await homepage.clickRecruitmentModule();
  recruitmentModule = new RecruitmentModule(page);
});

When("User select a option from the Job Title dropdown", async () => {
  await recruitmentModule.selectJobTitle();
});

When("User select a option from the Vacancy dropdown", async () => {
  await recruitmentModule.selectVacancy();
});

When("User select a option from the Hiring Manager dropdown", async () => {
  await recruitmentModule.selectHiringManager();
});

When("User select a option from the Status dropdown", async () => {
  await recruitmentModule.selectStatus();
});

When("User click on the Search button", async () => {
  await recruitmentModule.clickSearchButton();
});

Then(
  "User should see the list of candidates matching the selected criteria",
  async () => {
    const results = await recruitmentModule.getSearchResults();
    Logger.info('Results: ' + results);
  }
);
