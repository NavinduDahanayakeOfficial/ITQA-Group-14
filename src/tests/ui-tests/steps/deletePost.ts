import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { Logger } from "../../../utils/logger";
import { BuzzModule } from "../pages/buzzMOdule";

let buzzModule: BuzzModule;

When("User clicks the select options button", async function () {
    buzzModule = new BuzzModule(page);
    await buzzModule.clickSelectOptionsButton();
    Logger.info('Clicked the select options button');
});

When('User clicks the delete button', async function () {
    await buzzModule.clickDeleteButton();
    Logger.info('Clicked the delete button');
});

When('User clicks the confirm button', async function () {
    await buzzModule.clickConfirmButton();
    Logger.info('Clicked the confirm button');
});

Then('User should not see the post displayed in the Buzz Newsfeed', async function (text) {
    await buzzModule.verifyPostDeleted();
    Logger.info('Post is deleted from the Buzz Newsfeed');
});
