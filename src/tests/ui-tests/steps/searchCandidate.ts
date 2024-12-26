import { Given, When, Then } from '@cucumber/cucumber';
import { RecruitmentModule } from '../pages/recruitmentmodule';
import { HomePage } from '../pages/home.page';
import { page } from '../pages/hooks';

let recruitmentModule: RecruitmentModule;
let homepage: HomePage;

Given('User navigates to the "Recruitment" module', async () => {
  homepage = new HomePage(page);
  await homepage.clickRecruitmentModule();

  // Initialize RecruitmentModule after navigating to the page
  recruitmentModule = new RecruitmentModule(page);
});

When(
  'User select {string} from the {string} dropdown',
  async (option: string, label: string) => {
    await recruitmentModule.selectDropdownOption(label, option);
  }
);

When('User click on the Search button', async () => {
  await recruitmentModule.clickSearchButton();
});

Then(
  'User should see the list of candidates matching the selected criteria',
  async () => {
    await recruitmentModule.verifySearchResults();
  }
);