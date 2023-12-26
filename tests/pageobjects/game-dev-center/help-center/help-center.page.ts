import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../../helpers/common.helper';
import { step } from '../../../helpers/allure.helper';
const config = require('../../../../config/config.data.json').env.HELPCENTER;
const data = require('../../../../test-data/page-data.json').GDC.HelpCenter;

export class HelpCenterPage extends CommonHelper {
  @step('Wait for open Help Center page')
    static async getInstance(browser: Browser): Promise<HelpCenterPage> {
        return new HelpCenterPage(await this.getPageFromClient(browser, config.URL));
    }

  private get helpCenterHeaderText(): Promise<ElementHandle|null> {
      return CommonHelper.waitForSelector(this.page, '[class="container-fluid p-0"] h1');
  }

  private get helpGameDevCenterLink(): Promise<ElementHandle|null> {
      return CommonHelper.waitForSelector(this.page, 'a[href="/en/game-dev-center"]');
  }

  private get helpUltraCloudLink(): Promise<ElementHandle|null> {
      return CommonHelper.waitForSelector(this.page, 'a[href="https://getbraincloud.com/apidocs/apiref/index.html#introduction"]');
  }

  private get helpGameDevCenterHeaderText(): Promise<ElementHandle|null> {
      return CommonHelper.waitForSelector(this.page, '[class="text-justify"] h3');
  }

  private get homeDocumentationBtn(): Promise<ElementHandle|null> {
      return CommonHelper.waitForSelector(this.page, '[class="doc-list"] button');
  }

  private get headerContentBtn(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.expansion-panel__header-content span');
  }

  private get contentListBtn(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.ps-content .list a');
  }

  private get descriptionText(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.text-justify h5');
  }

  async waitForDisplayed(): Promise<ElementHandle|null> {
      return this.helpCenterHeaderText;
  }

  @step('Get the "Help Center" value')
  async getHelpCenterHeader(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.helpCenterHeaderText);
  }

  @step('Get the "Content Header" value')
  async getContentHeader(list: number): Promise<string | undefined> {
      return CommonHelper.getTextContent((await this.descriptionText)[list]);
  }

  @step('Check the "Help Center Header" value')
  async checkUltraCloudTeamPanelHeader(): Promise<void> {
      await expect(await this.getHelpCenterHeader()).toContain(data.header);
  }

  @step('Wait for displayed the "Help GDC" link')
  async waitForDisplayedGDCLink(): Promise<ElementHandle | null> {
      return this.helpGameDevCenterLink;
  }

  @step('Wait for displayed the "Help Ultra Cloud" link')
  async waitForDisplayedUltraCloudLink(): Promise<ElementHandle | null> {
      return this.helpUltraCloudLink;
  }

  @step('Click on the "GDC help" link')
  async openGDCLink(): Promise<void> {
      await (await this.helpGameDevCenterLink)!.click();
  }

  @step('Wait for displayed the "GDC Header" value')
  async waitForDisplayedGDCLinkHeader(): Promise<ElementHandle | null> {
      return this.helpGameDevCenterHeaderText;
  }

  @step('Click on the "Home Documentation" button')
  async clickHomeDocumentation(): Promise<void> {
      await (await this.homeDocumentationBtn)!.click();
  }

  @step('Click on the "Ultra Cloud" link')
  async openUltraCloudLink(): Promise<void> {
      await (await this.helpUltraCloudLink)!.click();
  }

  @step('Check the "Help Center" content')
  async checkContent(list: number, content: number, expectedText: string): Promise<void> {
      await (await this.contentListBtn)[list].click();
      await expect(await this.getContentHeader(content)).toContain(expectedText);
  }

  @step('Select the "Header" content')
  async selectHeaderContent(index: number): Promise<void> {
      await (await this.headerContentBtn)[index].click();
  }

  @step('Check the "Game Developer Center" data')
  async checkGameDeveloperCenter(): Promise<void> {
      await this.selectHeaderContent(0);
      await this.checkContent(0, 0, data.overview);
      await this.checkContent(1, 1, data.noteEdit);
      await this.checkContent(2, 2, data.step);
      await this.checkContent(3, 3, data.step1);
      await this.checkContent(4, 4, data.step2);
  }

  @step('Check the "Store page" data')
  async checkStorePage(): Promise<void> {
      await this.selectHeaderContent(1);
      await this.checkContent(5, 0, data.overview);
      await this.checkContent(6, 1, data.step3);
  }

  @step('Check the "File Repositories" data')
  async checkFileRepositories(): Promise<void> {
      await this.selectHeaderContent(2);
      await this.checkContent(7, 0, data.overview);
      await this.checkContent(8, 1, data.step4);
  }

  @step('Check the "File Beam" data')
  async checkFileBeam(): Promise<void> {
      await this.selectHeaderContent(3);
      await this.checkContent(9, 0, data.overview);
      await this.checkContent(10, 1, data.step5);
  }

  @step('Check the "Assemble Game Builds" data')
  async checkAssembleGameBuilds(): Promise<void> {
      await this.selectHeaderContent(4);
      await this.checkContent(11, 0, data.overview);
      await this.checkContent(12, 1, data.step6);
      await this.checkContent(13, 2, data.step7);
      await this.checkContent(14, 3, data.step8);
  }

  @step('Check the "Token Factories" data')
  async checkTokenFactories(): Promise<void> {
      await this.selectHeaderContent(5);
      await this.checkContent(15, 0, data.overview);
      await this.checkContent(16, 1, data.step9);
  }
}
