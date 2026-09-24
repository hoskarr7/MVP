import { BasePage } from '../BasePage';
import { Select2Component } from '../components/Select2Component';
import { ItemsTabComponent } from '../components/ItemsTabComponent';
import { SwalModal } from '../components/SwalModal';
import { OrdenesDeTrabajoModal } from '../components/OrdenesDeTrabajoModal';
import { esNinguno } from '../../utils/opcionOpcional';

export class ComprobanteVentaFormPage extends BasePage {
  private readonly tipoComprobanteSelect = new Select2Component(this.page, 'TipoComprobanteId');
  private readonly socioDeNegocioSelect = new Select2Component(this.page, 'ClienteSocioNegocioId');
  private readonly centroDeCostosSelect = new Select2Component(this.page, 'CentroCostoCabeceraId');
  private readonly sucursalDestinoSelect = new Select2Component(this.page, 'ComprobanteDomicilioEntregaSucursalID');
  private readonly descuentoRecargoGral = new Select2Component(this.page, 'DescuentoRecargoId');
  private readonly itemsTabLink = this.page.getByRole('link', { name: 'Items', exact: true });
  private readonly guardarButton = this.page.locator('#btn-guardar');
  private readonly titulo = this.page.locator('#form-title');
  private readonly numeroInput = this.page.locator('input[name="Numero"][maxlength="10"]');
  private readonly asociarOrdenesButton = this.page.locator('#btnAsociarOrdenes');
  readonly items = new ItemsTabComponent(this.page);
  readonly modalConfirmacion = new SwalModal(this.page);
  readonly ordenesDeTrabajoModal = new OrdenesDeTrabajoModal(this.page);

  async seleccionarTipoComprobante(tipoComprobante: string): Promise<void> {
    await this.tipoComprobanteSelect.abrir();
    await this.tipoComprobanteSelect.buscar(tipoComprobante);
    await this.tipoComprobanteSelect.seleccionarOpcion(tipoComprobante);
  }

  async seleccionarSocioDeNegocio(busqueda: string): Promise<void> {
    await this.socioDeNegocioSelect.abrir();
    await this.socioDeNegocioSelect.buscar(busqueda);
    await this.socioDeNegocioSelect.seleccionarOpcionPorPosicion(0);
    await this.esperarAngularEstable();
  }

  async seleccionarCentroDeCostos(): Promise<void> {
    await this.seleccionarCentroDeCostosPorPosicion(0);
  }

  async seleccionarCentroDeCostosPorPosicion(indice: number): Promise<void> {
    await this.centroDeCostosSelect.abrir();
    await this.centroDeCostosSelect.seleccionarOpcionPorPosicion(indice);
  }

  async seleccionarSucursalDestino(): Promise<void> {
    await this.esperarFinDeCarga();
    await this.sucursalDestinoSelect.abrir();
    await this.sucursalDestinoSelect.seleccionarOpcionPorPosicion(0);
  }

  async completarNumero(numero: string): Promise<void> {
    await this.numeroInput.fill(numero);
  }

  async seleccionarDescuentoRecargoGral(valor: string): Promise<void> {
    if (esNinguno(valor)) {
      return;
    }
    await this.descuentoRecargoGral.abrir();
    await this.descuentoRecargoGral.seleccionarOpcion(valor);
    await this.esperarAngularEstable();
  }

  async abrirAsociarOrdenes(): Promise<void> {
    await this.asociarOrdenesButton.click();
  }

  async irASolapaItems(): Promise<void> {
    await this.itemsTabLink.click();
  }

  async guardar(): Promise<void> {
    await this.esperarAngularEstable();
    await this.guardarButton.click();
    await this.esperarFinDeCarga();
  }

  async confirmarGuardadoYEmision(): Promise<void> {
    await this.modalConfirmacion.aceptar();
    await this.esperarFinDeCarga();
    await this.lanzarSiNumeroDuplicado();
    await this.modalConfirmacion.aceptar();
  }

  private async lanzarSiNumeroDuplicado(): Promise<void> {
    const toastNumeroDuplicado = this.page.locator('.toast-error', {
      hasText: 'Ya existe un comprobante con esta numeración',
    });
    if (await toastNumeroDuplicado.first().isVisible().catch(() => false)) {
      throw new Error(
        'No se pudo emitir el comprobante: ya existe un comprobante con esta numeración. Verifique el número ingresado.'
      );
    }
  }

  async confirmarEmisionExitosa(): Promise<void> {
    await this.modalConfirmacion.aceptarSiAparece();
  }

  tituloFormulario() {
    return this.titulo;
  }
}
