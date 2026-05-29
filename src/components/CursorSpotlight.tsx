import { useEffect, useRef } from 'react';

export function CursorSpotlight() {
  const divRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const isTouch    = window.matchMedia('(pointer: coarse)').matches;
    const noMotion   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || noMotion) return;

    const el = divRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      const { x, y } = posRef.current;
      el.style.background = [
        `radial-gradient(520px circle at ${x}px ${y}px,`,
        `  rgba(201,164,92,0.13),`,
        `  rgba(201,164,92,0.05) 28%,`,
        `  transparent 62%`,
        `)`,
      ].join('');
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 8,
        mixBlendMode: 'screen',
        opacity: 0.85,
      }}
    />
  );
}
