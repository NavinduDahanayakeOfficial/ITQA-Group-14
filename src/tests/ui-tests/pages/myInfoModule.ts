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
            "//a[normalize-space(text())='Personal Details']"
         ),
         contactdetails: this.page.locator(
            "//a[normalize-space(text())='Contact Details']"
         ),
         emergencycontacts: this.page.locator(
            "//a[normalize-space(text())='Emergency Contacts']"
         ),
         dependents: this.page.locator(
            "//a[normalize-space(text())='Dependents']"
         ),
         immigration: this.page.locator(
            "//a[normalize-space(text())='Immigration']"
         ),
         job: this.page.locator("//a[normalize-space(text())='Job']"),
         salary: this.page.locator("//a[normalize-space(text())='Salary']"),
         reportto: this.page.locator(
            "//a[normalize-space(text())='Report-to']"
         ),
         qualifications: this.page.locator(
            "//a[normalize-space(text())='Qualifications']"
         ),
         memberships: this.page.locator(
            "//a[normalize-space(text())='Memberships']"
         ),
      };
   }

   async goToSection(section: string) {
      const locator =
         this.sections[
            section.trim().toLowerCase().replace(" ", "").replace("-", "")
         ];
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
   readonly nationality: Locator;
   readonly maritalStatus: Locator;
   readonly dateOfBirth: Locator;
   readonly genderMaleRadioBtn: Locator;
   readonly genderFemaleRadioBtn: Locator;

   readonly nationalityDropDownBtn: Locator;
   readonly maritalStatusDropDownBtn: Locator;
   readonly mainSaveBtn: Locator;

   readonly successMessage: Locator;

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
         '(//label[normalize-space(text())="Driver\'s License Number"]/following::input)[1]'
      );
      this.licenseExpiry = page.locator(
         "(//input[@placeholder='yyyy-dd-mm'])[1]"
      );
      this.nationality = page.locator(
         "(//div[@class='oxd-select-text-input'])[1]"
      );
      this.maritalStatus = page.locator(
         "(//div[@class='oxd-select-text-input'])[2]"
      );
      this.dateOfBirth = page.locator(
         "(//input[@placeholder='yyyy-dd-mm'])[2]"
      );
      this.genderMaleRadioBtn = page.locator(
         "(//input[@type='radio']/following-sibling::span)[1]"
      );
      this.genderFemaleRadioBtn = page.locator("(//input[@type='radio'])[2]");

      this.nationalityDropDownBtn = page.locator(
         "(//div[@class='oxd-select-wrapper'])[1]"
      );
      this.maritalStatusDropDownBtn = page.locator(
         "(//div[@class='oxd-select-wrapper'])[2]"
      );

      this.mainSaveBtn = page.locator("(//button[@type='submit'])[1]");

      this.successMessage = this.page.locator(
         '//p[@class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text"]'
      );
   }

   async getSectionHeader() {
      await this.page.waitForSelector("//h6[text()='Personal Details']");
      const sectionHeader = await this.sectionHeader.innerText();
      Logger.info(`Section Header: ${sectionHeader}`);
      return sectionHeader;
   }

   async getPersonalInfo() {
      await this.page.waitForSelector("//h6[text()='Personal Details']");
      await this.page.waitForSelector("//input[@placeholder='First Name']");
      const firstName = await this.firstName.inputValue();
      const middleName = await this.middleName.inputValue();
      const lastName = await this.lastName.inputValue();
      const employeeId = await this.employeeId.inputValue();
      const otherId = await this.otherId.inputValue();
      const licenseNumber = await this.licenseNumber.inputValue();
      const licenseExpiry = await this.licenseExpiry.inputValue();
      const nationality = await this.nationality.innerText();
      const maritalStatus = await this.maritalStatus.innerText();
      const dateOfBirth = await this.dateOfBirth.inputValue();
      const gender = (await this.genderMaleRadioBtn.isChecked())
         ? "Male"
         : "Female";

      const personalInfo: PersonalInfo = {
         firstName,
         middleName,
         lastName,
         employeeId,
         otherId,
         licenseNumber,
         licenseExpiry,
         nationality,
         maritalStatus,
         dateOfBirth,
         gender,
      };

      return personalInfo;
   }

   async fillPersonalInfo(personalInfo: PersonalInfo) {
      await this.page.waitForSelector("//h6[text()='Personal Details']");
      await this.page.waitForSelector("//input[@placeholder='First Name']");
      await this.page.waitForTimeout(2000);

      await this.firstName.fill(personalInfo.firstName);
      if (personalInfo.middleName)
         await this.middleName.fill(personalInfo.middleName);
      await this.lastName.fill(personalInfo.lastName);
      if (personalInfo.employeeId)
         await this.employeeId.fill(personalInfo.employeeId);
      if (personalInfo.otherId) await this.otherId.fill(personalInfo.otherId);
      if (personalInfo.licenseNumber)
         await this.licenseNumber.fill(personalInfo.licenseNumber);
      if (personalInfo.licenseExpiry)
         await this.licenseExpiry.fill(personalInfo.licenseExpiry);
      if (personalInfo.nationality)
         await this.selectNationality(personalInfo.nationality);
      if (personalInfo.maritalStatus)
         await this.selectMaritalStatus(personalInfo.maritalStatus);
      if (personalInfo.dateOfBirth)
         await this.dateOfBirth.fill(personalInfo.dateOfBirth);
      if (personalInfo.gender) await this.selectGender(personalInfo.gender);

      await this.page.waitForTimeout(3000);
      return;
   }

   async selectFromDropdown(
      dropdownButton: Locator,
      currentValue: Locator,
      newValue: string,
      description: string
   ) {
      const currentText = await currentValue.innerText();

      if (currentText !== newValue || currentText === "-- Select --") {
         await this.click(dropdownButton, `${description} dropdown`);

         const dropdown = this.page.locator(".oxd-select-dropdown");
         await dropdown.waitFor({ state: "visible" });

         // Get all options and find the matching one
         const options = this.page.locator(
            ".oxd-select-dropdown .oxd-select-option"
         );
         await options.first().waitFor({ state: "visible" }); // Wait for options to be loaded

         const optionLocator = options.filter({ hasText: newValue });
         await optionLocator.click();

         // Wait for dropdown to close
         await dropdown.waitFor({ state: "hidden" });

         Logger.info(`Selected ${newValue} for ${description}`);
      } else {
         Logger.info(`${description} already set to ${newValue}`);
      }
   }

   async selectNationality(nationality: string) {
      await this.selectFromDropdown(
         this.nationalityDropDownBtn,
         this.nationality,
         nationality,
         "Nationality"
      );
   }

   async selectMaritalStatus(maritalStatus: string) {
      await this.selectFromDropdown(
         this.maritalStatusDropDownBtn,
         this.maritalStatus,
         maritalStatus,
         "Marital Status"
      );
   }

   async selectGender(gender: string) {
      await this.page.waitForSelector("(//input[@type='radio'])[1]");
      await this.page.waitForSelector("(//input[@type='radio'])[2]");
      const currentGender = (await this.genderMaleRadioBtn.isChecked())
         ? "Male"
         : "Female";
      if (currentGender !== gender) {
         if (gender === "Male") {
            await this.genderMaleRadioBtn.check();
         } else {
            await this.genderFemaleRadioBtn.check();
         }
      }
   }

   async savePersonalInfo() {
      await this.mainSaveBtn.click();
   }

   async getSuccessMessage() {
      await this.page.waitForSelector(
         '//p[@class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text"]'
      );
      const message = await this.successMessage.innerText();
      Logger.info(`Success Message: ${message}`);
      return message;
   }

   async getRequiredFields() {
      const requiredField1 = await this.page
         .locator(
            "(//input[contains(@class,'oxd-input oxd-input--active oxd-input--error')])[1]"
         )
         .evaluate((element) => {
            return (element as HTMLInputElement).placeholder;
         });
      const requiredField2 = await this.page
         .locator(
            "(//input[contains(@class,'oxd-input oxd-input--active oxd-input--error')])[2]"
         )
         .evaluate((element) => {
            return (element as HTMLInputElement).placeholder;
         });
      Logger.info(`Required Fields: ${requiredField1} , ${requiredField2}`);
      return [requiredField1, requiredField2];
   }

   async checkMissingRequiredFieldsAreHighlighted() {
      const fistNameClassName = await this.firstName.evaluate((element) => {
         return (element as HTMLInputElement).className;
      });

      const lastNameClassName = await this.lastName.evaluate((element) => {
         return (element as HTMLInputElement).className;
      });

      Logger.info(`First Name Class Name: ${fistNameClassName}`);
      Logger.info(`Last Name Class Name: ${lastNameClassName}`);

      if (
         fistNameClassName.includes("oxd-input--error") &&
         lastNameClassName.includes("oxd-input--error")
      ) {
         return true;
      } else {
         return false;
      }
   }

   async checkRequiredMessagesAreVisible() {
      await this.page.waitForSelector("(//span[contains(@class,'oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message')])")

      const elements = await this.page.locator("//span[contains(@class,'oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message')]").evaluateAll((elements) => {
         return elements.map((element) => (element as HTMLInputElement).innerText);
      });

      if (elements.length === 2 && elements[0] ==="Required" && elements[1] ==="Required") {
         return true;
      } else {
         return false;
      }
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

interface PersonalInfo {
   firstName: string;
   middleName?: string;
   lastName: string;
   employeeId?: string;
   otherId?: string;
   licenseNumber?: string;
   licenseExpiry?: string;
   nationality?: string;
   maritalStatus?: string;
   dateOfBirth?: string;
   gender?: string;
}
