import type { Page } from 'playwright';

export class CajaOrigenModal {
  private readonly botonAbrirEfectivo = this.page.locator('[ng-click="abrirModalCajasOrigen()"]:visible');
  private readonly botonNuevaCaja = this.page.locator('[ng-click="mostrarFrmCajaOrigen(null,true,true)"]:visible');
  private readonly importeInput = this.page.locator('#ImporteMonedaEmisionCajaOrigen');
  private readonly botonCargar = this.page.locator('[ng-click="guardarCajaOrigen()"]:visible');
  private readonly botonAceptar = this.page.locator('[onclick*="modalCajasOrigen"][onclick*="hide"]:visible');

  constructor(private readonly page: Page) {}

  async abrirDesdeEfectivo(): Promise<void> {
    await this.botonAbrirEfectivo.first().click();
    await this.botonNuevaCaja.first().waitFor({ state: 'visible' });
  }

  async cargarImporte(importe: string): Promise<void> {
    await this.botonNuevaCaja.first().click();
    await this.importeInput.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
    await this.importeInput.fill(importe);
    await this.botonCargar.first().click();
    await this.page.waitForFunction(
      (valorEsperado) => {
        const input = document.getElementById('TotalImporteMonedaEmisionCajaOrigen') as HTMLInputElement | null;
        return Boolean(input && parseFloat(input.value.replace(',', '.')) > 0);
      },
      importe
    );
  }

  async aceptar(): Promise<void> {
    await this.botonAceptar.first().click();
  }
}
