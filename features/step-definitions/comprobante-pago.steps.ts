import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ComprobantePagoListPage } from '../../pages/comprobantes/ComprobantePagoListPage';
import { ComprobantePagoFormPage } from '../../pages/comprobantes/ComprobantePagoFormPage';
import { registrarSiFalla } from '../../utils/softAssert';
import type { ICustomWorld } from '../../support/world';

Given('el usuario se encuentra en el listado de Comprobantes de Pago', async function (this: ICustomWorld) {
  const listPage = new ComprobantePagoListPage(this.page!);
  await listPage.irAlListado();
});

When('el usuario inicia la creación de un nuevo comprobante de pago', async function (this: ICustomWorld) {
  const listPage = new ComprobantePagoListPage(this.page!);
  await listPage.crearNuevoComprobante();
});

When('selecciona el tipo de comprobante de pago {string}', async function (this: ICustomWorld, texto: string) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.seleccionarTipoComprobante(texto);
});

When('selecciona el socio de negocio del pago {string}', async function (this: ICustomWorld, texto: string) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.seleccionarSocioDeNegocio(texto);
});

When('selecciona el punto de venta {string}', async function (this: ICustomWorld, texto: string) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.seleccionarPuntoVenta(texto);
});

When('completa el importe bruto del pago {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.completarImporteBruto(valor);
});

When('accede a la solapa Movimientos Tesorería del pago', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.irASolapaMovimientosTesoreria();
});

When('selecciona el tipo de movimiento tesorería del pago {string}', async function (this: ICustomWorld, texto: string) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.seleccionarTipoMovimientoTesoreria(texto);
});

When('completa la descripción del movimiento de pago {string}', async function (this: ICustomWorld, texto: string) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.completarDescripcion(texto);
});

When('abre el modal de Efectivo del pago', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.cajaOrigen.abrirDesdeEfectivo();
});

When('carga el importe {string} en Efectivo del pago', async function (this: ICustomWorld, importe: string) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.cajaOrigen.cargarImporte(importe);
});

When('acepta el modal de Efectivo del pago', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.cajaOrigen.aceptar();
});

When('guarda el comprobante de pago', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.guardar();
});

When('confirma el guardado del comprobante de pago', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.confirmarGuardado();
});

When('registra el número del comprobante de pago emitido', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  const resultado = await formPage.esperarResultadoGuardado();
  if (resultado === 'rechazado') {
    throw new Error(
      'Se esperaba que el guardado se complete con éxito, pero el comprobante fue rechazado por falta de imputaciones contables (toast: "Faltan configurar imputaciones contables")'
    );
  }
  this.numeroComprobanteEmitido = await formPage.obtenerNumeroEmitido();
});

When('confirma la emisión del comprobante de pago', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  await formPage.confirmarEmision();
});

Then('el comprobante de pago se crea correctamente y vuelve al listado', async function (this: ICustomWorld) {
  const listPage = new ComprobantePagoListPage(this.page!);
  await listPage.esperarCarga();
  await expect(this.page!).toHaveURL(listPage.urlPattern);
});

Then('el guardado del comprobante de pago es rechazado por falta de imputaciones contables', async function (this: ICustomWorld) {
  const formPage = new ComprobantePagoFormPage(this.page!);
  const resultado = await formPage.esperarResultadoGuardado();
  registrarSiFalla(
    this,
    resultado === 'rechazado',
    `Se esperaba que el guardado sea rechazado por falta de imputaciones contables, pero el resultado fue "${resultado}"`
  );
});
