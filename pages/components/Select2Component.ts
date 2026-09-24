import type { Page, Locator } from 'playwright';

export class Select2Component {
  private readonly trigger: Locator;
  private readonly openDropdown: Locator;

  constructor(page: Page, selectId: string) {
    this.trigger = page.locator(`[aria-labelledby="select2-${selectId}-container"]`);
    this.openDropdown = page.locator('.select2-container--open');
  }

  async esperarVisible(): Promise<void> {
    await this.trigger.waitFor({ state: 'visible' });
  }

  async abrir(): Promise<void> {
    await this.trigger.click();
  }

  async buscar(texto: string): Promise<void> {
    await this.openDropdown.locator('.select2-search__field').fill(texto);
  }

  async seleccionarOpcion(texto: string): Promise<void> {
    await this.openDropdown.locator('.select2-results__option', { hasText: texto }).first().click();
  }

  async seleccionarOpcionPorPosicion(indice: number): Promise<void> {
    await this.openDropdown.locator('.select2-results__option').nth(indice).click();
  }
}
