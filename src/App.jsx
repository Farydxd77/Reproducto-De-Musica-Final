import React, { useState } from 'react';
import './index.css'
import { MusicPlayer } from './contexto/MusicPlayer';
// ============================================
// PATRÓN STATE: Estados del Reproductor
// ============================================



// ============================================
// COMPONENTE REACT
// ============================================

const MusicPlayerApp = () => {
  const [player] = useState(() => new MusicPlayer());
  const [, forceUpdate] = useState();
  
  const refresh = () => forceUpdate({});

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

  const currentTrack = player.getCurrentTrack();
  const stateName = player.getStateName();
  const isPlaying = player.isPlaying();
  const isMuted = player.isMuted();

  return (
    <div className="app-container">
      {/* <style>{`
        .app-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #581c87, #1e3a8a, #312e81);
          padding: 1rem;
        }

        .player-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          padding: 2rem;
          width: 100%;
          max-width: 28rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin: 0 auto;
        }

        .state-badge-container {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .state-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
        }

        .state-badge.playing {
          background: #22c55e;
        }

        .state-badge.paused {
          background: #6b7280;
        }

        .track-info {
          text-align: center;
          margin-bottom: 2rem;
        }

        .album-art {
          width: 12rem;
          height: 12rem;
          margin: 0 auto 1.5rem;
          border-radius: 1rem;
          background: linear-gradient(to bottom right, #ec4899, #a855f7);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .album-art svg {
          width: 6rem;
          height: 6rem;
          color: white;
        }

        .track-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }

        .track-artist {
          color: #ddd6fe;
          font-size: 1.125rem;
        }

        .track-duration {
          color: #c4b5fd;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .progress-bar-container {
          margin-bottom: 2rem;
        }

        .progress-bar-track {
          height: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(to right, #ec4899, #a855f7);
          transition: all 1s;
        }

        .controls-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .btn {
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          font-size: 1.5rem;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .btn-primary {
          padding: 1.25rem;
          background: linear-gradient(to right, #ec4899, #a855f7);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          font-size: 2rem;
        }

        .btn-primary:hover {
          background: linear-gradient(to right, #db2777, #9333ea);
          transform: scale(1.1);
        }

        .pattern-explanation {
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 0.75rem;
        }

        .pattern-title {
          color: white;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .pattern-list {
          color: #ddd6fe;
          font-size: 0.75rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pattern-list li {
          margin-bottom: 0.25rem;
        }
      `}</style> */}
      
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

        {/* Barra de progreso simulada */}
        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill"
              style={{ width: isPlaying ? '33%' : '0%' }}
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

        {/* Explicación del patrón */}
        {/* <div className="pattern-explanation">
          <h3 className="pattern-title">
            🎯 Patrón State en acción:
          </h3>
          <ul className="pattern-list">
            <li>• Cada estado (Playing, Paused, Stopped, Muted) tiene su propio comportamiento</li>
            <li>• El reproductor delega las acciones al estado actual</li>
            <li>• Los estados se cambian dinámicamente según las acciones</li>
            <li>• Código limpio y fácil de mantener 🚀</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default MusicPlayerApp;