import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import type { GalleryDef } from '../data/galleries';
import { galleryDefs } from '../data/galleries';
import { ArtifactIcon } from './ArtifactIcon';
import type { Lang } from '../App';
import { playSound, playHover } from '../utils/sounds';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';

const roomImages: Record<string, string> = {
  '01': img1,
  '02': img2,
  '03': img3,
  '04': img4,
  '05': img5,
};

interface MuseumDoorProps {
  gallery: GalleryDef;
  index: number;
  onEnter: () => void;
  lang: Lang;
  image?: string;
}

function MuseumDoor({ gallery, index, onEnter, lang, image }: MuseumDoorProps) {
  const [hovered, setHovered] = useState(false);
  const count = gallery.exhibitIds.length;
  const countText = lang === 'ko' ? `${count}개의 전시품` : `${count} Exhibits`;
  const enterText = lang === 'ko' ? '입장하기 →' : 'Enter →';
  const mainTitle = lang === 'ko' ? gallery.titleKo : gallery.titleEn;
  const subTitle  = lang === 'ko' ? gallery.titleEn.toUpperCase() : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
      style={{ cursor: 'pointer' }}
      onClick={onEnter}
      onMouseEnter={() => { playHover(); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Room number plate above door */}
      <div
        className="mb-3 flex items-center gap-3"
        style={{
          transition: 'opacity 0.3s',
          opacity: hovered ? 1 : 0.6,
        }}
      >
        <div style={{ width: '24px', height: '1px', background: 'rgba(201,164,92,0.4)' }} />
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.32em',
            color: '#C9A45C',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          ROOM {gallery.roomNumber}
        </span>
        <div style={{ width: '24px', height: '1px', background: 'rgba(201,164,92,0.4)' }} />
      </div>

      {/* ── DOOR ASSEMBLY ── */}
      <div
        style={{
          transform: hovered ? 'translateY(-6px) scale(1.025)' : 'translateY(0) scale(1)',
          transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Lintel */}
        <div
          style={{
            height: '14px',
            background: 'linear-gradient(to right, #1A1108, #2D1E0C, #3A280E, #2D1E0C, #1A1108)',
            boxShadow: [
              'inset 0 2px 0 rgba(201,164,92,0.2)',
              'inset 0 -1px 0 rgba(0,0,0,0.5)',
              '0 2px 8px rgba(0,0,0,0.6)',
            ].join(', '),
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              background: hovered ? 'rgba(201,164,92,0.9)' : 'rgba(201,164,92,0.35)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              transition: 'background 0.4s',
            }}
          />
        </div>

        {/* Door frame + opening */}
        <div style={{ display: 'flex', position: 'relative' }}>
          {/* Left jamb */}
          <div
            style={{
              width: '14px',
              flexShrink: 0,
              background: 'linear-gradient(to right, #1A1108, #2D1E0C)',
              boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.5), inset 2px 0 0 rgba(201,164,92,0.1)',
            }}
          />

          {/* Door opening */}
          <div
            style={{
              width: 'clamp(130px, 38vw, 180px)',
              height: 'clamp(210px, 63vw, 300px)',
              background: 'linear-gradient(180deg, #020202 0%, #040303 50%, #060504 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {image ? (
              <>
                {/* Full-bleed image */}
                <img
                  src={image}
                  alt={gallery.titleEn}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: hovered ? 'brightness(0.55)' : 'brightness(0.38) sepia(0.2)',
                    transition: 'filter 0.45s',
                  }}
                />

                {/* Hover overlay — enter hint centered */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.35s',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.3em',
                      color: '#C9A45C',
                      fontFamily: 'Inter, sans-serif',
                      textShadow: '0 0 12px rgba(201,164,92,0.8)',
                    }}
                  >
                    {enterText}
                  </span>
                </div>

                {/* Side vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.35) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </>
            ) : (
              <>
                {/* Floor glow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '70%',
                    background: hovered
                      ? 'radial-gradient(ellipse at 50% 100%, rgba(201,164,92,0.55) 0%, rgba(201,164,92,0.22) 30%, rgba(201,164,92,0.06) 60%, transparent 80%)'
                      : 'radial-gradient(ellipse at 50% 100%, rgba(201,164,92,0.18) 0%, rgba(201,164,92,0.06) 40%, transparent 70%)',
                    transition: 'background 0.5s',
                  }}
                />
                {/* Back wall ambient */}
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(ellipse, rgba(201,164,92,0.12) 0%, transparent 70%)',
                    opacity: hovered ? 1 : 0.3,
                    transition: 'opacity 0.5s',
                  }}
                />
                {/* Icon silhouette */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -58%)',
                    opacity: hovered ? 0.6 : 0.18,
                    transition: 'opacity 0.5s',
                    filter: hovered
                      ? 'drop-shadow(0 0 16px rgba(201,164,92,0.6))'
                      : 'drop-shadow(0 0 4px rgba(201,164,92,0.2))',
                  }}
                >
                  <ArtifactIcon iconType={gallery.iconType} size={40} className="text-museum-accent" />
                </div>
                {/* Enter hint */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.35s, transform 0.35s',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.3em',
                      color: '#C9A45C',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {enterText}
                  </span>
                </div>
                {/* Side vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}
          </div>

          {/* Right jamb */}
          <div
            style={{
              width: '14px',
              flexShrink: 0,
              background: 'linear-gradient(to left, #1A1108, #2D1E0C)',
              boxShadow: 'inset 3px 0 6px rgba(0,0,0,0.5), inset -2px 0 0 rgba(201,164,92,0.1)',
            }}
          />
        </div>

        {/* Threshold sill */}
        <div
          style={{
            height: '10px',
            background: 'linear-gradient(to right, #1A1108, #2D1E0C, #3A280E, #2D1E0C, #1A1108)',
            boxShadow: [
              'inset 0 -2px 0 rgba(201,164,92,0.15)',
              'inset 0 1px 0 rgba(0,0,0,0.4)',
              '0 6px 20px rgba(0,0,0,0.7)',
            ].join(', '),
          }}
        />

        {/* Frame hover glow */}
        <div
          style={{
            position: 'absolute',
            inset: '-2px',
            border: hovered ? '1px solid rgba(201,164,92,0.4)' : '1px solid rgba(201,164,92,0.1)',
            pointerEvents: 'none',
            transition: 'border-color 0.4s',
          }}
        />
      </div>

      {/* Gallery info below door */}
      <div
        className="mt-5 text-center"
        style={{
          transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        }}
      >
        <h3
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '20px',
            fontWeight: 600,
            color: hovered ? '#F4EBDD' : '#CBBBA0',
            lineHeight: 1.2,
            transition: 'color 0.3s, text-shadow 0.3s',
            textShadow: hovered ? '0 0 20px rgba(201,164,92,0.2)' : 'none',
          }}
        >
          {mainTitle}
        </h3>
        {subTitle && (
          <p
            style={{
              fontSize: '8px',
              letterSpacing: '0.22em',
              color: hovered ? '#C9A45C' : '#7E5B35',
              marginTop: '5px',
              fontFamily: 'Inter, sans-serif',
              transition: 'color 0.3s',
            }}
          >
            {subTitle}
          </p>
        )}
        <p
          style={{
            fontSize: '10px',
            color: '#7E5B35',
            marginTop: '6px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {countText}
        </p>
      </div>
    </motion.div>
  );
}

interface GalleryLobbyProps {
  onSelectGallery: (gallery: GalleryDef) => void;
  onBack: () => void;
  lang: Lang;
}

export function GalleryLobby({ onSelectGallery, onBack, lang }: GalleryLobbyProps) {
  const headerText = lang === 'ko'
    ? '어느 전시관으로 입장하시겠습니까?'
    : 'Which gallery would you like to enter?';
  const footerText = lang === 'ko'
    ? '전시관 입구를 클릭하면 해당 전시관으로 입장합니다'
    : 'Click the gallery entrance to enter';
  const backLabel = lang === 'ko' ? '처음으로' : 'Entrance';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-16"
      style={{
        background:
          'linear-gradient(to bottom, rgba(74,44,22,0.08) 0%, transparent 30%, transparent 70%, rgba(5,5,5,0.6) 100%)',
      }}
    >
      {/* Back to entrance */}
      <button
        onClick={() => { playSound('transition'); onBack(); }}
        onMouseEnter={() => playHover()}
        className="flex items-center gap-2 text-museum-text-muted hover:text-museum-accent transition-colors group"
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          fontSize: '11px',
          letterSpacing: '0.12em',
          fontFamily: 'Inter, sans-serif',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <ChevronLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform duration-200"
        />
        {backLabel}
      </button>
      {/* Lobby header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-14"
      >
        <p
          style={{
            fontSize: '9px',
            letterSpacing: '0.38em',
            color: '#7E5B35',
            marginBottom: '12px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          PROJECT MUSEUM
        </p>
        <motion.h2
          key={lang}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 48px)',
            fontWeight: 600,
            color: '#F4EBDD',
            textShadow: '0 0 60px rgba(201,164,92,0.1)',
          }}
        >
          {headerText}
        </motion.h2>
        <div
          style={{
            width: '50px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A45C, transparent)',
            margin: '16px auto 0',
          }}
        />
      </motion.div>

      {/* Door row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(10px, 3vw, 48px)',
          maxWidth: '1320px',
          width: '100%',
        }}
      >
        {galleryDefs.map((gallery, i) => (
          <MuseumDoor
            key={gallery.id}
            gallery={gallery}
            index={i}
            onEnter={() => onSelectGallery(gallery)}
            lang={lang}
            image={roomImages[gallery.roomNumber]}
          />
        ))}
      </div>

      {/* Floor line */}
      <div
        style={{
          marginTop: '60px',
          width: '100%',
          maxWidth: '900px',
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(201,164,92,0.18) 30%, rgba(201,164,92,0.18) 70%, transparent)',
        }}
      />
      <motion.p
        key={lang + '-footer'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          marginTop: '12px',
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: 'rgba(126,91,53,0.5)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {footerText}
      </motion.p>
    </div>
  );
}
