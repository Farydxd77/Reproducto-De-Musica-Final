import { EstadoSemaforo } from "../interface/EstadoSemaforo";
import { EstadoVerde } from "./EstadoVerde";

export class EstadoAmarillo extends EstadoSemaforo {
  siguiente() {
    console.log('Amarillo → Verde');
    this.semaforo.cambiarEstado(new EstadoVerde(this.semaforo));
  }

  obtenerColor() {
    return 'amarillo';
  }

  obtenerDuracion() {
    return 3000; // 3 segundos
  }
}