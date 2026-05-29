import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Exhibit } from '../types/exhibit';
import type { Lang } from '../App';
import { ExhibitArtifact } from './ExhibitArtifact';
import { playSound, playHover } from '../utils/sounds';

interface ExhibitCarouselProps {
  exhibits: Exhibit[];
  onSelectExhibit: (exhibit: Exhibit) => void;
  lang: Lang;
  detailOpen?: boolean;
  onBackgroundClick?: () => void;
}

// Visual parameters per distance from center
function getVisual(position: number) {
  const abs = Math.abs(position);
  if (abs === 0) return { scale: 1.20, opacity: 1,    brightness: 1.06, blur: 0,   zIndex: 30, y: 0  };
  if (abs === 1) return { scale: 0.82, opacity: 0.55, brightness: 0.52, blur: 1.2, zIndex: 20, y: 8  };
  if (abs === 2) return { scale: 0.65, opacity: 0.30, brightness: 0.30, blur: 2.5, zIndex: 10, y: 14 };
  return               { scale: 0.52, opacity: 0,    brightness: 0.18, blur: 3.5, zIndex: 1,  y: 20 };
}

function getSpacing(): number {
  if (typeof window === 'undefined') return 230;
  if (window.innerWidth < 640)  return 130;
  if (window.innerWidth < 1024) return 180;
  return 230;
}

const EDGE_ZONE      = 0.14;  // 14% screen width
const EDGE_SPEED     = 1.0;
const EDGE_THRESHOLD = 124;   // ~2 s at 60 fps
const DRAG_THRESHOLD = 55;

export function ExhibitCarousel({ exhibits, onSelectExhibit, lang, detailOpen = false, onBackgroundClick }: ExhibitCarouselProps) {
  const [centerIndex, setCenterIndex]   = useState(0);
  const [spacing, setSpacing]           = useState(getSpacing);
  const containerRef                    = useRef<HTMLDivElement>(null);

  // Edge-hover RAF
  const edgeRef   = useRef<{ dir: -1 | 0 | 1; acc: number }>({ dir: 0, acc: 0 });
  const rafRef    = useRef<number>(0);

  // Wheel throttle
  const wheelLock = useRef(false);

  // Drag
  const dragStartX = useRef(0);
  const dragging   = useRef(false);

  // Keep length in ref so event handlers don't need to re-register
  const lenRef = useRef(exhibits.length);
  lenRef.current = exhibits.length;

  // Refs for stable access inside effects
  const detailOpenRef      = useRef(detailOpen);
  const onSelectExhibitRef = useRef(onSelectExhibit);
  const exhibitsRef        = useRef(exhibits);
  useEffect(() => {
    detailOpenRef.current      = detailOpen;
    onSelectExhibitRef.current = onSelectExhibit;
    exhibitsRef.current        = exhibits;
  });

  // Sync detail panel when navigating in detail mode
  useEffect(() => {
    if (!detailOpenRef.current) return;
    const exhibit = exhibitsRef.current[centerIndex];
    if (exhibit) onSelectExhibitRef.current(exhibit);
  }, [centerIndex]);

  // ── Navigation helpers ──────────────────────────────────────
  const goNext = useCallback(() => {
    playSound('click');
    setCenterIndex(prev => (prev + 1) % lenRef.current);
  }, []);

  const goPrev = useCallback(() => {
    playSound('click');
    setCenterIndex(prev => (prev - 1 + lenRef.current) % lenRef.current);
  }, []);

  // ── Responsive spacing ──────────────────────────────────────
  useEffect(() => {
    const handler = () => setSpacing(getSpacing());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // ── Edge-hover RAF loop ─────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const { dir } = edgeRef.current;
      if (dir !== 0) {
        edgeRef.current.acc += EDGE_SPEED;
        if (edgeRef.current.acc >= EDGE_THRESHOLD) {
          edgeRef.current.acc = 0;
          if (dir === 1) goNext(); else goPrev();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [goNext, goPrev]);

  // ── Wheel — attached via useEffect so we can pass passive:false ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLock.current) return;

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 20) return;

      if (delta > 0) goNext(); else goPrev();

      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 620);
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [goNext, goPrev]);

  // ── Edge-hover mouse detection ──────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    const w = window.innerWidth;
    if (x < w * EDGE_ZONE) {
      edgeRef.current.dir = -1;
    } else if (x > w * (1 - EDGE_ZONE)) {
      edgeRef.current.dir = 1;
    } else {
      edgeRef.current.dir = 0;
      edgeRef.current.acc = 0;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    edgeRef.current.dir = 0;
    edgeRef.current.acc = 0;
  }, []);

  // ── Drag ────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const delta = e.clientX - dragStartX.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        if (delta < 0) goNext(); else goPrev();
      }
    },
    [goNext, goPrev]
  );

  // ── Touch ───────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.changedTouches[0].clientX - dragStartX.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        if (delta < 0) goNext(); else goPrev();
      }
    },
    [goNext, goPrev]
  );

  // ── Item click ──────────────────────────────────────────────
  const handleItemClick = useCallback(
    (exhibit: Exhibit, i: number) => {
      if (i === centerIndex) {
        playSound('panel-open');
        onSelectExhibit(exhibit);
      } else {
        setCenterIndex(i);
      }
    },
    [centerIndex, onSelectExhibit]
  );

  const centerExhibit = exhibits[centerIndex];

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ━━ STAGE ZONE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          flex: 1,
          minHeight: '460px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onBackgroundClick?.();
        }}
      >
        {/* Floor ambient glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50vw',
            height: '50px',
            background:
              'radial-gradient(ellipse, rgba(201,164,92,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Left arrow */}
        <button
          onClick={goPrev}
          style={{
            position: 'absolute',
            left: 'clamp(12px, 3vw, 40px)',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            border: '1px solid rgba(201,164,92,0.35)',
            background: 'rgba(8,7,6,0.7)',
            color: '#C9A45C',
            cursor: 'pointer',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            playHover();
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.7)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,164,92,0.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.35)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(8,7,6,0.7)';
          }}
          aria-label="이전 전시품"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Carousel track — absolutely centered items */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {exhibits.map((exhibit, i) => {
            const n   = exhibits.length;
            const raw = ((i - centerIndex) % n + n) % n;
            const position = raw > n / 2 ? raw - n : raw;
            const abs = Math.abs(position);
            if (abs > 3) return null;

            const { scale, opacity, brightness, blur, zIndex, y } = getVisual(position);

            return (
              <motion.div
                key={exhibit.id}
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  zIndex,
                }}
                animate={{
                  x: position * spacing,
                  y,
                  scale,
                  opacity,
                  filter: `brightness(${brightness}) blur(${blur}px)`,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 28 }}
                onClick={() => handleItemClick(exhibit, i)}
              >
                <ExhibitArtifact
                  exhibit={exhibit}
                  index={i}
                  isCenter={i === centerIndex}
                  lang={lang}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          style={{
            position: 'absolute',
            right: 'clamp(12px, 3vw, 40px)',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            border: '1px solid rgba(201,164,92,0.35)',
            background: 'rgba(8,7,6,0.7)',
            color: '#C9A45C',
            cursor: 'pointer',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            playHover();
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.7)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,164,92,0.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.35)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(8,7,6,0.7)';
          }}
          aria-label="다음 전시품"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ━━ EXHIBIT INFO ZONE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '20px',
          paddingBottom: '4px',
          paddingLeft: '16px',
          paddingRight: '16px',
          pointerEvents: 'none',
          borderTop: '1px solid rgba(201,164,92,0.07)',
        }}
      >
        {centerExhibit && (
          <motion.div
            key={centerExhibit.id + lang}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            style={{ textAlign: 'center' }}
          >
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(22px, 4vw, 32px)',
                fontWeight: 600,
                color: '#F4EBDD',
                lineHeight: 1.1,
                textShadow: '0 0 30px rgba(201,164,92,0.15)',
              }}
            >
              {lang === 'en' ? (centerExhibit.titleEn ?? centerExhibit.title) : centerExhibit.title}
            </h2>
            <p
              style={{
                fontSize: '13px',
                color: '#CBBBA0',
                marginTop: '5px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {centerExhibit.subtitle}
            </p>
            {centerExhibit.period && (
              <p
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: '#7E5B35',
                  marginTop: '4px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {centerExhibit.period}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* ━━ NAVIGATION ZONE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          paddingBottom: '12px',
        }}
      >
        {/* View Details button — hidden in detail mode */}
        {!detailOpen && (
          <button
            onClick={() => { if (centerExhibit) { playSound('panel-open'); onSelectExhibit(centerExhibit); } }}
            style={{
              padding: '9px 34px',
              border: '1px solid rgba(201,164,92,0.38)',
              fontSize: '10px',
              letterSpacing: '0.24em',
              color: '#C9A45C',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'background 0.25s, border-color 0.25s',
            }}
            onMouseEnter={e => {
              playHover();
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,164,92,0.1)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.65)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.38)';
            }}
          >
            {lang === 'ko' ? '전시 설명 보기' : 'View Details'}
          </button>
        )}

        {/* Pagination dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {exhibits.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenterIndex(i)}
              style={{
                borderRadius: '9999px',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s',
                width: i === centerIndex ? '22px' : '6px',
                height: '6px',
                background:
                  i === centerIndex
                    ? '#C9A45C'
                    : 'rgba(201,164,92,0.2)',
                flexShrink: 0,
              }}
              aria-label={`전시품 ${i + 1}`}
            />
          ))}
        </div>

        {/* Hint text — hidden in detail mode */}
        {!detailOpen && (
          <p
            style={{
              fontSize: '9px',
              letterSpacing: '0.18em',
              color: 'rgba(126,91,53,0.5)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {lang === 'ko' ? '← 드래그 · 휠 · 화면 가장자리 →' : '← Drag · Scroll · Edge Hover →'}
          </p>
        )}
      </div>
    </div>
  );
}
