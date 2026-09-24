import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ImputacionContablePage } from '../../pages/contable/ImputacionContablePage';
import { ParametroEmpresaPage } from '../../pages/parametros/ParametroEmpresaPage';
import type { ICustomWorld } from '../../support/world';

Given('el usuario se encuentra en Imputación Contable', async function (this: ICustomWorld) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.ir();
});

When('selecciona {string} en Componente Patrimonial', async function (this: ICustomWorld, valor: string) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.seleccionarComponentePatrimonial(valor);
});

When('busca la categoría {string}', async function (this: ICustomWorld, texto: string) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.buscarCategoria(texto);
});

When('edita la categoría {string}', async function (this: ICustomWorld, categoria: string) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.editarCategoria(categoria);
});

When('selecciona {string} en Tipo Apertura', async function (this: ICustomWorld, valor: string) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.seleccionarTipoApertura(valor);
});

When('limpia la Cuenta Deudora', async function (this: ICustomWorld) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.limpiarCuentaDeudora();
});

When('selecciona {string} en Cuenta Deudora', async function (this: ICustomWorld, valor: string) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.seleccionarCuentaDeudora(valor);
});

When('limpia la Cuenta Acreedora', async function (this: ICustomWorld) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.limpiarCuentaAcreedora();
});

When('selecciona {string} en Cuenta Acreedora', async function (this: ICustomWorld, valor: string) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.seleccionarCuentaAcreedora(valor);
});

When('guarda la imputación contable', async function (this: ICustomWorld) {
  const imputacionPage = new ImputacionContablePage(this.page!);
  await imputacionPage.guardar();
});

Then('la imputación contable se guarda con éxito', async function (this: ICustomWorld) {
  await expect(this.page!.getByText('La acción se completó con éxito.')).toBeVisible();
});

When('el usuario se encuentra en Parámetro Empresa', async function (this: ICustomWorld) {
  const parametroPage = new ParametroEmpresaPage(this.page!);
  await parametroPage.ir();
});

When('busca el parámetro {string}', async function (this: ICustomWorld, texto: string) {
  const parametroPage = new ParametroEmpresaPage(this.page!);
  await parametroPage.buscarParametro(texto);
});

Then('asegura que el parámetro {string} esté habilitado', async function (this: ICustomWorld, nombreParametro: string) {
  const parametroPage = new ParametroEmpresaPage(this.page!);
  await parametroPage.asegurarEstado(nombreParametro, true);
});

Then('asegura que el parámetro {string} esté deshabilitado', async function (this: ICustomWorld, nombreParametro: string) {
  const parametroPage = new ParametroEmpresaPage(this.page!);
  await parametroPage.asegurarEstado(nombreParametro, false);
});
