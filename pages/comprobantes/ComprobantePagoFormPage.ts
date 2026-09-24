import { BasePage } from '../BasePage';
import { Select2Component } from '../components/Select2Component';
import { SwalModal } from '../components/SwalModal';
import { CajaOrigenModal } from '../components/CajaOrigenModal';

export class ComprobantePagoFormPage extends BasePage {
  private readonly tipoComprobanteSelect = new Select2Component(this.page, 'TipoComprobanteId');
  private readonly socioDeNegocioSelect = new Select2Component(this.page, 'ProveedorSocioNegocioId');
  private readonly puntoVentaSelect = new Select2Component(this.page, 'PuntoVentaId');
  private readonly tipoMovimientoTesoreriaSelect = new Select2Component(this.page, 'TipoMovimientoTesoreriaId');
  private readonly importeBrutoInput = this.page.locator('#ImporteBruto');
  private readonly descripcionInput = this.page.locator('[name="Descripcion"]').first();
  private readonly movimientosTesoreriaTab = this.page.getByRole('link', { name: 'Movimientos Tesoreria', exact: true });
  private readonly guardarButton = this.page.locator('#btn-guardar:visible');
  readonly cajaOrigen = new CajaOrigenModal(this.page);
  readonly modalConfirmacion = new SwalModal(this.page);

  async seleccionarTipoComprobante(texto: string): Promise<void> {
    await this.tipoComprobanteSelect.abrir();
    await this.tipoComprobanteSelect.buscar(texto);
    await this.tipoComprobanteSelect.seleccionarOpcion(texto);
  }

  async seleccionarSocioDeNegocio(busqueda: string): Promise<void> {
    await this.socioDeNegocioSelect.abrir();
    await this.socioDeNegocioSelect.buscar(busqueda);
    await this.socioDeNegocioSelect.seleccionarOpcion(busqueda);
    await this.esperarAngularEstable();
  }

  async seleccionarPuntoVenta(texto: string): Promise<void> {
    await this.puntoVentaSelect.abrir();
    await this.puntoVentaSelect.seleccionarOpcion(texto);
    await this.esperarAngularEstable();
  }

  async completarImporteBruto(valor: string): Promise<void> {
    await this.importeBrutoInput.fill(valor);
  }

  async irASolapaMovimientosTesoreria(): Promise<void> {
    await this.movimientosTesoreriaTab.click();
  }

  async seleccionarTipoMovimientoTesoreria(texto: string): Promise<void> {
    await this.tipoMovimientoTesoreriaSelect.abrir();
    await this.tipoMovimientoTesoreriaSelect.seleccionarOpcion(texto);
    await this.esperarAngularEstable();
  }

  async completarDescripcion(texto: string): Promise<void> {
    await this.descripcionInput.fill(texto);
  }

  async guardar(): Promise<void> {
    await this.esperarAngularEstable();
    await this.guardarButton.first().click();
  }

  async confirmarGuardado(): Promise<void> {
    await this.modalConfirmacion.aceptar();
  }

  async obtenerNumeroEmitido(): Promise<string> {
    const mensaje = this.page.getByText(/se ha emitido con éxito/i);
    await mensaje.waitFor({ state: 'visible' });
    const texto = await mensaje.innerText();
    const match = texto.match(/número\s*(\d+)/i);
    if (!match) {
      throw new Error(`No se pudo extraer el número del comprobante del texto: "${texto}"`);
    }
    return match[1];
  }

  async esperarResultadoGuardado(): Promise<'exito' | 'rechazado'> {
    const mensajeExito = this.page.getByText(/se ha emitido con éxito/i);
    const mensajeRechazo = this.page.getByText(/faltan configurar imputaciones contables/i);
    await Promise.race([
      mensajeExito.waitFor({ state: 'visible' }),
      mensajeRechazo.waitFor({ state: 'visible' }),
    ]);
    return (await mensajeRechazo.isVisible().catch(() => false)) ? 'rechazado' : 'exito';
  }

  async confirmarEmision(): Promise<void> {
    await this.modalConfirmacion.aceptar();
  }
}
