import { PlayerState } from "../interface/interfave-reproducto";
import { PlayingState } from "./PlayingState";

// Estado: Detenido
export  class StoppedState extends PlayerState {
  play() {
    console.log('▶️ Iniciando reproducción...');
    this.player.changeState(new PlayingState(this.player));
  }

  pause() {
    console.log('No hay nada que pausar, está detenido');
  }

  next() {
    console.log('⏭️ Siguiente canción (sin reproducir)');
    this.player.nextTrack();
  }
}