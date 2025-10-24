// Interfaz base para todos los estados
export class PlayerState {
  constructor(player) {
    this.player = player;
  }

  play() {
    throw new Error('Este método debe ser implementado');
  }

  pause() {
    throw new Error('Este método debe ser implementado');
  }

  next() {
    throw new Error('Este método debe ser implementado');
  }
}