import { Locator, Page} from 'playwright';

export class PimModule {

    readonly page: Page;
    readonly addEmployee: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    // readonly employeeID: Locator;
    readonly saveBtn: Locator;
    readonly employeeName: Locator;
    readonly successToastMsg: Locator;
    readonly srcEmpName: Locator;
    readonly searchBtn: Locator;
    readonly resultName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addEmployee = this.page.locator('//a[normalize-space()="Add Employee"]');
        this.firstName = this.page.locator('//input[@placeholder="First Name"]');
        this.lastName = this.page.locator('//input[@placeholder="Last Name"]');
        // this.employeeID = this.page.locator('//input[@class="oxd-input oxd-input--active"]');
        this.saveBtn = this.page.locator('//button[@type="submit" and text()=" Save "]');  
        this.employeeName = this.page.locator('//h6[@class="oxd-text oxd-text--h6 --strong"]');
        this.successToastMsg = this.page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]');
        this.srcEmpName = this.page.locator('(//input[@placeholder="Type for hints..."])[1]');
        this.searchBtn = this.page.locator('//button[@type="submit" and text()=" Search "]');
        this.resultName = this.page.locator('//div[@role="table"]/div[2]/div[1]/div[1]');
    }
     
    async clickAddEmployee() {
        await this.addEmployee.click();
    }

    async fillEmployeeDetails(fname: string, lname: string) {
        await this.firstName.fill(fname); 
        await this.lastName.fill(lname);
        // await this.employeeID.fill('12345');
      }

    async clickSaveBtn() {
        await this.saveBtn.click();
    }

    async getEmployeeName() {
        return await this.employeeName.innerText();
    }

    async getSuccessToastMsg() {
        return await this.successToastMsg.isVisible();
    }

    async searchEmployee(empName: string) {
        await this.srcEmpName.fill(empName);
    }

    async clickSearchBtn() {
        await this.searchBtn.click();
    }

    async getSearchResults() {
        const rowData = await this.resultName.innerText();
        return rowData;
    }
}