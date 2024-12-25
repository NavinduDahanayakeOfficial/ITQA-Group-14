import { Locator, Page} from 'playwright';

export class LoginPage {

  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = this.page.locator('//input[@name="username"]');
    this.password = this.page.locator('//input[@type="password"]');
    this.loginBtn = this.page.locator('//button[normalize-space()="Login"]');  }

  async Login() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'load' });
    console.log('Navigated to the login page');
  
    const userName = 'Admin';
    const userPassword = 'admin123';
  
    await this.userName.fill(userName);
    console.log('Entered Email');
    await this.password.fill(userPassword);
    console.log('Entered Password');
    await this.loginBtn.click();
    console.log('Clicked on Login Button');
  }
}



