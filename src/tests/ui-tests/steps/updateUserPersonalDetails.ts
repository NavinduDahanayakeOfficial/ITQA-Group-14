import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { MyInfoModule } from "../pages/myInfoModule";
import { PersonalInfoSection } from "../pages/myInfoModule";
import { Logger } from "../../../utils/logger";

let myInfoModule: MyInfoModule;
let personalInfoSection: PersonalInfoSection;

let data: any;

When(
   "User enter the new personal details",
   async function (dataTable: { hashes: () => any }) {
      personalInfoSection = new PersonalInfoSection(page);
      data = dataTable.hashes()[0];
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

Then("User should see the updated personal details", async function () {
   await page.reload();
   await page.waitForTimeout(2000);

   const updatedDetails = await personalInfoSection.getPersonalInfo();
   console.log(updatedDetails);
   console.log(data);

   expect(updatedDetails.firstName).toBe(data.firstName);
   expect(updatedDetails.lastName).toBe(data.lastName);
   expect(updatedDetails.middleName).toBe(data.middleName);
   expect(updatedDetails.otherId).toBe(data.otherId);
   expect(updatedDetails.licenseNumber).toBe(data.licenseNumber);
   expect(updatedDetails.licenseExpiry).toBe(data.licenseExpiry);
   expect(updatedDetails.maritalStatus).toBe(data.maritalStatus);
   expect(updatedDetails.dateOfBirth).toBe(data.dateOfBirth);
   expect(updatedDetails.gender).toBe(data.gender);
});

Then(
   "Required fields should be highlighted with an error message",
   async function () {
      const isMissingRequiredFieldsAreHighlighted =
         await personalInfoSection.checkMissingRequiredFieldsAreHighlighted();
      Logger.info(
         "Is missing required fields are highlighted: " +
            isMissingRequiredFieldsAreHighlighted
      );
      expect(isMissingRequiredFieldsAreHighlighted).toBe(true);
      const isErrorMessageAreVisible =
         await personalInfoSection.checkRequiredMessagesAreVisible();
      Logger.info("Is error messages are visible: " + isErrorMessageAreVisible);
      expect(isErrorMessageAreVisible).toBe(true);
   }
);
