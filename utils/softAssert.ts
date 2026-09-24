import type { ICustomWorld } from '../support/world';

export function registrarSiFalla(world: ICustomWorld, condicion: boolean, mensaje: string): void {
  if (!condicion) {
    world.softFailures = world.softFailures ?? [];
    world.softFailures.push(mensaje);
  }
}
