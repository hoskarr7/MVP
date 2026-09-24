import { BasePage } from '../BasePage';
import { Select2Component } from '../components/Select2Component';

export class ImputacionContablePage extends BasePage {
  private readonly componentePatrimonialSelect = new Select2Component(this.page, 'ItemId');
  private readonly tipoAperturaSelect = new Select2Component(this.page, 'AperturaContableId');
  private readonly cuentaDeudoraSelect = new Select2Component(this.page, 'CuentaContableDeudoraId');
  private readonly cuentaAcreedoraSelect = new Select2Component(this.page, 'CuentaContableAcreedoraId');
  private readonly buscarCategoriaInput = this.page.locator('#CategoriaNombreSearch');
  private readonly guardarButton = this.page.getByRole('button', { name: 'Guardar', exact: true });

  async ir(): Promise<void> {
    await this.goto('/contable/imputacioncontable');
  }

  async seleccionarComponentePatrimonial(texto: string): Promise<void> {
    await this.componentePatrimonialSelect.abrir();
    await this.componentePatrimonialSelect.seleccionarOpcion(texto);
    await this.esperarAngularEstable();
  }

  async buscarCategoria(texto: string): Promise<void> {
    await this.buscarCategoriaInput.click();
    await this.buscarCategoriaInput.type(texto, { delay: 100 });
    await this.buscarCategoriaInput.press('Enter');
    await this.esperarAngularEstable();
  }

  async editarCategoria(nombreCategoria: string): Promise<void> {
    const fila = this.page.locator('table tbody tr').filter({
      has: this.page.getByText(nombreCategoria, { exact: true }),
    });
    await fila.first().waitFor({ state: 'visible' });
    await fila.first().locator('a.fa-edit, a:has(.fa-edit)').first().click();
    await this.page.locator('[aria-labelledby="select2-AperturaContableId-container"]').waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1500);
  }

  async seleccionarTipoApertura(texto: string): Promise<void> {
    await this.tipoAperturaSelect.abrir();
    await this.tipoAperturaSelect.seleccionarOpcion(texto);
  }

  async limpiarCuentaDeudora(): Promise<void> {
    await this.page.locator('a[onclick*="CuentaContableDeudoraId"]').click();
    await this.page.waitForTimeout(500);
  }

  async seleccionarCuentaDeudora(texto: string): Promise<void> {
    await this.cuentaDeudoraSelect.abrir();
    await this.cuentaDeudoraSelect.buscar(texto);
    await this.cuentaDeudoraSelect.seleccionarOpcion(texto);
  }

  async limpiarCuentaAcreedora(): Promise<void> {
    await this.page.locator('a[onclick*="CuentaContableAcreedoraId"]').click();
    await this.page.waitForTimeout(500);
  }

  async seleccionarCuentaAcreedora(texto: string): Promise<void> {
    await this.cuentaAcreedoraSelect.abrir();
    await this.cuentaAcreedoraSelect.buscar(texto);
    await this.cuentaAcreedoraSelect.seleccionarOpcion(texto);
  }

  async guardar(): Promise<void> {
    await this.guardarButton.click();
  }
}
