import React, { useState, useRef, useEffect } from 'react';
import './index.css'
import { MusicPlayer } from './contexto/MusicPlayer';

const MusicPlayerApp = () => {
  const [player] = useState(() => new MusicPlayer());
  const [, forceUpdate] = useState();
  const audioRef = useRef(null);  
  const [progress, setProgress] = useState(0);  
  
  const refresh = () => forceUpdate({});

  const currentTrack = player.getCurrentTrack();
  const stateName = player.getStateName();
  const isPlaying = player.isPlaying();
  const isMuted = player.isMuted();

  //  Sincronizar audio con el estado del reproductor
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => console.log('Error reproduciendo:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  //  Actualizar cuando cambia la canción
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();
    
    if (isPlaying) {
      audio.play().catch(err => console.log('Error reproduciendo:', err));
    }
  }, [currentTrack.src]);

  //  Manejar mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  //  Actualizar barra de progreso
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      player.next();
      refresh();
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const handlePlay = () => {
    player.play();
    refresh();
  };

  const handlePause = () => {
    player.pause();
    refresh();
  };

  const handleNext = () => {
    player.next();
    refresh();
  };

  const handleMute = () => {
    player.toggleMute();
    refresh();
  };

  return (
    <div className="app-container">
      {/* 🎵 AUDIO ELEMENT - ESTO ES LO QUE FALTABA */}
      <audio ref={audioRef} />
      
      <div className="player-card">
        
        {/* Estado actual */}
        <div className="state-badge-container">
          <span className={`state-badge ${isPlaying ? 'playing' : 'paused'}`}>
            {stateName}
          </span>
        </div>

        {/* Información de la canción */}
        <div className="track-info">
          <div className="album-art">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <h2 className="track-title">{currentTrack.title}</h2>
          <p className="track-artist">{currentTrack.artist}</p>
          <p className="track-duration">{currentTrack.duration}</p>
        </div>

        {/* Barra de progreso REAL */}
        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controles */}
        <div className="controls-container">
          <button
            onClick={handleMute}
            className="btn btn-secondary"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="btn btn-primary"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <button
            onClick={handleNext}
            className="btn btn-secondary"
            title="Siguiente"
          >
            ⏭️
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerApp;