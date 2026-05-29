import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, GitBranch, ExternalLink, FileText } from 'lucide-react';
import type { Exhibit, ExhibitType } from '../types/exhibit';
import type { Lang } from '../App';
import { ArtifactIcon } from './ArtifactIcon';
import { playSound, playHover } from '../utils/sounds';

interface ExhibitPanelProps {
  exhibit: Exhibit;
  index: number;
  onClose: () => void;
  lang: Lang;
}

// ── Stagger helper ────────────────────────────────────────────
const sec = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.48,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

// ── Contribution title by exhibit type ───────────────────────
const contribLabel: Record<ExhibitType, { ko: string; en: string }> = {
  project:     { ko: '개발한 것',   en: 'What I Built' },
  competition: { ko: '기여한 것',   en: 'What I Contributed' },
  experience:  { ko: '배운 것',     en: 'What I Learned' },
  activity:    { ko: '경험한 것',   en: 'What I Experienced' },
  certificate: { ko: '검증된 역량', en: 'Verified Skill' },
};

// ── Section wrapper ───────────────────────────────────────────
function PanelSection({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div {...sec(delay)} style={{ marginTop: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span
          style={{
            fontSize: '8px',
            letterSpacing: '0.28em',
            color: '#7E5B35',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          ── {title}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(201,164,92,0.15)' }} />
      </div>
      {children}
    </motion.div>
  );
}

export function ExhibitPanel({ exhibit, index, onClose, lang }: ExhibitPanelProps) {
  const [isMobile, setIsMobile] = useState(false);
  const exhibitNumber = String(index + 1).padStart(2, '0');
  const isKo = lang === 'ko';

  // Resolved display values
  const title        = isKo ? exhibit.title          : (exhibit.titleEn        ?? exhibit.title);
  const subtitle     = isKo ? exhibit.subtitle       : (exhibit.subtitleEn     ?? exhibit.subtitle);
  const description  = isKo ? exhibit.description    : (exhibit.descriptionEn  ?? exhibit.description);
  const problem      = isKo ? exhibit.problem        : (exhibit.problemEn      ?? exhibit.problem);
  const features     = isKo ? exhibit.features       : (exhibit.featuresEn     ?? exhibit.features);
  const contribution = isKo ? exhibit.contribution   : (exhibit.contributionEn ?? exhibit.contribution);
  const result       = isKo ? exhibit.result         : (exhibit.resultEn       ?? exhibit.result);

  const contribTitle = contribLabel[exhibit.type][lang];

  // Labels
  const labels = {
    curatorNote:  isKo ? 'CURATOR NOTE'  : 'CURATOR NOTE',
    keyPoints:    isKo ? '주요 내용'      : 'KEY POINTS',
    period:       isKo ? '기간'           : 'PERIOD',
    category:     isKo ? '분류'           : 'CATEGORY',
    role:         isKo ? '역할'           : 'ROLE',
    team:         isKo ? '팀'             : 'TEAM',
    award:        isKo ? '수상'           : 'AWARD',
    result:       isKo ? '결과'           : 'RESULT',
    tags:         isKo ? '태그'           : 'TAGS',
    actions:      isKo ? '링크'           : 'LINKS',
    close:        isKo ? '닫기'           : 'Close',
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { playSound('panel-close'); onClose(); } };
    window.addEventListener('keydown', onKey);
    // Only lock scroll on mobile (bottom sheet); desktop panel is fixed overlay
    if (isMobile) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, isMobile]);

  // ── Panel motion ──────────────────────────────────────────
  const panelMotion = isMobile
    ? {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0 },
        exit:    { opacity: 0, y: '100%' },
      }
    : {
        initial: { opacity: 0, x: 48 },
        animate: { opacity: 1, x: 0 },
        exit:    { opacity: 0, x: 48 },
      };

  const panelTransition = isMobile
    ? {
        type: 'tween' as const,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }
    : {
        type: 'tween' as const,
        duration: 0.5,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      };

  // ── Meta rows ────────────────────────────────────────────
  const metaRows = [
    { label: labels.period,   value: exhibit.period },
    { label: labels.category, value: exhibit.category },
    ...(exhibit.role  ? [{ label: labels.role,  value: exhibit.role }]  : []),
    ...(exhibit.team  ? [{ label: labels.team,  value: exhibit.team }]  : []),
    ...(exhibit.award ? [{ label: labels.award, value: `◆ ${exhibit.award}` }] : []),
    ...(result        ? [{ label: labels.result, value: result }]        : []),
  ];

  // ── Limit features / contribution per spec ────────────────
  const displayFeatures    = features?.slice(0, 5);
  const displayContribution = contribution?.slice(0, 4);

  const panelStyle = isMobile
    ? {
        position: 'fixed' as const,
        bottom: 0,
        left: 0,
        right: 0,
        height: '82vh',
        borderRadius: '16px 16px 0 0',
        zIndex: 50,
        overflowY: 'auto' as const,
      }
    : {
        position: 'relative' as const,
        width: '50vw',
        height: '100%',
        overflowY: 'auto' as const,
      };

  return (
    <>
      {/* ── Panel ── */}
      <motion.div
        style={{
          ...panelStyle,
          background: isMobile
            ? 'linear-gradient(180deg, #15110C 0%, #0D0B09 100%)'
            : [
                'radial-gradient(circle at 20% 0%, rgba(201,164,92,0.07), transparent 36%)',
                'linear-gradient(180deg, rgba(13,11,8,0.99) 0%, rgba(5,5,5,0.99) 100%)',
              ].join(', '),
          borderLeft: isMobile ? 'none' : '1px solid rgba(201,164,92,0.32)',
          borderTop: isMobile ? '1px solid rgba(201,164,92,0.42)' : 'none',
          boxShadow: isMobile
            ? '0 -32px 80px rgba(0,0,0,0.85)'
            : '-32px 0 80px rgba(0,0,0,0.45)',
        }}
        transition={panelTransition}
        {...panelMotion}
      >
        {/* Mobile drag handle */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '4px' }}>
            <div style={{ width: '36px', height: '3px', borderRadius: '2px', background: 'rgba(201,164,92,0.3)' }} />
          </div>
        )}

        {/* Content fades when exhibit changes (panel stays mounted) */}
        <motion.div
          key={exhibit.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >

        {/* ── Sticky header ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: isMobile ? '16px 24px 14px' : '28px 48px 20px',
            background: 'linear-gradient(to bottom, #15110C 70%, transparent)',
            borderBottom: '1px solid rgba(201,164,92,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ opacity: 0.75 }}><ArtifactIcon iconType={exhibit.iconType} size={18} className="text-museum-accent" /></span>
              <span
                style={{
                  fontSize: '8px',
                  letterSpacing: '0.3em',
                  color: '#7E5B35',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                EXHIBIT {exhibitNumber}
              </span>
            </div>
            <button
              onClick={() => { playSound('panel-close'); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: '#7E5B35',
                background: 'none',
                border: '1px solid rgba(201,164,92,0.18)',
                padding: '4px 10px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'color 0.2s, border-color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                playHover();
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#C9A45C';
                el.style.borderColor = 'rgba(201,164,92,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#7E5B35';
                el.style.borderColor = 'rgba(201,164,92,0.18)';
              }}
            >
              <X size={11} /> {labels.close}
            </button>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div style={{ padding: isMobile ? '0 24px 48px' : '0 48px 64px' }}>

          {/* ── TITLE BLOCK ── */}
          <motion.div {...sec(0)} style={{ marginTop: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(201,164,92,0.18)' }}>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: isMobile ? '28px' : '34px',
                fontWeight: 400,
                color: '#F4EBDD',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textShadow: '0 0 40px rgba(201,164,92,0.1)',
                marginBottom: '8px',
              }}
            >
              {title}
            </h2>
            <p style={{ fontSize: '13px', color: '#B8AA91', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>
              {subtitle}
            </p>
            {/* Gold divider line */}
            <div style={{ marginTop: '14px', width: '40px', height: '1px', background: 'linear-gradient(to right, #C9A45C, transparent)' }} />
          </motion.div>

          {/* ── META GRID ── */}
          <motion.div {...sec(0.06)} style={{ marginTop: '20px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0',
                border: '1px solid rgba(201,164,92,0.15)',
                background: 'rgba(201,164,92,0.02)',
              }}
            >
              {metaRows.map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    padding: '10px 14px',
                    borderBottom: i < metaRows.length - (metaRows.length % 2 === 0 ? 2 : 1)
                      ? '1px solid rgba(201,164,92,0.1)'
                      : 'none',
                    borderRight: i % 2 === 0 ? '1px solid rgba(201,164,92,0.1)' : 'none',
                  }}
                >
                  <p style={{ fontSize: '8px', letterSpacing: '0.22em', color: '#7E5B35', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '12px', color: '#F4EBDD', fontFamily: 'Inter, sans-serif', lineHeight: 1.3 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── TECH STACK ── */}
          {exhibit.stack && exhibit.stack.length > 0 && (
            <motion.div {...sec(0.09)} style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {exhibit.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: '9px',
                    color: '#B8AA91',
                    border: '1px solid rgba(201,164,92,0.18)',
                    background: 'rgba(201,164,92,0.04)',
                    padding: '3px 9px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.06em',
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}

          {/* ── CURATOR NOTE (description) ── */}
          <PanelSection title={labels.curatorNote} delay={0.12}>
            <div
              style={{
                padding: '16px 18px',
                background: 'rgba(201,164,92,0.03)',
                border: '1px solid rgba(201,164,92,0.14)',
                borderLeft: '2px solid rgba(201,164,92,0.45)',
                position: 'relative',
              }}
            >
              {/* Corner accent */}
              <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '14px', height: '14px', borderTop: '1px solid rgba(201,164,92,0.35)', borderRight: '1px solid rgba(201,164,92,0.35)' }} />
              <p style={{ fontSize: '13px', color: '#B8AA91', lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
                {description}
              </p>
            </div>
          </PanelSection>

          {/* ── PROBLEM ── */}
          {problem && (
            <PanelSection title={isKo ? '문제' : 'PROBLEM'} delay={0.15}>
              <p
                style={{
                  fontSize: '12px',
                  color: '#B8AA91',
                  lineHeight: 1.8,
                  fontFamily: 'Inter, sans-serif',
                  borderLeft: '2px solid rgba(201,164,92,0.25)',
                  paddingLeft: '12px',
                }}
              >
                {problem}
              </p>
            </PanelSection>
          )}

          {/* ── KEY POINTS (features) ── */}
          {displayFeatures && displayFeatures.length > 0 && (
            <PanelSection title={labels.keyPoints} delay={0.18}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {displayFeatures.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 14px',
                      border: '1px solid rgba(201,164,92,0.12)',
                      background: 'rgba(201,164,92,0.025)',
                      transition: 'border-color 0.25s, background 0.25s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = 'rgba(201,164,92,0.3)';
                      el.style.background = 'rgba(201,164,92,0.06)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = 'rgba(201,164,92,0.12)';
                      el.style.background = 'rgba(201,164,92,0.025)';
                    }}
                  >
                    <span style={{ color: '#C9A45C', fontSize: '10px', flexShrink: 0, paddingTop: '2px' }}>◆</span>
                    <span style={{ fontSize: '12px', color: '#D4C4A8', fontFamily: 'Inter, sans-serif', lineHeight: 1.65 }}>{f}</span>
                  </div>
                ))}
              </div>
            </PanelSection>
          )}

          {/* ── CONTRIBUTION ── */}
          {displayContribution && displayContribution.length > 0 && (
            <PanelSection title={contribTitle} delay={0.24}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {displayContribution.map((c, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
                  >
                    <span
                      style={{
                        fontSize: '8px',
                        color: '#7E5B35',
                        flexShrink: 0,
                        paddingTop: '4px',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p style={{ fontSize: '12px', color: '#B8AA91', fontFamily: 'Inter, sans-serif', lineHeight: 1.75 }}>
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            </PanelSection>
          )}

          {/* ── TAGS ── */}
          {exhibit.tags.length > 0 && (
            <motion.div {...sec(0.30)} style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {exhibit.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '9px',
                    color: '#7E5B35',
                    letterSpacing: '0.1em',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* ── ACTION LINKS ── */}
          {(exhibit.githubUrl || exhibit.demoUrl || exhibit.articleUrl) && (
            <motion.div {...sec(0.36)} style={{ marginTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: '#7E5B35', fontFamily: 'Inter, sans-serif' }}>
                  ── {labels.actions}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(201,164,92,0.15)' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {exhibit.githubUrl && (
                  <a
                    href={exhibit.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      color: '#B8AA91',
                      border: '1px solid rgba(201,164,92,0.25)',
                      background: 'rgba(201,164,92,0.04)',
                      padding: '8px 18px',
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#C9A45C';
                      el.style.borderColor = 'rgba(201,164,92,0.5)';
                      el.style.background = 'rgba(201,164,92,0.1)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#B8AA91';
                      el.style.borderColor = 'rgba(201,164,92,0.25)';
                      el.style.background = 'rgba(201,164,92,0.04)';
                    }}
                  >
                    <GitBranch size={11} /> GitHub
                  </a>
                )}
                {exhibit.demoUrl && (
                  <a
                    href={exhibit.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      color: '#B8AA91',
                      border: '1px solid rgba(201,164,92,0.25)',
                      background: 'rgba(201,164,92,0.04)',
                      padding: '8px 18px',
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#C9A45C';
                      el.style.borderColor = 'rgba(201,164,92,0.5)';
                      el.style.background = 'rgba(201,164,92,0.1)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#B8AA91';
                      el.style.borderColor = 'rgba(201,164,92,0.25)';
                      el.style.background = 'rgba(201,164,92,0.04)';
                    }}
                  >
                    <ExternalLink size={11} /> Demo
                  </a>
                )}
                {exhibit.articleUrl && (
                  <a
                    href={exhibit.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      color: '#B8AA91',
                      border: '1px solid rgba(201,164,92,0.25)',
                      background: 'rgba(201,164,92,0.04)',
                      padding: '8px 18px',
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#C9A45C';
                      el.style.borderColor = 'rgba(201,164,92,0.5)';
                      el.style.background = 'rgba(201,164,92,0.1)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#B8AA91';
                      el.style.borderColor = 'rgba(201,164,92,0.25)';
                      el.style.background = 'rgba(201,164,92,0.04)';
                    }}
                  >
                    <FileText size={11} /> Article
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* Bottom museum label */}
          <div
            style={{
              marginTop: '48px',
              textAlign: 'center',
              borderTop: '1px solid rgba(201,164,92,0.08)',
              paddingTop: '18px',
            }}
          >
            <p style={{ fontSize: '7px', letterSpacing: '0.3em', color: 'rgba(126,91,53,0.35)', fontFamily: 'Inter, sans-serif' }}>
              PROJECT MUSEUM · EXHIBIT {exhibitNumber}
            </p>
          </div>
        </div>

        </motion.div>{/* end exhibit-content fade wrapper */}
      </motion.div>
    </>
  );
}
