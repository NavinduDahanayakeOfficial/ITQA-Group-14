import { When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { RecruitmentModule } from '../pages/recruitmentmodule';
import { Logger } from '../../../utils/logger';

let recruitmentModule: RecruitmentModule;

  When('User clicks the delete icon button', async function () {
    recruitmentModule = new RecruitmentModule(page);
    await recruitmentModule.deleteCandidate();
});

When('User confirms the deletion', async function () {
  recruitmentModule = new RecruitmentModule(page);
  await recruitmentModule.confirmDelete();
});

Then('User should see "Succesfully Deleted" message', async function () {
    const message = await recruitmentModule.getSuccessMessage();
    await page.waitForTimeout(5000);
    Logger.info("Success Message: " + message);
});