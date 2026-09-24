import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ComprobanteCobroListPage } from '../../pages/comprobantes/ComprobanteCobroListPage';
import { ComprobanteCobroFormPage } from '../../pages/comprobantes/ComprobanteCobroFormPage';
import { registrarSiFalla } from '../../utils/softAssert';
import type { ICustomWorld } from '../../support/world';

Given('el usuario se encuentra en el listado de Comprobantes de Cobro', async function (this: ICustomWorld) {
  const listPage = new ComprobanteCobroListPage(this.page!);
  await listPage.irAlListado();
});

When('el usuario inicia la creación de un nuevo comprobante de cobro', async function (this: ICustomWorld) {
  const listPage = new ComprobanteCobroListPage(this.page!);
  await listPage.crearNuevoComprobante();
});

When('selecciona el tipo de comprobante de cobro {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.seleccionarTipoComprobante(valor);
});

When('selecciona el socio de negocio del cobro {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.seleccionarSocioDeNegocio(valor);
});

When('completa el importe bruto {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.completarImporteBruto(valor);
});

When('accede a la solapa Movimientos Tesorería', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.irASolapaMovimientosTesoreria();
});

When('selecciona el tipo de movimiento tesorería {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.seleccionarTipoMovimientoTesoreria(valor);
});

When('completa la descripción del movimiento {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.completarDescripcion(valor);
});

When('abre el modal de Efectivo', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.cajaDestino.abrirDesdeEfectivo();
});

When('carga el importe {string} en Efectivo', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.cajaDestino.cargarImporte(valor);
});

When('acepta el modal de Efectivo', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.cajaDestino.aceptar();
});

When('guarda el comprobante de cobro', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.guardar();
});

When('confirma el guardado del comprobante de cobro', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.confirmarGuardado();
});

When('registra el número del comprobante de cobro emitido', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  const resultado = await formPage.esperarResultadoGuardado();
  if (resultado === 'rechazado') {
    throw new Error(
      'Se esperaba que el guardado se complete con éxito, pero el comprobante fue rechazado por falta de imputaciones contables (toast: "Faltan configurar imputaciones contables")'
    );
  }
  this.numeroComprobanteEmitido = await formPage.obtenerNumeroEmitido();
});

When('confirma la emisión del comprobante de cobro', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  await formPage.confirmarEmision();
});

Then('el comprobante de cobro se crea correctamente y vuelve al listado', async function (this: ICustomWorld) {
  const listPage = new ComprobanteCobroListPage(this.page!);
  await listPage.esperarCarga();
  await expect(this.page!).toHaveURL(listPage.urlPattern);
});

Then('el guardado del comprobante de cobro es rechazado por falta de imputaciones contables', async function (this: ICustomWorld) {
  const formPage = new ComprobanteCobroFormPage(this.page!);
  const resultado = await formPage.esperarResultadoGuardado();
  registrarSiFalla(
    this,
    resultado === 'rechazado',
    `Se esperaba que el guardado sea rechazado por falta de imputaciones contables, pero el resultado fue "${resultado}"`
  );
});
