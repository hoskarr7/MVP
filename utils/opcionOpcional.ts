export const NINGUNO = 'Ninguno';

export function esNinguno(valor: string): boolean {
  return valor.trim().toLowerCase() === NINGUNO.toLowerCase();
}
