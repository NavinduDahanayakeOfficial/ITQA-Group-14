import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { Logger } from "../../../utils/logger";
import { BuzzModule } from "../pages/buzzMOdule";

let buzzModule: BuzzModule;

When('User clicks the edit button', async function () {
    buzzModule = new BuzzModule(page);
    await buzzModule.clickEditButton();
    Logger.info('Clicked the edit button');
});

When('User enters the new {string} on the text box', async function (text) {
    await buzzModule.enterEditPostText(text);
    Logger.info('Entered the text on the text box');
});

When('User clicks the post button on the edit post modal', async function () {
    await buzzModule.clickEditPostButton();
    Logger.info('Clicked the edit post confirm button');
});

Then('User should not see the edited post displayed in the Buzz Newsfeed', async function () {
    await buzzModule.verifyPostEdited();
    Logger.info('Post is edited in the Buzz Newsfeed');
});