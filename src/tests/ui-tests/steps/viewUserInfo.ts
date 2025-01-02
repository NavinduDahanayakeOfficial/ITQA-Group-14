import {
   ContactDetailsSection,
   DependentsSection,
   EmergencyContactsSection,
   MyInfoSideMenu,
   PersonalInfoSection,
} from "../pages/myInfoModule";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { page } from "../pages/hooks";
import { HomePage } from "../pages/home.page";
import { Logger } from "../../../utils/logger";
import { MyInfoModule } from "../pages/myInfoModule";
import { Header } from "../pages/header";

let homePage: HomePage;
let header: Header;
let myInfoModule: MyInfoModule;

let myInfoSideMenu: MyInfoSideMenu;
let personalInfoSection: PersonalInfoSection;
let contactDetailsSection: ContactDetailsSection;
let emergencyContactsSection: EmergencyContactsSection;
let dependentsSection: DependentsSection;

Given(
   'User navigates to the "My Info" module',
   async function () {
      Logger.info(`Navigated to the My Info module`);
      homePage = new HomePage(page);
      await homePage.clickMyInfoModule();
   }
);

Given('User on the "My Info" page', async function () {
   myInfoModule = new MyInfoModule(page);
   header = new Header(page);

   const pageTitle = await header.getPageTitle();
   expect(pageTitle).toBe("PIM"); //The page title should be MyInfo, however, the title is PIM
   Logger.info("Page title is: " + pageTitle);
});

Then("User should see the name and profile picture", async function () {
   const userName = await myInfoModule.getUserName();
   expect(userName).not.toBe(null);
   expect(userName?.trim()).not.toBe("");

   const isProfileVisible = await myInfoModule.isProfilePictureVisible();
   expect(isProfileVisible).toBe(true);
});

Then(
   'User should be in the "Personal Details" section by default',
   async function () {
      personalInfoSection = new PersonalInfoSection(page);
      const sectionHeader = await personalInfoSection.getSectionHeader();
      Logger.info("Section header is: " + sectionHeader);
      const currentUrl = page.url();
      Logger.info("Current URL: " + currentUrl);

      expect(sectionHeader).toBe("Personal Details");
      expect(currentUrl).toContain("viewPersonalDetails");
   }
);

When("User clicks on the {string} section", async function (section: string) {
   myInfoSideMenu = new MyInfoSideMenu(page);
   await myInfoSideMenu.goToSection(section);
});

Then("User should see the {string} section", async function (section: string) {
   let sectionHeader;
   let currentUrl = page.url();
   Logger.info("Current URL: " + currentUrl);
   switch (section) {
      case "Personal Details":
         expect(currentUrl).toContain("viewPersonalDetails");
         break;
      case "Contact Details":
         expect(currentUrl).toContain("contactDetails");
         break;
      case "Emergency Contacts":
         expect(currentUrl).toContain("viewEmergencyContacts");
         break;
      case "Dependents":
         expect(currentUrl).toContain("viewDependents");
         break;
      case "Immigration":
         expect(currentUrl).toContain("viewImmigration");
         break;
      case "Job":
         expect(currentUrl).toContain("viewJob");
         break;
      case "Salary":
         expect(currentUrl).toContain("viewSalary");
         break;
      case "Report-to":
         expect(currentUrl).toContain("viewReportToDetails");
         break;
      case "Qualifications":
         expect(currentUrl).toContain("viewQualifications");
         break;
      case "Memberships":
         expect(currentUrl).toContain("viewMemberships");
         break;
      default:
         throw new Error(`Section ${section} not found in the switch case`);
   }
});

Then("User should be able to view personal details", async function () {
   console.log("User should be able to view personal details");
   const personalInfo = await personalInfoSection.getPersonalInfo();
   Logger.info("Personal Info: " + JSON.stringify(personalInfo));
   expect(personalInfo).not.toBe(null);
});
