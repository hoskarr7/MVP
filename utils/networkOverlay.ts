import type { Page } from 'playwright';

export async function inyectarOverlayDeRed(page: Page, patron: string): Promise<void> {
  await page
    .evaluate((patronABuscar) => {
      document.getElementById('evidencia-red-overlay')?.remove();

      const overlay = document.createElement('div');
      overlay.id = 'evidencia-red-overlay';
      overlay.style.cssText = `
        position: fixed; top: 10px; right: 10px; z-index: 2147483647;
        background: rgba(20,20,20,0.92); color: #e0e0e0; font: 12px/1.4 monospace;
        padding: 10px; border-radius: 6px; width: 460px; max-height: 300px;
        overflow-y: auto; box-shadow: 0 0 10px rgba(0,0,0,0.6);
      `;
      overlay.innerHTML = `
        <div style="color:#fff;font-weight:bold;margin-bottom:6px;">
          Monitoreando llamados de red que contengan: "${patronABuscar}"
        </div>
        <div id="evidencia-red-log"></div>
      `;
      document.body.appendChild(overlay);
    }, patron)
    .catch(() => undefined);
}

export async function registrarLlamadoEnOverlay(page: Page, url: string, coincide: boolean): Promise<void> {
  await page
    .evaluate(
      ({ url: urlLlamado, coincide: esCoincidencia }) => {
        const log = document.getElementById('evidencia-red-log');
        if (!log) {
          return;
        }
        const linea = document.createElement('div');
        linea.style.color = esCoincidencia ? '#ff5c5c' : '#7fdb7f';
        linea.textContent = `${esCoincidencia ? '[MATCH] ' : '- '}${urlLlamado}`;
        log.prepend(linea);
        while (log.childElementCount > 10) {
          log.removeChild(log.lastChild as ChildNode);
        }
      },
      { url, coincide }
    )
    .catch(() => undefined);
}

export async function mostrarResultadoFinalEnOverlay(page: Page, seLlamo: boolean, patron: string): Promise<void> {
  if ((await page.locator('#evidencia-red-overlay').count()) === 0) {
    await inyectarOverlayDeRed(page, patron);
  }

  await page
    .evaluate(
      ({ seLlamo: huboLlamado, patron: patronABuscar }) => {
        const overlay = document.getElementById('evidencia-red-overlay');
        if (!overlay) {
          return;
        }
        const banner = document.createElement('div');
        banner.style.cssText = `
          margin-top: 8px; padding: 8px; border-radius: 4px; font-weight: bold; text-align: center;
          background: ${huboLlamado ? '#c0392b' : '#27ae60'}; color: white;
        `;
        banner.textContent = huboLlamado
          ? `SE LLAMO a una API con "${patronABuscar}"`
          : `NO se llamo a ninguna API con "${patronABuscar}"`;
        overlay.appendChild(banner);
      },
      { seLlamo, patron }
    )
    .catch(() => undefined);
}
