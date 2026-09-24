import type { Page, Response } from 'playwright';

export class ApiCallRecorder {
  private readonly llamadosRegistrados: string[] = [];
  private readonly listener: (response: Response) => void;

  constructor(private readonly page: Page, private readonly patron: string) {
    this.listener = (response) => {
      if (response.url().includes(this.patron)) {
        this.llamadosRegistrados.push(response.url());
      }
    };
    this.page.on('response', this.listener);
  }

  detener(): void {
    this.page.off('response', this.listener);
  }

  obtenerLlamados(): string[] {
    return this.llamadosRegistrados;
  }

  obtenerParametro(nombre: string): string | null {
    for (const url of this.llamadosRegistrados) {
      const valor = new URL(url).searchParams.get(nombre);
      if (valor) {
        return valor;
      }
    }
    return null;
  }
}
