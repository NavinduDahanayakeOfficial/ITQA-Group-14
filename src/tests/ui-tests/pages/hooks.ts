import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { LoginPage } from './login';

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

Before(async function () {
  browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
  bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
  page = await bCtx.newPage();

  // Perform login once for all scenarios
  const loginpage = new LoginPage(page);
  await loginpage.Login();
  console.log('User is logged in');
});

After(async function () {
  await page.close();
  await bCtx.close();
  await browser.close();
});

export { page };
