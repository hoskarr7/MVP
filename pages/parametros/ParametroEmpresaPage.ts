import { BasePage } from '../BasePage';

export class ParametroEmpresaPage extends BasePage {
  private readonly buscarInput = this.page.getByPlaceholder('Ingresa Parámetros');

  async ir(): Promise<void> {
    await this.goto('/v2/cross/parametroempresa');
  }

  async buscarParametro(texto: string): Promise<void> {
    await this.buscarInput.fill(texto);
  }

  async asegurarEstado(nombreParametro: string, habilitado: boolean): Promise<void> {
    const fila = this.page.locator('[role="row"]', { hasText: nombreParametro });
    const toggle = fila.locator('[data-testid^="toggle-switch"]');
    await toggle.waitFor({ state: 'visible' });

    const testId = await toggle.getAttribute('data-testid');
    const estaHabilitado = testId === 'toggle-switch-true';

    if (estaHabilitado !== habilitado) {
      await toggle.click();
      const testIdEsperado = habilitado ? 'toggle-switch-true' : 'toggle-switch-false';
      await this.page.waitForFunction(
        ({ selector, texto, testId }) => {
          const filas = Array.from(document.querySelectorAll('[role="row"]'));
          const fila = filas.find((f) => f.textContent?.includes(texto));
          const el = fila?.querySelector(selector);
          return el?.getAttribute('data-testid') === testId;
        },
        { selector: '[data-testid^="toggle-switch"]', texto: nombreParametro, testId: testIdEsperado }
      );
    }
  }
}
