import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PerfomanceModule } from '../pages/performanceModule';
import { Logger } from "../../../utils/logger";

let homepage: HomePage;
let performancemodule: PerfomanceModule;

Given('User navigates to the "Performance" module', async function () {
  homepage = new HomePage(page);
  await homepage.clickPerformanceModule();
});

When('User selects the “Configure” dropdown and chooses "KPI"', async function () { 
 performancemodule = new PerfomanceModule(page)
 await performancemodule.clickConfigureButton();
 await performancemodule.clickKPIButton();
})

When('User clicks on "Add"', async function () {
    await performancemodule.clickAddBtn();
})

When('User fills in the KPI details', async function () {
    await performancemodule.fillKPI("Communication Skills");
    await performancemodule.selectJobTitle();
})
When('User clicks the "Save" button', async function () {
    await performancemodule.clickSaveBtn();
    
})
Then("User should see the Key Performance Indicator section", async function () {
   const info = await performancemodule.verifyKPISection();
   Logger.info("KPI has been added successfully");
   expect(info).toEqual("Key Performance Indicators for Job Title");
});

