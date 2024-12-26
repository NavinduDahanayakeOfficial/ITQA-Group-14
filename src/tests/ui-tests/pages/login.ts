import { Locator, Page} from 'playwright';
import { BasePage } from './base.page';
import { config } from '../utils/env';
import { Logger } from '../utils/logger';
export class LoginPage extends BasePage {

  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.userName = this.page.locator('//input[@name="username"]');
    this.password = this.page.locator('//input[@type="password"]');
    this.loginBtn = this.page.locator('//button[normalize-space()="Login"]');  }

  async Login(username = config.credentials.admin.username, password = config.credentials.admin.password) {
    await this.page.goto(`${config.baseUrl}/auth/login`);
    Logger.info('Navigated to the login page');
  
    await this.fill(this.userName, username, 'username');
    Logger.info('Entered Email');
    await this.fill(this.password, password, 'password');
    Logger.info('Entered Password');
    await this.click(this.loginBtn, 'login button');
  }
}



