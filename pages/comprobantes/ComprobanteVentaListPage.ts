import { BasePage } from '../BasePage';

export class ComprobanteVentaListPage extends BasePage {
  private readonly nuevoComprobanteButton = this.page.locator(
    '#botonera button[onclick="nuevoComprobantePublico()"]'
  );
  readonly urlPattern = /\/MotorComprobantes\/ComprobanteVenta\/List$/;

  async irAlListado(): Promise<void> {
    await this.goto('/MotorComprobantes/ComprobanteVenta/List');
  }

  async crearNuevoComprobante(): Promise<void> {
    await this.nuevoComprobanteButton.click();
  }

  async esperarCarga(): Promise<void> {
    await this.page.waitForURL(this.urlPattern);
  }
}
