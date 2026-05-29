import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { playHover } from '../utils/sounds';
import { ChevronLeft } from 'lucide-react';
import type { GalleryDef } from '../data/galleries';
import type { Exhibit } from '../types/exhibit';
import type { Lang } from '../App';
import { exhibits } from '../data/exhibits';
import { ExhibitCarousel } from './ExhibitCarousel';
import { ExhibitPanel } from './ExhibitPanel';
import { ArtifactIcon } from './ArtifactIcon';

interface ExhibitionRoomProps {
  gallery: GalleryDef;
  onBack: () => void;
  onSelectExhibit: (exhibit: Exhibit) => void;
  lang: Lang;
  detailOpen?: boolean;
  selectedExhibit?: Exhibit | null;
  selectedExhibitIndex?: number;
  onClosePanel?: () => void;
}

export function ExhibitionRoom({
  gallery,
  onBack,
  onSelectExhibit,
  lang,
  detailOpen = false,
  selectedExhibit = null,
  selectedExhibitIndex = 0,
  onClosePanel = () => {},
}: ExhibitionRoomProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const galleryExhibits = gallery.exhibitIds
    .map((id) => exhibits.find((e) => e.id === id))
    .filter((e): e is Exhibit => !!e);

  const backLabel    = lang === 'ko' ? '전시관 로비' : 'Gallery Lobby';
  const emptyLabel   = lang === 'ko' ? '준비 중입니다.' : 'Coming soon.';
  const roomTitle    = lang === 'ko' ? gallery.titleKo : gallery.titleEn;
  const exhibitCount = lang === 'ko'
    ? `${galleryExhibits.length}개의 전시품`
    : `${galleryExhibits.length} Exhibits`;

  const showRightPanel = !isMobile && detailOpen;

  return (
    <motion.div
      key={gallery.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Room header (full width) ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 48px',
          flexShrink: 0,
          borderBottom: '1px solid rgba(201,164,92,0.1)',
          background: 'rgba(5,5,5,0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 50,
          position: 'relative',
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: '#7E5B35',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { playHover(); (e.currentTarget as HTMLButtonElement).style.color = '#C9A45C'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#7E5B35'; }}
        >
          <ChevronLeft size={16} />
          {backLabel}
        </button>

        {/* Room title (center) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <ArtifactIcon iconType={gallery.iconType} size={16} className="text-museum-accent-dim" />
          <div style={{ textAlign: 'center' }}>
            <motion.p
              key={lang + '-room-title'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1,
                color: '#F4EBDD',
              }}
            >
              {roomTitle}
            </motion.p>
            <p
              style={{
                fontSize: '8px',
                letterSpacing: '0.2em',
                color: '#7E5B35',
                fontFamily: 'Inter, sans-serif',
                marginTop: '2px',
              }}
            >
              ROOM {gallery.roomNumber}
            </p>
          </div>
        </div>

        {/* Item count */}
        <p style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#7E5B35', fontFamily: 'Inter, sans-serif' }}>
          {exhibitCount}
        </p>
      </div>

      {/* One-time light sweep on room entry */}
      {!shouldReduceMotion && (
        <motion.div
          key={gallery.id + '-sweep'}
          initial={{ x: '-110%' }}
          animate={{ x: '210%' }}
          transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 3,
            background: [
              'linear-gradient(115deg,',
              '  transparent 0%,',
              '  rgba(201,164,92,0.04) 42%,',
              '  rgba(255,236,188,0.06) 50%,',
              '  rgba(201,164,92,0.03) 58%,',
              '  transparent 100%)',
            ].join(''),
            willChange: 'transform',
          }}
        />
      )}

      {/* ── Content area — flex row ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* Left column — carousel */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden', minWidth: 0 }}>
          {galleryExhibits.length > 0 ? (
            <ExhibitCarousel
              exhibits={galleryExhibits}
              onSelectExhibit={onSelectExhibit}
              lang={lang}
              detailOpen={detailOpen}
              onBackgroundClick={detailOpen ? onClosePanel : undefined}
            />
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '13px', color: '#7E5B35', fontFamily: 'Inter, sans-serif' }}>{emptyLabel}</p>
            </div>
          )}
        </div>

        {/* Right column — detail panel (desktop only, grows from 0 to 50vw) */}
        <motion.div
          animate={{ width: showRightPanel ? '50vw' : '0px' }}
          initial={{ width: '0px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden', flexShrink: 0, height: '100%' }}
        >
          <AnimatePresence>
            {selectedExhibit && !isMobile && (
              <ExhibitPanel
                key="desktop-panel"
                exhibit={selectedExhibit}
                index={selectedExhibitIndex}
                onClose={onClosePanel}
                lang={lang}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile panel — position:fixed bottom sheet, rendered outside flex row */}
      <AnimatePresence>
        {selectedExhibit && isMobile && (
          <ExhibitPanel
            key={selectedExhibit.id + '-m'}
            exhibit={selectedExhibit}
            index={selectedExhibitIndex}
            onClose={onClosePanel}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
