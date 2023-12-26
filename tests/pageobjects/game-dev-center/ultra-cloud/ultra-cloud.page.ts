import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../../helpers/common.helper';
import { step } from '../../../helpers/allure.helper';

const config = require('../../../../config/config.data.json').env.ULTRACLOUD;
const data = require('../../../../test-data/page-data.json').GDC.UltraCloud;

export class UltraCloudPage extends CommonHelper {
  @step('Wait for open Ultra Cloud page')
    static async getInstance(browser: Browser): Promise<UltraCloudPage> {
        return new UltraCloudPage(await this.getPageFromClient(browser, config.URL));
    }

  private get teamPanel(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="team-panel"]');
  }

  private get teamPanelHeaderText(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="select-team"]');
  }

  private get addTeamBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[class="btn btn-primary"]');
  }

  private get continueBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[class="btn btn-success pull-right"]');
  }

  private get createTeamContainer(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.modal-dialog');
  }

  private get createTeamHeaderText(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.modal-dialog h5');
  }

  private get teamNameInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="newCompanyName"]');
  }

  private get createGamesTeamCheckbox(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="builds-games"]');
  }

  private get createAppsTeamCheckbox(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="builds-apps"]');
  }

  private get createThingsTeamCheckbox(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="builds-things"]');
  }

  private get createTeamBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[id="create-btn-text"]');
  }

  private get selectTeam(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[class="ui-select-match-text pull-left"] span');
  }

  private get selectTeamInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'input[type="search"]');
  }

  async waitForDisplayed(): Promise<ElementHandle | null> {
      return this.teamPanel;
  }

  @step('Get the "Team Panel Header" value')
  async getTeamPanelHeader(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.teamPanelHeaderText);
  }

  @step('Get the "Create Team Header" value')
  async getCreateTeamHeader(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.createTeamHeaderText);
  }

  @step('Get the "Team name" value')
  async getTeamName(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.selectTeam);
  }

  @step('Check the "Team Panel Header" value')
  async checkTeamPanelHeader(): Promise<void> {
      await expect(await this.getTeamPanelHeader()).toContain(data.teamPanel);
  }

  @step('Click on the "Continue" button')
  async clickContinueBtn(): Promise<void> {
      await (await this.continueBtn)!.click();
  }

  @step('Click on the "Add Team" button')
  async clickAddTeamBtn(): Promise<void> {
      await (await this.addTeamBtn)!.click();
  }

  @step('Wait for load "Create Team" container')
  async waitForCreateTeamContainer(): Promise<ElementHandle | null> {
      return this.createTeamContainer;
  }

  @step('Check the "Create Team Header" value')
  async checkCreateTeamHeader(): Promise<void> {
      await expect(await this.getCreateTeamHeader()).toContain(data.createTeamModal);
  }

  @step('Fill the "Team name" value')
  async fillTeamName(name: string): Promise<void> {
      await CommonHelper.setValue(await this.teamNameInput, name);
  }

  @step('Select the "Games Type" checkbox')
  async selectGamesTypeTeam(): Promise<void> {
      await (await this.createGamesTeamCheckbox)!.click();
  }

  @step('Select the "Apps Type" checkbox')
  async selectAppsTypeTeam(): Promise<void> {
      await (await this.createAppsTeamCheckbox)!.click();
  }

  @step('Select the "Things Type" checkbox')
  async selectThingsTypeTeam(): Promise<void> {
      await (await this.createThingsTeamCheckbox)!.click();
  }

  @step('Click on the "Create Team" button')
  async clickCreateTeamBtn(): Promise<void> {
      await (await this.createTeamBtn)!.click();
  }

  @step('Select the Team by name')
  async selectTeamByName(team: string): Promise<void> {
      await CommonHelper.scrollAndClick(await this.selectTeam);
      await CommonHelper.setValue(await this.selectTeamInput, team);
      await (await this.selectTeamInput)!.press('Enter');
  }

  @step('Check the "Team name" value')
  async checkTeamName(team: string): Promise<void> {
      await page.waitForTimeout(1500); // wait for the team name update
      await expect(await this.getTeamName()).toContain(team);
  }
}
