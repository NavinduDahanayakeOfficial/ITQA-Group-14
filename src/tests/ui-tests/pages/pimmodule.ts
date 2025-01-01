import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';
import { Logger } from '../utils/logger';
export class PimModule extends BasePage {

    readonly addEmployee: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    // readonly employeeID: Locator;
    readonly saveBtn: Locator;
    readonly employeeName: Locator;
    readonly personalInfo: Locator;
    readonly srcEmpName: Locator;
    readonly searchBtn: Locator;
    readonly resultName: Locator;
    readonly checkBox: Locator;
    readonly deleteBtn: Locator;
    readonly deleteConfirmBtn: Locator;
    readonly noRecordsFound: Locator;


    constructor(page: Page) {
        super(page);
        this.addEmployee = this.page.locator('//a[normalize-space()="Add Employee"]');
        this.firstName = this.page.locator('//input[@placeholder="First Name"]');
        this.lastName = this.page.locator('//input[@placeholder="Last Name"]');
        // this.employeeID = this.page.locator('//input[@class="oxd-input oxd-input--active"]');
        this.saveBtn = this.page.locator('//button[@type="submit" and text()=" Save "]');  
        this.employeeName = this.page.locator('//h6[@class="oxd-text oxd-text--h6 --strong"]');
        this.personalInfo = this.page.locator('//h6[normalize-space()="Personal Details"]');
        this.srcEmpName = this.page.locator('(//input[@placeholder="Type for hints..."])[1]');
        this.searchBtn = this.page.locator('//button[@type="submit" and text()=" Search "]');
        this.resultName = this.page.locator('//div[@role="table"]/div[2]/div[1]/div[1]');
        this.checkBox = this.page.locator('(//div[@class="oxd-table-card-cell-checkbox"]//i[@class="oxd-icon bi-check oxd-checkbox-input-icon"])[1]');
        this.deleteBtn = this.page.locator('//button[normalize-space()="Delete Selected"]');
        this.deleteConfirmBtn = this.page.locator('//button[normalize-space()="Yes, Delete"]');
        this.noRecordsFound = this.page.locator('//span[normalize-space()="No Records Found"]');
    }
     
    async clickAddEmployee() {
        await this.click(this.addEmployee, 'Add Employee button');
    }

    async fillEmployeeDetails(fname: string, lname: string) {
        await this.firstName.fill(fname); 
        await this.lastName.fill(lname);
        // await this.employeeID.fill(empID);
      }

    async clickSaveBtn() {
       await this.page.waitForTimeout(5000);
       await this.click(this.saveBtn, 'Save button');
    }

    async getEmployeeName() {
        await this.page.waitForTimeout(10000);
        const nameEmp = await this.employeeName.innerText();
        Logger.info('Employee Name: ' + nameEmp);
        return nameEmp;
    }

    async verifyUserAdded() {
        await this.page.waitForTimeout(5000);
        return await this.personalInfo.innerText();
    }

    async searchEmployee(empName: string) {
        return await this.fill(this.srcEmpName, empName, 'Search an Employee');
    }

    async clickSearchBtn() {
        await this.page.waitForTimeout(5000);
        await this.click(this.searchBtn, 'Search button');
    }

    async getSearchResults() {
        await this.page.waitForTimeout(7000);
        return await this.resultName.innerText();
    }

    async selectEmployee() {
        await this.page.waitForTimeout(5000);
        await this.click(this.checkBox, 'Checkbox');
    }

    async deleteEmployee() {
        await this.page.waitForTimeout(5000);
        await this.click(this.deleteBtn, 'Delete button');
        await this.page.waitForTimeout(5000);
        await this.click(this.deleteConfirmBtn, 'Confirm Delete button');
    }

    async isEmployeeDeleted() {
        await this.page.waitForTimeout(5000);
        return await this.noRecordsFound.innerText();
    }
}