import {
   ContactDetailsSection,
   DependentsSection,
   EmergencyContactsSection,
   MyInfoSideMenu,
   PersonalInfoSection,
} from "./../pages/myInfoModule";
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

Given("User navigates to the {string} module", async function (module: string) {
   Logger.info(`Navigated to the ${module} module`);
   homePage = new HomePage(page);
   await homePage.clickMyInfoModule();
});

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

      expect(sectionHeader).toBe("Personal Details");
   }
);

When("User clicks on the {string} section", async function (section: string) {
   myInfoSideMenu = new MyInfoSideMenu(page);
   await myInfoSideMenu.goToSection(section);
});

Then("User should see the {string} section", async function (section: string) {
   let sectionHeader;
   switch (section) {
      case "Personal Details":
         personalInfoSection = new PersonalInfoSection(page);
         sectionHeader = await personalInfoSection.getSectionHeader();
         expect(sectionHeader).toBe("Personal Details");
         break;
      case "Contact Details":
         contactDetailsSection = new ContactDetailsSection(page);
         sectionHeader = await contactDetailsSection.getSectionHeader();
         expect(sectionHeader).toBe("Contact Details");
         break;
      case "Emergency Contacts":
         emergencyContactsSection = new EmergencyContactsSection(page);
         sectionHeader = await emergencyContactsSection.getSectionHeader();
         console.log("sectionHeader", sectionHeader);
         expect(sectionHeader).toBe("Assigned Emergency Contacts");
         break;
      case "Dependents":
         dependentsSection = new DependentsSection(page);
         sectionHeader = await dependentsSection.getSectionHeader();
         expect(sectionHeader).toBe("Assigned Dependents");
         break;
      default:
         throw new Error(`Section ${section} not found`);
   }
});
