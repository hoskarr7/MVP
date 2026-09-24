import { BasePage } from '../BasePage';

export class ComprobantePagoListPage extends BasePage {
  private readonly nuevoComprobanteButton = this.page.locator('#botonera button[onclick="nuevoComprobantePublico()"]');
  readonly urlPattern = /\/MotorComprobantes\/ComprobantePago\/List$/;

  async irAlListado(): Promise<void> {
    await this.goto('/MotorComprobantes/ComprobantePago/List');
  }

  async crearNuevoComprobante(): Promise<void> {
    await this.nuevoComprobanteButton.click();
  }

  async esperarCarga(): Promise<void> {
    await this.page.waitForURL(this.urlPattern);
  }
}
