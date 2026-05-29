import { useState, useEffect } from 'react';
import { initSounds, playSound, playHover } from './utils/sounds';
import { AnimatePresence, motion } from 'framer-motion';

import type { Exhibit } from './types/exhibit';
import type { GalleryDef } from './data/galleries';

import { MuseumBackground } from './components/MuseumBackground';
import { DustOverlay } from './components/DustOverlay';
import { CursorSpotlight } from './components/CursorSpotlight';
import { MuseumEntrance } from './components/MuseumEntrance';
import { GalleryLobby } from './components/GalleryLobby';
import { ExhibitionRoom } from './components/ExhibitionRoom';
import { AboutPage } from './pages/AboutPage';

export type Lang = 'ko' | 'en';

type View = 'entrance' | 'lobby' | 'exhibition' | 'about';

function getExhibitIndex(exhibit: Exhibit, galleryExhibitIds: string[]): number {
  return galleryExhibitIds.indexOf(exhibit.id);
}

export default function App() {
  const [view, setView]                   = useState<View>('entrance');
  const [activeGallery, setActiveGallery] = useState<GalleryDef | null>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [lang, setLang]                   = useState<Lang>('ko');

  useEffect(() => { initSounds(); }, []);

  const handleSelectGallery = (gallery: GalleryDef) => {
    playSound('transition');
    setActiveGallery(gallery);
    setView('exhibition');
  };

  const handleBack = () => {
    playSound('transition');
    setView('lobby');
    setSelectedExhibit(null);
  };

  const selectedExhibitIndex = selectedExhibit && activeGallery
    ? getExhibitIndex(selectedExhibit, activeGallery.exhibitIds)
    : 0;

  return (
    <MuseumBackground>
      <DustOverlay />
      <CursorSpotlight />

      {/* ── Language Toggle — hidden when detail panel is open ── */}
      {!selectedExhibit && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 300,
            display: 'flex',
            border: '1px solid rgba(201,164,92,0.28)',
            background: 'rgba(8,7,6,0.75)',
            backdropFilter: 'blur(4px)',
            padding: '3px',
          }}
        >
          {(['ko', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => { playSound('click'); setLang(l); }}
              onMouseEnter={() => playHover()}
              style={{
                padding: '4px 14px',
                fontSize: '9px',
                letterSpacing: '0.18em',
                cursor: 'pointer',
                border: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'background 0.2s, color 0.2s',
                background: lang === l ? 'rgba(201,164,92,0.2)' : 'transparent',
                color: lang === l ? '#C9A45C' : '#7E5B35',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {view === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AboutPage onBack={() => setView('entrance')} lang={lang} />
          </motion.div>
        )}

        {view === 'entrance' && (
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MuseumEntrance onEnter={() => setView('lobby')} onShowAbout={() => setView('about')} lang={lang} />
          </motion.div>
        )}

        {view === 'lobby' && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GalleryLobby onSelectGallery={handleSelectGallery} onBack={() => setView('entrance')} lang={lang} />
          </motion.div>
        )}

        {view === 'exhibition' && activeGallery && (
          <motion.div
            key={`exhibition-${activeGallery.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ExhibitionRoom
              gallery={activeGallery}
              onBack={handleBack}
              onSelectExhibit={setSelectedExhibit}
              lang={lang}
              detailOpen={!!selectedExhibit}
              selectedExhibit={selectedExhibit}
              selectedExhibitIndex={selectedExhibitIndex}
              onClosePanel={() => setSelectedExhibit(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </MuseumBackground>
  );
}
