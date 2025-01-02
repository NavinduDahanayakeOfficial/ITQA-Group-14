import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { Logger } from "../../../utils/logger";
import { HomePage } from "../pages/home.page";
import { BuzzModule } from "../pages/buzzModule";

let buzzModule: BuzzModule;
let homepage: HomePage;

Given('User navigates to the "Buzz" module', async function () {
   homepage = new HomePage(page);
   await homepage.clickBuzzModule();
   Logger.info("Navigated to Buzz Module");
});

Given("User enters the post {string} in the text field", async function (text) {
   buzzModule = new BuzzModule(page);
   await buzzModule.enterPostText(text);
   Logger.info("Entered the post text");
});

When("User clicks the post button", async function () {
   await buzzModule.clickPostButton();
   Logger.info("Clicked the post button");
});

Then(
   "User should see the post {string} displayed in the Buzz Newsfeed",
   async function (text) {
      await buzzModule.verifyPostText(text);
      Logger.info("Post is displayed in the Buzz Newsfeed");
   }
);
