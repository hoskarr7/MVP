import { BasePage } from '../BasePage';

export class ComprobanteCobroListPage extends BasePage {
  private readonly nuevoComprobanteButton = this.page.locator(
    '#botonera button[onclick="nuevoComprobantePublico()"]'
  );
  readonly urlPattern = /\/MotorComprobantes\/ComprobanteCobro\/List$/;

  async irAlListado(): Promise<void> {
    await this.goto('/MotorComprobantes/ComprobanteCobro/List');
  }

  async crearNuevoComprobante(): Promise<void> {
    await this.nuevoComprobanteButton.click();
  }

  async esperarCarga(): Promise<void> {
    await this.page.waitForURL(this.urlPattern);
  }
}
