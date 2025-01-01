import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PerfomanceModule } from '../pages/performanceModule';
import { Logger } from "../../../utils/logger";

let homepage: HomePage;
let performancemodule: PerfomanceModule;

Given('User select a KPI and check the checkbox of the KPI', async function () {
    performancemodule = new PerfomanceModule(page)
    await performancemodule.clickKPIFeatureBox();
})
When('User clicks on delete icon', async function () {
    await performancemodule.clickDeleteKPIBtn();
})
When('User confirms the delete action', async function () {
    await performancemodule.clickDeleteConfirmBtn();
})
When('User select "Yes, Delete" button', async function () {
    await performancemodule.clickDeleteConfirmBtn();
})
Then("User should see the KPI is deleted", async function () {
   const info = await performancemodule.verifyKPISection();
   Logger.info("KPI has been deleted successfully");
   expect(info).toEqual("Key Performance Indicators for Job Title");
});