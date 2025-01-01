import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { MyInfoModule } from "../pages/myInfoModule";
import { PersonalInfoSection } from "../pages/myInfoModule";
import { Logger } from "../../../utils/logger";

let myInfoModule: MyInfoModule;
let personalInfoSection: PersonalInfoSection;

When(
   "User enter the new personal details",
   async function (dataTable: { hashes: () => any }) {
      personalInfoSection = new PersonalInfoSection(page);
      const data = dataTable.hashes()[0];
      Logger.info("Filling in the personal details");
      Logger.info(JSON.stringify(data));
      await personalInfoSection.fillPersonalInfo(data);
   }
);

When("User clicks on the Save button", async function () {
   await personalInfoSection.savePersonalInfo();
});

Then(
   "User should see the success message {string}",
   async function (expectedMessage: string) {
      const message = await personalInfoSection.getSuccessMessage();
      expect(message).toBe(expectedMessage);
   }
);
