import { Browser, ElementHandle } from 'puppeteer';
import { step } from '../../../helpers/allure.helper';
import { CommonHelper } from '../../../helpers/common.helper';

const config = require('../../../../config/config.data.json').env.ULTRACLOUD;
const data = require('../../../../test-data/page-data.json').GDC.UltraCloud;

export class TeamHomePage extends CommonHelper {
  @step('Wait for redirect to Team Home page')
    static async getInstance(browser: Browser): Promise<TeamHomePage> {
        return new TeamHomePage(await this.getPageFromClient(browser, config.URL));
    }

  private get infoboxText(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[class="infobox-text ng-binding"]');
  }

  private get teamNameText(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="braincloud-sections-parent"] [class="pull-left"] + p');
  }

  private get manageBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[title="Manage"] .ellipsis-text');
  }

  private get teamInfoBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="leftnav-docs-manage-company"]');
  }

  private get getAccountNum(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="accountNum"]');
  }

  private get infoboxTextContainer(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[class="infobox-text ng-binding"]');
  }

  @step('Get the "infobox" value')
  async getInfoboxText(): Promise<string | undefined> {
      await this.infoboxTextContainer;
      return CommonHelper.getTextContent(await this.infoboxText);
  }

  @step('Get the "Team name" value on start page')
  async getTeamNameOnStartPageText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.teamNameText);
  }

  @step('Get the "Account number" value')
  async getAccountNumText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.getAccountNum);
  }

  @step('Check the Team information')
  async checkTeamInfo(teamName: string, teamID: string): Promise<void> {
      await expect(teamName).toContain(await this.getTeamNameOnStartPageText());
      await (await this.manageBtn)!.click();
      await (await this.teamInfoBtn)!.click();
      await expect(teamID).toContain(await this.getAccountNumText());
  }

  @step('Check the "Infobox" value')
  async checkInfoboxText(): Promise<void> {
      await expect(await this.getInfoboxText()).toContain(data.infobox);
  }
}
