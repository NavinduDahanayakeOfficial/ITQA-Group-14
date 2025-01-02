import { When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { RecruitmentModule } from '../pages/recruitmentmodule';
import { Logger } from '../../../utils/logger';

let recruitmentModule: RecruitmentModule;

  When('User clicks the delete button', async function () {
    recruitmentModule = new RecruitmentModule(page);
    await recruitmentModule.deleteCandidate();
});

When('User confirms the deletion', async function () {
  recruitmentModule = new RecruitmentModule(page);
  await recruitmentModule.confirmDelete();
});

Then('User should see a delete successful message', async function () {
    const message = await recruitmentModule.getSuccessMessage();
    Logger.info("Success Message: " + message);
});