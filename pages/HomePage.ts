import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly urlPattern = /\/v2\/home$/;

  async esperarCarga(): Promise<void> {
    await this.page.waitForURL(this.urlPattern);
  }
}
