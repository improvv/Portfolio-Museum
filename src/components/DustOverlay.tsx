import { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftX: number;
  bright: boolean;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function DustOverlay() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const bright = seededRandom(i * 23 + 7) > 0.68; // ~32% bright stars
      return {
        id: i,
        left:     `${seededRandom(i * 7) * 100}%`,
        top:      `${seededRandom(i * 13 + 1) * 100}%`,
        size:     bright
          ? seededRandom(i * 3 + 2) * 3 + 3      // 3–6 px
          : seededRandom(i * 3 + 2) * 2 + 1.5,   // 1.5–3.5 px
        duration: seededRandom(i * 5 + 3) * 28 + 22,
        delay:    seededRandom(i * 11 + 4) * -35,
        opacity:  bright
          ? seededRandom(i * 17 + 5) * 0.25 + 0.75  // 0.75–1.0
          : seededRandom(i * 17 + 5) * 0.35 + 0.40, // 0.40–0.75
        driftX:   (seededRandom(i * 19 + 6) - 0.5) * 40,
        bright,
      };
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes star-rise {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0; }
          12%  { opacity: 1; }
          86%  { opacity: 1; }
          100% { transform: translate(var(--drift-x), -180px) scale(0.55); opacity: 0; }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: var(--op); filter: brightness(1); }
          45%      { opacity: calc(var(--op) * 0.45); filter: brightness(0.6); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-dust] { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1, mixBlendMode: 'screen' }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            data-dust
            style={{
              position: 'absolute',
              left: p.left,
              top:  p.top,
              width:  `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: p.bright
                ? 'radial-gradient(circle, #FFFBF0 0%, #E8C97A 55%, transparent 100%)'
                : '#C9A45C',
              boxShadow: p.bright
                ? `0 0 ${p.size * 2.5}px ${p.size * 0.8}px rgba(201,164,92,0.85),
                   0 0 ${p.size * 5}px   ${p.size * 1.5}px rgba(201,164,92,0.35)`
                : `0 0 ${p.size * 1.8}px ${p.size * 0.4}px rgba(201,164,92,0.55)`,
              '--drift-x': `${p.driftX}px`,
              '--op': p.opacity,
              animation: p.bright
                ? `star-rise ${p.duration}s ${p.delay}s infinite linear,
                   star-twinkle ${3 + (p.id % 4)}s ${p.delay * 0.3}s infinite ease-in-out`
                : `star-rise ${p.duration}s ${p.delay}s infinite linear`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
