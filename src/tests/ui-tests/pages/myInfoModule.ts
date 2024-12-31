import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";
import { Logger } from "../../../utils/logger";

export class MyInfoModule extends BasePage {
   private readonly username: Locator;
   private readonly profilePicture: Locator;
   private readonly sideMenu: MyInfoSideMenu;

   constructor(page: Page) {
      super(page);

      this.username = this.page.locator(
         "//div[contains(@class, 'orangehrm-edit-employee-name')]//h6[contains(@class, 'oxd-text') and contains(@class, 'oxd-text--h6') and contains(@class, '--strong')]"
      );
      this.profilePicture = this.page.locator(
         "(//img[@alt='profile picture'])[2]"
      );
      this.sideMenu = new MyInfoSideMenu(page);
   }

   async getUserName() {
      await this.page.waitForSelector(
         "//div[contains(@class, 'orangehrm-edit-employee-name')]//h6[contains(@class, 'oxd-text') and contains(@class, 'oxd-text--h6') and contains(@class, '--strong')]"
      );
      const username = await this.username.innerText();
      Logger.info(`Username: ${username}`);
      return username;
   }

   async isProfilePictureVisible() {
      await this.page.waitForSelector("(//img[@alt='profile picture'])[2]");
      const isVisible = await this.isVisible(this.profilePicture);
      Logger.info(`Profile picture is visible: ${isVisible}`);
      return isVisible;
   }
}

export class MyInfoSideMenu extends BasePage {
   private readonly sections: { [key: string]: Locator };

   constructor(page: Page) {
      super(page);
      this.sections = {
         personaldetails: this.page.locator(
            "//a[normalize-space()='Personal Details']"
         ),
         contactdetails: this.page.locator(
            "//a[normalize-space()='Contact Details']"
         ),
         emergencycontacts: this.page.locator(
            "//a[normalize-space()='Emergency Contacts']"
         ),
         dependents: this.page.locator("//a[normalize-space()='Dependents']"),
         immigration: this.page.locator("//a[normalize-space()='Immigration']"),
         job: this.page.locator("//a[normalize-space()='Job']"),
         salary: this.page.locator("//a[normalize-space()='Salary']"),
         reportTo: this.page.locator("//a[normalize-space()='Report-to']"),
         qualifications: this.page.locator(
            "//a[normalize-space()='Qualifications']"
         ),
         memberships: this.page.locator("//a[normalize-space()='Memberships']"),
      };
   }

   async goToSection(section: string) {
      const locator =
         this.sections[section.trim().toLowerCase().replace(" ", "")];
      if (locator) {
         await this.click(locator, section);
         Logger.info(`Navigated to the ${section} section`);
      } else {
         throw new Error(`Section ${section} not found`);
      }
   }
}

export class PersonalInfoSection extends BasePage {
   readonly sectionHeader: Locator;

   readonly firstName: Locator;
   readonly middleName: Locator;
   readonly lastName: Locator;
   readonly employeeId: Locator;
   readonly otherId: Locator;
   readonly licenseNumber: Locator;
   readonly licenseExpiry: Locator;
   // readonly nationality: Locator;
   // readonly maritalStatus: Locator;
   // readonly dateOfBirth: Locator;
   // readonly gender: Locator;

   readonly nationalityDropDownBtn: Locator;
   readonly maritalStatusDropDownBtn: Locator;
   readonly saveBtn: Locator;

   constructor(page: Page) {
      super(page);
      this.sectionHeader = page.locator("//h6[text()='Personal Details']");
      this.firstName = page.locator("//input[@placeholder='First Name']");
      this.middleName = page.locator("//input[@placeholder='Middle Name']");
      this.lastName = page.locator("//input[@placeholder='Last Name']");
      this.employeeId = page.locator(
         "(//label[normalize-space(text())='Employee Id']/following::input)[1]"
      );
      this.otherId = page.locator(
         "(//label[normalize-space(text())='Other Id']/following::input)[1]"
      );
      this.licenseNumber = page.locator(
         "(//label[normalize-space(text())='Driver's License Number']/following::input)[1]"
      );
      this.licenseExpiry = page.locator(
         "(//input[@placeholder='yyyy-dd-mm'])[1]"
      );


      this.nationalityDropDownBtn = page.locator("(//div[@class='oxd-select-wrapper'])[1]");
      this.maritalStatusDropDownBtn = page.locator("(//div[@class='oxd-select-wra[[er'])[2]");

      this.saveBtn = page.locator("(//button[@type='submit'])[1]");
   }

   async getSectionHeader() {
      await this.page.waitForSelector("//h6[text()='Personal Details']");
      const sectionHeader = await this.sectionHeader.innerText();
      Logger.info(`Section Header: ${sectionHeader}`);
      return sectionHeader;
   }
}

export class ContactDetailsSection extends BasePage {
   readonly sectionHeader: Locator;

   constructor(page: Page) {
      super(page);
      this.sectionHeader = page.locator("//h6[text()='Contact Details']");
   }

   async getSectionHeader() {
      await this.page.waitForSelector("//h6[text()='Contact Details']");
      const sectionHeader = await this.sectionHeader.innerText();
      Logger.info(`Section Header: ${sectionHeader}`);
      return sectionHeader;
   }
}

export class EmergencyContactsSection extends BasePage {
   readonly sectionHeader: Locator;

   constructor(page: Page) {
      super(page);
      this.sectionHeader = page.locator(
         "//h6[text()='Assigned Emergency Contacts']"
      );
   }

   async getSectionHeader() {
      await this.page.waitForSelector(
         "//h6[text()='Assigned Emergency Contacts']"
      );
      const sectionHeader = await this.sectionHeader.innerText();
      Logger.info(`Section Header: ${sectionHeader}`);
      return sectionHeader;
   }
}

export class DependentsSection extends BasePage {
   readonly sectionHeader: Locator;

   constructor(page: Page) {
      super(page);
      this.sectionHeader = page.locator("//h6[text()='Assigned Dependents']");
   }

   async getSectionHeader() {
      await this.page.waitForSelector("//h6[text()='Assigned Dependents']");
      const sectionHeader = await this.sectionHeader.innerText();
      Logger.info(`Section Header: ${sectionHeader}`);
      return sectionHeader;
   }
}
