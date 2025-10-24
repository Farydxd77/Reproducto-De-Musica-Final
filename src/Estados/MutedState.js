import { PlayerState } from "../interface/interfave-reproducto";

// Estado: Silenciado
export class MutedState extends PlayerState {
  play() {
    this.player.previousState.play();
  }

  pause() {
    this.player.previousState.pause();
  }

  next() {
    this.player.previousState.next();
  }

  unmute() {
    console.log('🔊 Restaurando volumen...');
    this.player.changeState(this.player.previousState);
  }
}
