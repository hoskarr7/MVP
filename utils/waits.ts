import type { Page } from 'playwright';

export async function esperarFinDeCarga(page: Page, timeout?: number): Promise<void> {
  await page.waitForFunction(
    () => !document.querySelector('#formularioprincipal')?.classList.contains('sk-loading'),
    undefined,
    { timeout }
  );
}

export async function esperarAngularEstable(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const win = window as unknown as { angular?: any };
    if (!win.angular) {
      return true;
    }
    try {
      const root = document.getElementById('wrapper');
      if (!root) {
        return true;
      }
      const injector = win.angular.element(root).injector();
      const http = injector.get('$http');
      return http.pendingRequests.length === 0;
    } catch {
      return true;
    }
  });
}
