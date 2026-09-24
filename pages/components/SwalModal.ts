import type { Page } from 'playwright';

export class SwalModal {
  constructor(private readonly page: Page) {}

  async aceptar(): Promise<void> {
    const boton = this.page.getByRole('button', { name: 'Aceptar' });
    await boton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(300);
    await boton.click();
  }

  async aceptarSiAparece(timeout = 5000): Promise<void> {
    const boton = this.page.getByRole('button', { name: 'Aceptar' });
    const aparecio = await boton
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
    if (aparecio) {
      await this.page.waitForTimeout(300);
      await boton.click();
    }
  }
}
