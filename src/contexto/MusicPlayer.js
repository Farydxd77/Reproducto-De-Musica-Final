import { MutedState } from "../Estados/MutedState";
import { PausedState } from "../Estados/PausedState";
import { PlayingState } from "../Estados/PlayingState";
import { StoppedState } from "../Estados/StoppedState";

export class MusicPlayer {
  constructor() {
    this.state = new StoppedState(this);
    this.previousState = null;
    this.currentTrackIndex = 0;
     this.tracks = [
      { 
        title: 'Le Gustan Los Flaites', 
        artist: 'Artista', 
        duration: '3:45',
        src: new URL('../assets/LeGustanLosFlaites.mp3', import.meta.url).href
      },
      { 
        title: 'Never Say Never', 
        artist: 'ft. Jaden', 
        duration: '4:12',
        src: new URL('../assets/NeverSayNeverft.Jaden.mp3', import.meta.url).href
      }
    ];
  }

  changeState(newState) {
    if (!(newState instanceof MutedState)) {
      this.previousState = this.state;
    }
    this.state = newState;
  }

  play() {
    this.state.play();
  }

  pause() {
    this.state.pause();
  }

  next() {
    this.state.next();
  }

  toggleMute() {
    if (this.state instanceof MutedState) {
      this.state.unmute();
    } else {
      console.log('🔇 Silenciando...');
      this.changeState(new MutedState(this));
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  getStateName() {
    if (this.state instanceof PlayingState) return 'Reproduciendo';
    if (this.state instanceof PausedState) return 'Pausado';
    if (this.state instanceof StoppedState) return 'Detenido';
    if (this.state instanceof MutedState) return 'Silenciado';
    return 'Desconocido';
  }

  isPlaying() {
    return this.state instanceof PlayingState;
  }

  isMuted() {
    return this.state instanceof MutedState;
  }
}