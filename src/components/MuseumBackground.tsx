import type { ReactNode } from 'react';

interface MuseumBackgroundProps {
  children: ReactNode;
}

export function MuseumBackground({ children }: MuseumBackgroundProps) {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Base atmospheric layer — warm deep-brown center glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse at 50% 20%, rgba(74,44,22,0.45) 0%, transparent 55%)',
            'radial-gradient(ellipse at 15% 60%, rgba(42,18,10,0.25) 0%, transparent 40%)',
            'radial-gradient(ellipse at 85% 60%, rgba(42,18,10,0.25) 0%, transparent 40%)',
            'radial-gradient(ellipse at 50% 100%, rgba(11,9,7,0.9) 0%, transparent 50%)',
          ].join(', '),
          zIndex: 0,
        }}
      />

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.82) 100%)',
          zIndex: 1,
        }}
      />

      {/* Subtle top light — like a skylight */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60vw',
          height: '30vh',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,164,92,0.07) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
