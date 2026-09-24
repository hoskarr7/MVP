import type { Page, Locator } from 'playwright';
import { Select2Component } from './Select2Component';
import { esperarFinDeCarga, esperarAngularEstable } from '../../utils/waits';
import { esNinguno } from '../../utils/opcionOpcional';

export class ItemsTabComponent {
  private readonly nuevoItemButton: Locator;
  private readonly tipoItemSelect: Select2Component;
  private readonly itemSelect: Select2Component;
  private readonly depositoSelect: Select2Component;
  private readonly descuentoRecargoItemSelect: Select2Component;
  private readonly cantidadInput: Locator;
  private readonly guardarItemButton: Locator;
  private readonly itemForm: Locator;

  constructor(private readonly page: Page) {
    this.nuevoItemButton = page.locator('#btnNuevoComprobanteItem');
    this.tipoItemSelect = new Select2Component(page, 'ComprobanteItemTipoItemID');
    this.itemSelect = new Select2Component(page, 'ComprobanteItemArticuloID');
    this.depositoSelect = new Select2Component(page, 'ComprobanteItemDepositoID');
    this.descuentoRecargoItemSelect = new Select2Component(page, 'ComprobanteItemDescuentoRecargoID');
    this.cantidadInput = page.locator('[name="ComprobanteItem.CantidadUM1"]');
    this.itemForm = page.locator('#frmComprobanteItem');
    this.guardarItemButton = this.itemForm.getByRole('button', { name: 'Guardar', exact: true });
  }

  async agregarItem(): Promise<void> {
    await this.nuevoItemButton.waitFor({ state: 'visible', timeout: 90 * 1000 });
    await this.nuevoItemButton.click();
    await this.itemForm.waitFor({ state: 'visible' });
    await this.itemSelect.esperarVisible();
  }

  async seleccionarTipoItem(texto: string): Promise<void> {
    await this.tipoItemSelect.abrir();
    await this.tipoItemSelect.seleccionarOpcion(texto);
  }

  async seleccionarItemPorPosicion(indice: number): Promise<void> {
    await this.itemSelect.abrir();
    await this.itemSelect.seleccionarOpcionPorPosicion(indice);
  }

  async buscarYSeleccionarItem(busqueda: string): Promise<void> {
    await this.itemSelect.abrir();
    await this.itemSelect.buscar(busqueda);
    await this.itemSelect.seleccionarOpcion(busqueda);
  }

  async seleccionarDeposito(texto: string): Promise<void> {
    await this.depositoSelect.abrir();
    await this.depositoSelect.seleccionarOpcion(texto);
    await esperarAngularEstable(this.page);
  }

  async completarCantidad(cantidad: number): Promise<void> {
    await this.cantidadInput.fill(cantidad.toString());
    await esperarAngularEstable(this.page);
  }

  async seleccionarDescuentoRecargoItem(valor: string): Promise<void> {
    if (esNinguno(valor)) {
      return;
    }
    await this.descuentoRecargoItemSelect.abrir();
    await this.descuentoRecargoItemSelect.seleccionarOpcion(valor);
    await esperarAngularEstable(this.page);
  }

  async guardarItem(): Promise<void> {
    await esperarAngularEstable(this.page);
    await this.guardarItemButton.click();
    await esperarFinDeCarga(this.page);
    await this.itemForm.waitFor({ state: 'hidden' });
  }
}
