import puppeteer, { Browser, ElementHandle, Page, Target } from 'puppeteer';

export abstract class CommonHelper {
  protected constructor(protected page: Page) {}

  static async browser(): Promise<Browser> {
    return await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      waitForInitialPage: false,
      executablePath: 'C:/Program Files/Ultra_QA/Application/ultra.exe',
      ignoreDefaultArgs: ['--disable-component-extensions-with-background-pages'],
      args: [
        '--start-maximized',
        '--enable-features=NetworkService',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--shm-size=3gb',
        '--disable-extensions',
        '--ignore-certificate-errors',
        // '--do-not-check-ultra-updates'
      ],
      slowMo: 50 /* slows down Puppeteer operations by the specified amount of milliseconds. */
    })
  }

  static async getPageFromClient(browser: Browser, url: string): Promise<Page> {
    const target: any = await browser.waitForTarget((target: Target) => target.url().startsWith(url), {timeout: 300000});
    target._targetInfo.type = 'page';
    return target.page();
  }

  static async setValue(element: ElementHandle<HTMLElement> | null, value: any): Promise<void> {
    await element!.click({ clickCount: 3 });
    await element!.press('Backspace');
    await element!.click();
    await element!.type(value);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  static async waitForTimeout(milliseconds: number):Promise<void> {
    return page.waitForTimeout(milliseconds);
  }

  static async closeBrowser(browser:any):Promise<void> {
    await page.waitForTimeout(2000); // needed to capture screen after test failure
    await (browser).close();
  }

  async bringToFront():Promise<void> {
    await this.page.bringToFront();
  }

  static async reloadPage(page: any):Promise<void> {
    await page.reload();
  }

  static async getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static async getRandom(list: string[]) {
    return list[Math.floor((Math.random()*list.length))];
  }

  static async waitForSelector(
    page: any,
    selector: string,
    options: {
      hidden?: boolean;
      signal?: unknown;
      timeout?: number;
      visible?: boolean;
    } = {},
  ): Promise<ElementHandle<HTMLElement> | null> {
    return page.waitForSelector(selector, { timeout: 50000, visible: true, ...options });
  }

  static async waitForXPath(page: any, xPath: string): Promise<ElementHandle<HTMLElement> | null> {
    return page.waitForXPath(xPath, { timeout: 50000, visible: true });
  }

  static async waitForXPath$$(page: any, selector: string): Promise<ElementHandle<HTMLElement>[]> {
    return page
      .waitForXPath(selector, { timeout: 50000, visible: true })
      .then(() => page.$x(selector));
  }

  static async waitForSelectors$$(
    page: any,
    selector: string,
    options: {
      hidden?: boolean;
      signal?: unknown;
      timeout?: number;
      visible?: boolean;
    } = {},
  ): Promise<ElementHandle<HTMLElement>[]> {
    return page
      .waitForSelector(selector, { timeout: 50000, visible: true, ...options })
      .then(() => page.$$(selector));
  }

  static async hoverAndClick(element: ElementHandle<HTMLElement> | null): Promise<void> {
    await element!.hover();
    await element!.evaluate((el) => (el).click());
  }

  static async focusAndClick(element: ElementHandle<HTMLElement> | null): Promise<void> {
    await element!.evaluate((el) => (el)!.focus());
    await element!.evaluate((el) => (el).click());
  }

  static async scrollToElement(element: ElementHandle<HTMLElement> | null): Promise<void> {
    await element!.evaluate((el) => (el).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }));
  }

  static async scrollAndClick(element: ElementHandle<HTMLElement> | null): Promise<void> {
    await element!.evaluate((el) => (el).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }));
    await element!.evaluate((el) => (el).click());
  }

  static async hoverAndPressEnter(element: ElementHandle | null): Promise<void> {
    await element!.hover();
    await element!.press('Enter');
  }

  static async getTextContent(element: ElementHandle<HTMLElement> | null): Promise<string | undefined> {
    return (element)!.evaluate((el) => el.textContent?.trim());
  }

  static getTextBetween(str: string, from: string, to: string): string {
    return str.split(from)[1].split(to)[0];
  }

  static waitForText(page: Page, element: ElementHandle<HTMLElement> | null, text: string) {
    return page.waitForFunction(
      (element: HTMLElement, text: string) => element?.textContent?.includes(text),
      {},
      element,
      text,
    );
  }

  static async slowType(element: ElementHandle<HTMLElement> | null, value: string, delay: number): Promise<void> {
    await element!.click({ clickCount: 3 });
    await element!.press('Backspace');
    await element!.click();
    await element!.type(value, { delay: delay });
  }
}
