import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ComprobanteVentaListPage } from '../../pages/comprobantes/ComprobanteVentaListPage';
import { ComprobanteVentaFormPage } from '../../pages/comprobantes/ComprobanteVentaFormPage';
import type { ICustomWorld } from '../../support/world';

Given('el usuario se encuentra en el listado de Comprobantes de Venta', async function (this: ICustomWorld) {
  const listPage = new ComprobanteVentaListPage(this.page!);
  await listPage.irAlListado();
});

When('el usuario inicia la creación de un nuevo comprobante', async function (this: ICustomWorld) {
  const listPage = new ComprobanteVentaListPage(this.page!);
  await listPage.crearNuevoComprobante();
});

When('selecciona el tipo de comprobante {string}', async function (this: ICustomWorld, tipoComprobante: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.seleccionarTipoComprobante(tipoComprobante);
});

When('busca y selecciona el socio de negocio {string}', async function (this: ICustomWorld, busqueda: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.seleccionarSocioDeNegocio(busqueda);
});

When('selecciona el centro de costos', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.seleccionarCentroDeCostos();
});

When('selecciona la segunda opción de centro de costos', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.seleccionarCentroDeCostosPorPosicion(1);
});

When('selecciona la sucursal destino', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.seleccionarSucursalDestino();
});

When('completa el número {string}', async function (this: ICustomWorld, numero: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.completarNumero(numero);
});

When('aplica el descuento o recargo general {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.seleccionarDescuentoRecargoGral(valor);
});

When('hace clic en Asociar Ordenes', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.abrirAsociarOrdenes();
});

When('selecciona el cargo {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.ordenesDeTrabajoModal.seleccionarCargo(valor);
});

When('busca las órdenes de trabajo', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.ordenesDeTrabajoModal.buscar();
});

When('selecciona la primera orden de trabajo disponible', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.ordenesDeTrabajoModal.seleccionarPrimeraOrden();
});

When('acepta el modal de selección de órdenes de trabajo', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.ordenesDeTrabajoModal.aceptar();
});

When('accede a la solapa Items', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.irASolapaItems();
});

When('agrega un nuevo item', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.agregarItem();
});

When('selecciona el tipo de item {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.seleccionarTipoItem(valor);
});

When('selecciona el tercer item disponible', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.seleccionarItemPorPosicion(2);
});

When('selecciona el depósito {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.seleccionarDeposito(valor);
});

When('busca y selecciona el item {string}', async function (this: ICustomWorld, busqueda: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.buscarYSeleccionarItem(busqueda);
});

When('completa la cantidad {string}', async function (this: ICustomWorld, cantidad: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.completarCantidad(Number(cantidad));
});

When('aplica el descuento o recargo del item {string}', async function (this: ICustomWorld, valor: string) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.seleccionarDescuentoRecargoItem(valor);
});

When('guarda el item', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.items.guardarItem();
});

When('guarda el comprobante', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.guardar();
});

When('confirma el guardado y la emisión en los mensajes emergentes', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.confirmarGuardadoYEmision();
});

When('confirma la emisión exitosa del comprobante', async function (this: ICustomWorld) {
  const formPage = new ComprobanteVentaFormPage(this.page!);
  await formPage.confirmarEmisionExitosa();
});

Then('el comprobante se crea correctamente y vuelve al listado', async function (this: ICustomWorld) {
  const listPage = new ComprobanteVentaListPage(this.page!);
  await listPage.esperarCarga();
  await expect(this.page!).toHaveURL(listPage.urlPattern);
});
