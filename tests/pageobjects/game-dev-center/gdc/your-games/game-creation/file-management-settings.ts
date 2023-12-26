import { ElementHandle, Page } from 'puppeteer';
import { CommonHelper } from '../../../../../helpers/common.helper';
import { step } from '../../../../../helpers/allure.helper';

export class FileManagement {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    private settingsStatus(status: string): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, ` [data-value="${status}"]`);
    }

    private get filesRepositoriesBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="files-repositories-submenu"]');
    }

    private get createNewRepositoriesBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="create-Windowsfiles-repository-btn"]');
    }

    private get dropdownTypeRepositoriesBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[class="dropdown-dark dropdown-select dropdown"]');
    }

    private get nameRepositoriesInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="repository-name"]');
    }

    private get createFilesRepositoryBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="create-file-repository-submit"]');
    }

    private get selectTypeBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '.dropdown-item.dropdown-select__item');
    }

    private get assembleGameBuildsBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="assemble-game-builds-submenu"]');
    }

    private get assembleBuildsBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="create-build-btn"]');
    }

    private get prefixNameInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[csscountclass="token-count"] input');
    }

    private get searchRepositoryInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[name="searchInput"]');
    }

    private get chooseRepositoryBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[class="build-repository-info d-flex"] .build-repository-info__name');
    }

    private get createBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '.modal-footer-buttons .btn-primary');
    }

    private get checkAssembleBuildsBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '.body-border .ls-one-and-half.align-items-center');
    }

    private get assembleCompatibilityBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="assemble-compatibility-matrix-btn"]');
    }

    private get filePackageVersionBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="version-radio-input"]');
    }

    private get windowsBitBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="bitrate-checkbox-input"]');
    }

    private get launchingOptionsInput(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="launching-input"]');
    }

    private get dropdownConfigBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="dropdownConfig-btn"]');
    }

    private get tagBetaOrMasterBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="branch-btn"]');
    }

    private get saveChangesBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="save-changes"]');
    }

    private get saveButtonIsHidden(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="save-changes-dialog"]');
    }

    private get checkRepoTxt(): Promise<ElementHandle|null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="files-versions"]');
    }

    private get titleOfSectionTxt(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-field-title h5');
    }

    private get repositorySection(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-os-files-bundle ultra-expansion-panel');
    }

    protected get filesBadgeTxt(): string {
        return '.files-header__badge';
    }

    protected get filesIdTxt(): string {
        return '.files-header__id';
    }

    protected get repositoryName(): string {
        return '.tooltip-inner';
    }

    protected get filesVersionTxt(): string {
        return '.files-header__versions';
    }

  @step('Check the number of valid checkmark')
    async checkValidCheckmark(toBe: number): Promise<void> {
        await expect((await this.settingsStatus('checkmark-invalid')).length).toBe(toBe);
    }

  @step('Check the number of invalid checkmark')
  async checkInvalidCheckmark(toBe: number): Promise<void> {

      await expect((await this.settingsStatus('checkmark-valid')).length).toBe(toBe);
  }

  @step('Open the "Files Repositories" tab')
  async openFilesRepositoriesTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.filesRepositoriesBtn);
  }

  @step('Create new repositories')
  async createNewRep(gameInfo: any, type: number): Promise<void> {
      await (await this.createNewRepositoriesBtn)[0]!.click();
      await (await this.dropdownTypeRepositoriesBtn)!.click();
      await (await this.selectTypeBtn)[type]!.click();
      await CommonHelper.setValue(await this.nameRepositoriesInput, gameInfo);
      await page.waitForTimeout(3000); // for stability
      await (await this.createFilesRepositoryBtn)!.click();
  }

  @step('Open the "Assemble Game Builds" tab')
  async openAssembleGameBuildsTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.assembleGameBuildsBtn);
  }

  @step('Assemble compatibility matrix')
  async assembleCompatibilityMatrix(win: number, dropdown: number, tag: number): Promise<void> {
      await (await this.checkAssembleBuildsBtn)[win]!.click();
      await (await this.assembleCompatibilityBtn)[win]!.click();
      await (await this.filePackageVersionBtn)!.click();
      await this.nextOrCreate;
      await (await this.windowsBitBtn)[0]!.click();
      await this.windowsInfo(0, 'tetris.exe');
      await this.windowsInfo(1, '32_bit');
      await (await this.windowsBitBtn)[1]!.click();
      await this.windowsInfo(2, 'tetris.exe');
      await this.windowsInfo(3, '64_bit');
      await this.nextOrCreate;
      await this.nextOrCreate;
      await (await this.dropdownConfigBtn)[dropdown]!.click();
      await (await this.tagBetaOrMasterBtn)[tag]!.click();
      await this.saveChanges();
  }

  @step('Click next/create button')
  async nextOrCreate(): Promise<void> {
      await (await this.createBtn)!.click();
  }

  @step('Fill windows info')
  async windowsInfo(input: number, gameInfo: any): Promise<void> {
      await CommonHelper.setValue((await this.launchingOptionsInput)[input], gameInfo);
  }

  @step('Click the "Save" button')
  async saveChanges(): Promise<void> {
      await (await this.saveChangesBtn)!.click();
      await this.saveButtonIsHidden;
  }

  @step('Get the "Section" title')
  async getTitleOfSection(section: number): Promise<string | undefined> {
      await CommonHelper.scrollToElement((await this.titleOfSectionTxt)[section]);
      return CommonHelper.getTextContent((await this.titleOfSectionTxt)[section]);
  }

  async getRepositoryInfo(container: number): Promise<any> {
      const repositorySection = (await this.repositorySection)[container];
      const badge = await repositorySection.$eval(this.filesBadgeTxt, (el) => el.textContent);
      await (await repositorySection.$(this.filesIdTxt))!.hover();
      const repositoryName = await repositorySection.$eval(this.repositoryName, (el) => el.textContent);
      const version = await repositorySection.$eval(this.filesVersionTxt, (el) => el.textContent);
      return {
          badge: badge,
          repositoryName: repositoryName,
          version: version,
      };
  }

  @step('Create assemble build')
  async assembleBuild(Builds: number, newRep: number, gameInfo: any, gameInfo2: any): Promise<void> {
      await page.waitForTimeout(2000);
      await (await this.assembleBuildsBtn)[Builds]!.click();
      await (await this.createNewRepositoriesBtn)[newRep]!.click();
      await CommonHelper.setValue(await this.prefixNameInput, gameInfo);
      await CommonHelper.setValue(await this.searchRepositoryInput, gameInfo2);
      await page.waitForTimeout(2000); // for stability
      await (await this.chooseRepositoryBtn)!.click();
      await page.waitForTimeout(2000); // for stability
      await (await this.createBtn)!.click();
  }

  async waitUploadGame(): Promise<any> {
      const text = await this.checkRepoTxt;
      while(!('1 Version' === await text!.toString())){
          await this.page.waitForTimeout(5000);
          await this.page.reload();
      }
  }
}
