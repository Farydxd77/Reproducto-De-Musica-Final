import { useEffect, useState } from "react";
import { Semaforo } from "./contexto/Semaforo";

export function AplicacionSemaforo() {
  const [semaforo] = useState(() => new Semaforo());
  const [, forzarActualizacion] = useState();
  const [esAutomatico, setEsAutomatico] = useState(true);
  

  useEffect(() => {
    semaforo.alCambiarEstado = () => forzarActualizacion({});
    semaforo.iniciarAutomatico();
    
    return () => {
      semaforo.destruir();
    };
  }, [semaforo]);

  const colorActual = semaforo.obtenerColorActual();

  const manejarCambioModo = () => {
    if (esAutomatico) {
      semaforo.detenerAutomatico();
      setEsAutomatico(false);
    } else {
      semaforo.iniciarAutomatico();
      setEsAutomatico(true);
    }
  };

  const manejarSiguienteManual = () => {
    if (!esAutomatico) {
      semaforo.siguiente();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '2rem'
    }}>
      {/* Título */}
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        🚦 Semáforo Inteligente
      </h1>
      <p style={{
        color: '#94a3b8',
        marginBottom: '3rem',
        fontSize: '1.125rem'
      }}>
        Patrón State en Acción
      </p>

      {/* Semáforo */}
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '3rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '4px solid #334155'
        }}>
          {/* Luz Roja */}
          <div style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            marginBottom: '2rem',
            background: colorActual === 'rojo' ? '#ef4444' : '#450a0a',
            boxShadow: colorActual === 'rojo' 
              ? '0 0 60px 20px rgba(239, 68, 68, 0.8)' 
              : 'none',
            transition: 'all 0.5s'
          }} />
          
          {/* Luz Amarilla */}
          <div style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            marginBottom: '2rem',
            background: colorActual === 'amarillo' ? '#facc15' : '#713f12',
            boxShadow: colorActual === 'amarillo' 
              ? '0 0 60px 20px rgba(250, 204, 21, 0.8)' 
              : 'none',
            transition: 'all 0.5s'
          }} />
          
          {/* Luz Verde */}
          <div style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: colorActual === 'verde' ? '#22c55e' : '#052e16',
            boxShadow: colorActual === 'verde' 
              ? '0 0 60px 20px rgba(34, 197, 94, 0.8)' 
              : 'none',
            transition: 'all 0.5s'
          }} />
        </div>
      </div>

      {/* Estado actual */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: 'rgba(30, 41, 59, 0.8)',
          borderRadius: '0.75rem',
          border: '1px solid #334155'
        }}>
          <span style={{ color: '#94a3b8', marginRight: '0.5rem' }}>Estado:</span>
          <span style={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            color: colorActual === 'rojo' ? '#f87171' :
                   colorActual === 'amarillo' ? '#fde047' :
                   '#4ade80'
          }}>
            {colorActual === 'rojo' ? '🔴 DETENTE' :
             colorActual === 'amarillo' ? '🟡 PRECAUCIÓN' :
             '🟢 AVANZA'}
          </span>
        </div>
      </div>

      {/* Controles */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={manejarCambioModo}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontWeight: '600',
            background: esAutomatico ? '#16a34a' : '#475569',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s'
          }}
        >
          {esAutomatico ? '⏸️ Automático' : '▶️ Manual'}
        </button>

        <button
          onClick={manejarSiguienteManual}
          disabled={esAutomatico}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontWeight: '600',
            background: esAutomatico ? '#1e293b' : '#2563eb',
            color: esAutomatico ? '#64748b' : 'white',
            border: 'none',
            cursor: esAutomatico ? 'not-allowed' : 'pointer',
            opacity: esAutomatico ? 0.5 : 1,
            boxShadow: esAutomatico ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s'
          }}
        >
          ⏭️ Siguiente
        </button>
      </div>
    </div>
  );
}
;