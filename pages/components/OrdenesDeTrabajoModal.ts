import type { Page, Locator } from 'playwright';
import { Select2Component } from './Select2Component';

export class OrdenesDeTrabajoModal {
  private readonly modal: Locator;
  private readonly backdrop: Locator;
  private readonly cargoSelect: Select2Component;
  private readonly buscarButton: Locator;
  private readonly aceptarButton: Locator;
  private readonly primeraOrdenCheckbox: Locator;

  constructor(private readonly page: Page) {
    this.modal = page.locator('#modalAsociarOrden');
    this.backdrop = page.locator('.modal-backdrop');
    this.cargoSelect = new Select2Component(page, 'CargoID');
    this.buscarButton = this.modal.getByRole('button', { name: 'Buscar', exact: true });
    this.aceptarButton = this.modal.locator('button.btn.btn-primary.modal-action-button');
    this.primeraOrdenCheckbox = this.modal.locator('input[type="checkbox"]:not([name="btSelectAll"]):visible').first();
  }

  async seleccionarCargo(valor: string): Promise<void> {
    await this.cargoSelect.abrir();
    await this.cargoSelect.seleccionarOpcion(valor);
  }

  async buscar(): Promise<void> {
    await this.buscarButton.click();
  }

  async seleccionarPrimeraOrden(): Promise<void> {
    await this.primeraOrdenCheckbox.waitFor({ state: 'visible', timeout: 60000 });
    await this.primeraOrdenCheckbox.check();
  }

  async aceptar(): Promise<void> {
    await this.aceptarButton.click();
    await this.modal.waitFor({ state: 'hidden' });
    await this.backdrop.waitFor({ state: 'hidden' }).catch(() => undefined);
  }
}
