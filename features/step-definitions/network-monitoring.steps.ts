import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ApiCallRecorder } from '../../utils/apiCallRecorder';
import { registrarSiFalla } from '../../utils/softAssert';
import { inyectarOverlayDeRed, registrarLlamadoEnOverlay, mostrarResultadoFinalEnOverlay } from '../../utils/networkOverlay';
import { environment } from '../../config/environment';
import type { ICustomWorld } from '../../support/world';

Given('comienza a monitorear los llamados a la API que contengan {string}', async function (this: ICustomWorld, patron: string) {
  this.apiCallRecorder = new ApiCallRecorder(this.page!, patron);

  if (environment.recordVideo) {
    await inyectarOverlayDeRed(this.page!, patron);
    this.page!.on('response', (response) => {
      const tipoRecurso = response.request().resourceType();
      if (tipoRecurso === 'xhr' || tipoRecurso === 'fetch') {
        void registrarLlamadoEnOverlay(this.page!, response.url(), response.url().includes(patron));
      }
    });
  }
});

Then('no debe haberse llamado a ninguna API que contenga {string}', async function (this: ICustomWorld, patron: string) {
  const llamados = this.apiCallRecorder?.obtenerLlamados() ?? [];
  const seLlamo = llamados.length > 0;

  if (environment.recordVideo) {
    await mostrarResultadoFinalEnOverlay(this.page!, seLlamo, patron);
    await this.page!.waitForTimeout(2500);
  }

  registrarSiFalla(
    this,
    !seLlamo,
    `Se esperaba que no se llame a ninguna API con "${patron}", pero se registraron: ${llamados.join(', ')}`
  );
});

Then('no deben quedar fallos registrados en el escenario', function (this: ICustomWorld) {
  const fallos = this.softFailures ?? [];
  expect(fallos, `Se registraron ${fallos.length} fallo(s) durante el escenario:\n- ${fallos.join('\n- ')}`).toEqual([]);
});
