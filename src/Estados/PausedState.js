import { PlayerState } from "../interface/interfave-reproducto";
import { PlayingState } from "./PlayingState";

// Estado: Pausado
export class PausedState extends PlayerState {
  play() {
    console.log('▶️ Reanudando música...');
    this.player.changeState(new PlayingState(this.player));
  }

  pause() {
    console.log('Ya está en pausa...');
  }

  next() {
    console.log('⏭️ Siguiente canción...');
    this.player.nextTrack();
    this.player.changeState(new PlayingState(this.player));
  }
}