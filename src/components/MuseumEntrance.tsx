import { motion } from 'framer-motion';
import type { Lang } from '../App';
import { playSound, playHover } from '../utils/sounds';

interface MuseumEntranceProps {
  onEnter: () => void;
  onShowAbout: () => void;
  lang: Lang;
}

const ui = {
  ko: {
    title: (
      <>
        Project Museum에<br />
        <span style={{ color: '#C9A45C' }}>오신 걸 환영합니다</span>
      </>
    ),
    subtitle: '제가 만든 프로젝트와 경험을 하나의 전시처럼 둘러볼 수 있는 디지털 포트폴리오입니다.',
    cta: '전시 둘러보기',
    hint: '5개의 전시관 · 27개의 전시품',
    artistBtn: '작가 소개',
    artistSub: 'Curator Profile',
  },
  en: {
    title: (
      <>
        Welcome to<br />
        <span style={{ color: '#C9A45C' }}>Project Museum</span>
      </>
    ),
    subtitle: 'A digital portfolio where you can explore my projects and experiences like a museum exhibition.',
    cta: 'Enter Exhibition',
    hint: '5 Galleries · 27 Exhibits',
    artistBtn: 'About the Artist',
    artistSub: 'Curator Profile',
  },
} as const;

export function MuseumEntrance({ onEnter, onShowAbout, lang }: MuseumEntranceProps) {
  const t = ui[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative">
      {/* Entrance arch light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 'min(500px, 90vw)',
          height: '280px',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,164,92,0.14) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        {/* Pre-label */}
        <p
          className="text-museum-accent-dim mb-8 tracking-widest"
          style={{ fontSize: '10px', letterSpacing: '0.38em' }}
        >
          WELCOME TO
        </p>

        {/* Main title */}
        <motion.h1
          key={lang}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="font-editorial text-museum-text-primary"
          style={{
            fontSize: 'clamp(38px, 9vw, 88px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            textShadow: '0 0 80px rgba(201,164,92,0.18), 0 2px 40px rgba(0,0,0,0.6)',
          }}
        >
          {t.title}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="my-8"
          style={{
            width: '72px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A45C, transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          key={lang + '-sub'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="text-museum-text-muted max-w-lg leading-relaxed"
          style={{ fontSize: '15px', fontWeight: 300 }}
        >
          {t.subtitle}
        </motion.p>

        {/* CTA buttons row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
        >
          {/* Primary CTA */}
          <motion.button
            onClick={() => { playSound('transition'); onEnter(); }}
            onMouseEnter={() => playHover()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative group overflow-hidden"
            style={{
              padding: '14px clamp(24px, 8vw, 56px)',
              border: '1px solid rgba(201,164,92,0.55)',
              fontSize: '12px',
              letterSpacing: '0.28em',
              color: '#C9A45C',
              background: 'rgba(201,164,92,0.04)',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(201,164,92,0.12)' }}
            />
            <span className="relative">{t.cta}</span>
          </motion.button>

          {/* Secondary — About the Artist */}
          <motion.button
            onClick={onShowAbout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative group overflow-hidden"
            style={{
              padding: '12px clamp(24px, 8vw, 56px)',
              border: '1px solid rgba(201,164,92,0.22)',
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: '#CBBBA0',
              background: 'transparent',
              cursor: 'pointer',
              width: '100%',
              transition: 'border-color 0.25s, color 0.25s',
            }}
            onMouseEnter={e => {
              playHover();
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.45)';
              (e.currentTarget as HTMLButtonElement).style.color = '#C9A45C';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,164,92,0.22)';
              (e.currentTarget as HTMLButtonElement).style.color = '#CBBBA0';
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(201,164,92,0.05)' }}
            />
            <span className="relative flex flex-col items-center gap-0.5">
              <span>{t.artistBtn}</span>
              <span style={{ fontSize: '8px', letterSpacing: '0.22em', opacity: 0.55 }}>{t.artistSub}</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Hint */}
        <p
          className="mt-8 text-museum-accent-dim"
          style={{ fontSize: '9px', letterSpacing: '0.2em' }}
        >
          {t.hint}
        </p>
      </motion.div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(201,164,92,0.2) 30%, rgba(201,164,92,0.2) 70%, transparent)',
        }}
      />
    </div>
  );
}
