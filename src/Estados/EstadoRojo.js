import { EstadoSemaforo } from "../interface/EstadoSemaforo";
import { EstadoAmarillo } from "./EstadoAmarillo";



export class EstadoRojo extends EstadoSemaforo {
  siguiente() {
    console.log('Rojo → Amarillo');
    this.semaforo.cambiarEstado(new EstadoAmarillo(this.semaforo));
  }

  obtenerColor() {
    return 'rojo';
  }

  obtenerDuracion() {
    return 3000; // 3 segundos
  }
}