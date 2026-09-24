import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { environment } from '../../config/environment';
import type { ICustomWorld } from '../../support/world';

Given('el usuario se encuentra en la pantalla de inicio de sesión', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.goto();
});

When('el usuario ingresa sus credenciales válidas', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.completarSubdominio(environment.subdominio);
  await loginPage.completarUsuario(environment.username);
  await loginPage.completarContrasena(environment.password);
});

When('el usuario confirma el inicio de sesión', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.iniciarSesion();
});

Then('el usuario accede correctamente al sistema', async function (this: ICustomWorld) {
  const homePage = new HomePage(this.page!);
  await homePage.esperarCarga();
  await expect(this.page!).toHaveURL(homePage.urlPattern);
});
