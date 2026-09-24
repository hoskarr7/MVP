import type { Page } from 'playwright';
import { esperarFinDeCarga, esperarAngularEstable } from '../utils/waits';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  protected async esperarFinDeCarga(): Promise<void> {
    await esperarFinDeCarga(this.page);
  }

  protected async esperarAngularEstable(): Promise<void> {
    await esperarAngularEstable(this.page);
  }
}
