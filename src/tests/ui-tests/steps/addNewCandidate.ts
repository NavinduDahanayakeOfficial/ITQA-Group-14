import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { RecruitmentModule } from "../pages/recruitmentmodule";
import { Logger } from "../../../utils/logger";

let recruitmentModule: RecruitmentModule;
let data: any;

When("User clicks on add button", async function () {
  recruitmentModule = new RecruitmentModule(page);
  await recruitmentModule.clickAddCandidate();
});

When(
  "User fills in the candidate details",
  async function (dataTable: { hashes: () => any }) {
    data = dataTable.hashes()[0];
    const { firstName, middleName, lastName, email } = data;
    Logger.info("Filling in the candidate details");
    Logger.info(JSON.stringify(data));
    await recruitmentModule.fillCandidateDetails(firstName, middleName, lastName, email);
    Logger.info("Filled in the employee details");
  }
);

When("User clicks Save button to save candidate", async function () {
  await recruitmentModule.clickSaveButton();
});

Then("User should see the candidate profile", async function () {
  const candidateName = await recruitmentModule.getCandidateName();
  Logger.info("Candidate profile is displayed: " + candidateName);
});