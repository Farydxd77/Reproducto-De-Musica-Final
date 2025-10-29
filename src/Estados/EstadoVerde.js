import { EstadoSemaforo } from "../interface/EstadoSemaforo";
import { EstadoRojo } from "./EstadoRojo";


export class EstadoVerde extends EstadoSemaforo {
  siguiente() {
    console.log('Verde → Rojo');
    this.semaforo.cambiarEstado(new EstadoRojo(this.semaforo));
  }

  obtenerColor() {
    return 'verde';
  }

  obtenerDuracion() {
    return 3000; // 3 segundos
  }
}