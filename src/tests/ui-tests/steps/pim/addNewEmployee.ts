import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../pages/hooks";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { PimModule } from "../pages/pimmodule";
import { Logger } from "../../../utils/logger";

let homepage: HomePage;
let pimmodule: PimModule;

Given('User navigates to the "PIM" module', async function () {
   homepage = new HomePage(page);
   await homepage.clickPimModule();
});

When('User clicks on "Add Employee"', async function () {
   pimmodule = new PimModule(page);
   await pimmodule.clickAddEmployee();
});

When("User fills in the employee details", async function () {
   await pimmodule.fillEmployeeDetails("Dilshan", "Perera");
   Logger.info("Filled in the employee details");
});

When("User clicks Save button", async function () {
   await pimmodule.clickSaveBtn();
});

When("User should see the employee profile", async function () {
   await pimmodule.getEmployeeName();
   Logger.info("Employee profile is displayed");
});

Then("Verifies the employee profile is correct", async function () {
   const info = await pimmodule.verifyUserAdded();
   Logger.info("User has been added successfully");
   expect(info).toEqual("Personal Details");
});
