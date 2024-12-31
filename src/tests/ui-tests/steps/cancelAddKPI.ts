import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../pages/hooks';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PerfomanceModule } from '../pages/performanceModule';
import { Logger } from "../../../utils/logger";

let homepage: HomePage;
let performancemodule: PerfomanceModule;

Given('User clicks the "Cancel" button', async function () {
        performancemodule = new PerfomanceModule(page)

    await performancemodule.clickCancelBtn();
})


Then("After User should see the Key Performance Indicator section", async function () {
   const info = await performancemodule.verifyKPISection();
   Logger.info("KPI Added has been cancel successfully");
   expect(info).toEqual("Key Performance Indicators for Job Title");
});

