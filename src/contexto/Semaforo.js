import { EstadoRojo } from "../Estados/EstadoRojo";



export class Semaforo {
  constructor() {
    this.estado = new EstadoRojo(this);
    this.alCambiarEstado = null;
    this.temporizador = null;
    this.esModoAutomatico = true;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
    if (this.alCambiarEstado) {
      this.alCambiarEstado();
    }
    
    // Programar siguiente cambio automático
    if (this.esModoAutomatico) {
      this.programarSiguienteCambio();
    }
  }

  programarSiguienteCambio() {
    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
    
    const duracion = this.estado.obtenerDuracion();
    this.temporizador = setTimeout(() => {
      this.siguiente();
    }, duracion);
  }

  siguiente() {
    this.estado.siguiente();
  }

  obtenerColorActual() {
    return this.estado.obtenerColor();
  }

  iniciarAutomatico() {
    this.esModoAutomatico = true;
    this.programarSiguienteCambio();
  }

  detenerAutomatico() {
    this.esModoAutomatico = false;
    if (this.temporizador) {
      clearTimeout(this.temporizador);
      this.temporizador = null;
    }
  }

  destruir() {
    this.detenerAutomatico();
  }
}