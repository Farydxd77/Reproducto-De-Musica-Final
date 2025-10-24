import { PlayerState } from "../interface/interfave-reproducto";
import { PausedState } from "./PausedState";

// Estado: Reproduciendo
export class PlayingState extends PlayerState {
  play() {
    console.log('Ya está reproduciendo...');
  }

  pause() {
    console.log('⏸️ Pausando música...');
    this.player.changeState(new PausedState(this.player));
  }

  next() {
    console.log('⏭️ Siguiente canción...');
    this.player.nextTrack();
  }
}