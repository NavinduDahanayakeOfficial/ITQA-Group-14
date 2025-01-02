import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";
import { LoginPage } from "./login";
import { Logger } from "../../../utils/logger";

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

Before({ tags: "@UI" }, async function () {
   browser = await chromium.launch({
      headless: true,
      args: ["--start-maximized"],
   });
   bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
   page = await bCtx.newPage();

   const loginpage = new LoginPage(page);
   await loginpage.Login();
   Logger.info("User is logged in");
});

After({ tags: "@UI" },async function () {
   await page?.close();
   await bCtx?.close();
   await browser?.close();
});

export { page };
