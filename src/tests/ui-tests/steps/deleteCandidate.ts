import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { RecruitmentModule } from '../pages/recruitmentmodule';
import { Logger } from '../../../utils/logger';

let recruitmentModule: RecruitmentModule;

  When('User clicks the Delete button and confirms the deletion', async function () {
    recruitmentModule = new RecruitmentModule(page);
    await recruitmentModule.deleteCandidate();
});

Then('User should see a Delete successful message', async function () {
    const message = await recruitmentModule.getSuccessMessage();
    Logger.info("Success Message: " + message);
});