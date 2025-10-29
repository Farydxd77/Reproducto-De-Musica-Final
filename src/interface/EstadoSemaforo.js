// Interfaz base para todos los estados del semáforo
export class EstadoSemaforo {
  constructor(semaforo) {
    this.semaforo = semaforo;
  }

  siguiente() {
    throw new Error('Este método debe ser implementado');
  }

  obtenerColor() {
    throw new Error('Este método debe ser implementado');
  }

  obtenerDuracion() {
    throw new Error('Este método debe ser implementado');
  }
}