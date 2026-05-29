import { motion } from 'framer-motion';
import { ChevronLeft, Mail, GitBranch, ExternalLink } from 'lucide-react';
import type { Lang } from '../App';
import { profile } from '../data/profile';
import profileImg from '../assets/profile.png';

interface AboutPageProps {
  onBack: () => void;
  lang: Lang;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span
        style={{
          fontSize: '9px',
          letterSpacing: '0.28em',
          color: '#7E5B35',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
        }}
      >
        ── {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(201,164,92,0.15)' }} />
    </div>
  );
}

export function AboutPage({ onBack, lang }: AboutPageProps) {
  const isKo = lang === 'ko';

  const labels = {
    back:          isKo ? '첫 화면으로' : 'Back to Entrance',
    curatorLabel:  isKo ? 'CURATOR PROFILE' : 'CURATOR PROFILE',
    bioSection:    isKo ? '큐레이터의 말' : 'CURATOR NOTE',
    careerSection: isKo ? '커리어 방향' : 'CAREER DIRECTION',
    strengthSection: isKo ? '핵심 역량' : 'STRENGTHS',
    timelineSection: isKo ? '타임라인' : 'TIMELINE',
    linksSection:  isKo ? '링크' : 'LINKS',
    roleLabel:     isKo ? '직무' : 'ROLE',
    schoolLabel:   isKo ? '학교' : 'SCHOOL',
    majorLabel:    isKo ? '전공' : 'MAJOR',
    locationLabel: isKo ? '거주지' : 'LOCATION',
    birthLabel:    isKo ? '생년월일' : 'BORN',
  };

  const infoRows = [
    { label: labels.roleLabel,     value: profile.role },
    { label: labels.schoolLabel,   value: isKo ? profile.school : profile.schoolEn },
    { label: labels.majorLabel,    value: isKo ? profile.major  : profile.majorEn },
    { label: labels.locationLabel, value: isKo ? profile.location : profile.locationEn },
    { label: labels.birthLabel,    value: profile.birth },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 50% 10%, rgba(180,125,55,0.14) 0%, transparent 40%), ' +
          'linear-gradient(180deg, #090807 0%, #120f0b 50%, #050505 100%)',
        color: '#F4EBDD',
        overflowX: 'hidden',
      }}
    >
      {/* ── Top nav ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          borderBottom: '1px solid rgba(201,164,92,0.1)',
          background: 'rgba(9,8,7,0.85)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-museum-text-muted hover:text-museum-accent transition-colors group"
          style={{ fontSize: '11px', letterSpacing: '0.12em', fontFamily: 'Inter, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          {labels.back}
        </button>
        <span style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7E5B35', fontFamily: 'Inter, sans-serif' }}>
          {labels.curatorLabel}
        </span>
        <div style={{ width: '80px' }} />
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          {...fadeUp(0)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            alignItems: 'flex-start',
            marginBottom: '72px',
          }}
        >
          {/* Portrait card */}
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                width: '220px',
                position: 'relative',
              }}
            >
              {/* Gold frame */}
              <div
                style={{
                  padding: '6px',
                  background: 'linear-gradient(145deg, #3A280E 0%, #C9A45C 35%, #7E5B35 50%, #C9A45C 65%, #2D1E0C 100%)',
                  boxShadow: '0 0 32px rgba(201,164,92,0.2), 0 24px 60px rgba(0,0,0,0.6)',
                }}
              >
                <div
                  style={{
                    padding: '4px',
                    background: '#1A1108',
                  }}
                >
                  <img
                    src={profileImg}
                    alt={profile.nameEn}
                    style={{
                      width: '100%',
                      display: 'block',
                      aspectRatio: '3 / 4',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      filter: 'brightness(0.92) contrast(1.04)',
                    }}
                  />
                </div>
              </div>
              {/* Museum label below photo */}
              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  border: '1px solid rgba(201,164,92,0.2)',
                  background: 'rgba(12,10,8,0.8)',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '11px', color: '#C9A45C', letterSpacing: '0.18em', fontFamily: 'Inter, sans-serif' }}>
                  {isKo ? profile.name : profile.nameEn}
                </p>
                <p style={{ fontSize: '9px', color: '#7E5B35', letterSpacing: '0.12em', marginTop: '3px', fontFamily: 'Inter, sans-serif' }}>
                  {profile.role}
                </p>
              </div>
            </div>
          </div>

          {/* Right: name + info + summary */}
          <div style={{ flex: 1, minWidth: '260px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.34em', color: '#7E5B35', fontFamily: 'Inter, sans-serif', marginBottom: '12px' }}>
              CURATOR PROFILE
            </p>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(36px, 6vw, 56px)',
                fontWeight: 400,
                color: '#F4EBDD',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                textShadow: '0 0 60px rgba(201,164,92,0.12)',
              }}
            >
              {isKo ? profile.name : profile.nameEn}
            </h1>
            {isKo && (
              <p style={{ fontSize: '13px', color: '#7E5B35', marginTop: '4px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>
                {profile.nameEn}
              </p>
            )}

            {/* Divider */}
            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(to right, #C9A45C, transparent)', margin: '16px 0' }} />

            {/* Info rows */}
            <div style={{ marginBottom: '20px' }}>
              {infoRows.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(201,164,92,0.07)',
                  }}
                >
                  <span style={{ fontSize: '9px', color: '#7E5B35', letterSpacing: '0.16em', minWidth: '68px', paddingTop: '2px', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
                    {label}
                  </span>
                  <span style={{ fontSize: '12px', color: '#CBBBA0', fontFamily: 'Inter, sans-serif' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <p
              style={{
                fontSize: '14px',
                color: '#D4C4A8',
                lineHeight: 1.75,
                fontFamily: 'Inter, sans-serif',
                borderLeft: '2px solid rgba(201,164,92,0.35)',
                paddingLeft: '14px',
                fontStyle: 'italic',
              }}
            >
              {isKo ? profile.summary.ko : profile.summary.en}
            </p>

            {/* Link buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
              {[
                { href: `mailto:${profile.email}`, icon: <Mail size={11} />, label: 'Email' },
                { href: profile.github, icon: <GitBranch size={11} />, label: 'GitHub' },
                { href: profile.blog, icon: <ExternalLink size={11} />, label: 'Tech Blog' },
                { href: profile.linkedin, icon: <ExternalLink size={11} />, label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '10px',
                    color: '#CBBBA0',
                    border: '1px solid rgba(201,164,92,0.22)',
                    padding: '6px 14px',
                    fontFamily: 'Inter, sans-serif',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    background: 'rgba(201,164,92,0.03)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = '#C9A45C';
                    el.style.borderColor = 'rgba(201,164,92,0.5)';
                    el.style.background = 'rgba(201,164,92,0.08)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = '#CBBBA0';
                    el.style.borderColor = 'rgba(201,164,92,0.22)';
                    el.style.background = 'rgba(201,164,92,0.03)';
                  }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ━━ CURATOR NOTE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: '64px' }}>
          <SectionTitle label={labels.bioSection} />
          <div
            style={{
              padding: '32px 36px',
              border: '1px solid rgba(201,164,92,0.18)',
              background: 'rgba(10,9,7,0.6)',
              boxShadow: '0 0 40px rgba(201,164,92,0.05)',
              position: 'relative',
            }}
          >
            {/* Decorative corner */}
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '24px', height: '24px', borderTop: '2px solid rgba(201,164,92,0.5)', borderLeft: '2px solid rgba(201,164,92,0.5)' }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '24px', height: '24px', borderBottom: '2px solid rgba(201,164,92,0.5)', borderRight: '2px solid rgba(201,164,92,0.5)' }} />

            {(isKo ? profile.curatorNote.ko : profile.curatorNote.en)
              .split('\n\n')
              .map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: '14px',
                    color: '#CBBBA0',
                    lineHeight: 1.9,
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: i < 2 ? '16px' : 0,
                  }}
                >
                  {para}
                </p>
              ))}
          </div>
        </motion.div>

        {/* ━━ CAREER DIRECTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div {...fadeUp(0.15)} style={{ marginBottom: '64px' }}>
          <SectionTitle label={labels.careerSection} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <div
              style={{
                flexShrink: 0,
                padding: '10px 18px',
                border: '1px solid rgba(201,164,92,0.35)',
                background: 'rgba(201,164,92,0.05)',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '9px', letterSpacing: '0.24em', color: '#7E5B35', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }}>TARGET ROLE</p>
              <p style={{ fontSize: '15px', color: '#C9A45C', fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 600, whiteSpace: 'nowrap' }}>
                PM / Service Planner
              </p>
            </div>
            <div style={{ flex: 1, minWidth: '240px' }}>
              {(isKo ? profile.careerNote.ko : profile.careerNote.en)
                .split('\n\n')
                .map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '13px',
                      color: '#CBBBA0',
                      lineHeight: 1.85,
                      fontFamily: 'Inter, sans-serif',
                      marginBottom: i < 1 ? '14px' : 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
            </div>
          </div>
        </motion.div>

        {/* ━━ STRENGTHS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div {...fadeUp(0.2)} style={{ marginBottom: '64px' }}>
          <SectionTitle label={labels.strengthSection} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {profile.strengths.map((s) => (
              <div
                key={s.num}
                style={{
                  padding: '22px 20px',
                  border: '1px solid rgba(201,164,92,0.15)',
                  background: 'rgba(10,9,7,0.5)',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(201,164,92,0.38)';
                  el.style.background = 'rgba(201,164,92,0.04)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(201,164,92,0.15)';
                  el.style.background = 'rgba(10,9,7,0.5)';
                }}
              >
                <p style={{ fontSize: '9px', color: '#7E5B35', letterSpacing: '0.22em', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }}>
                  STRENGTH {s.num}
                </p>
                <p style={{ fontSize: '14px', color: '#C9A45C', fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 600, marginBottom: '10px', lineHeight: 1.2 }}>
                  {s.title}
                </p>
                <p style={{ fontSize: '12px', color: '#CBBBA0', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                  {isKo ? s.ko : s.en}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ━━ TIMELINE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div {...fadeUp(0.25)} style={{ marginBottom: '64px' }}>
          <SectionTitle label={labels.timelineSection} />
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '6px',
                top: '6px',
                bottom: '6px',
                width: '1px',
                background: 'linear-gradient(to bottom, rgba(201,164,92,0.4), rgba(201,164,92,0.08))',
              }}
            />
            {profile.timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  marginBottom: i < profile.timeline.length - 1 ? '32px' : 0,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-26px',
                    top: '5px',
                    width: '7px',
                    height: '7px',
                    background: '#C9A45C',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                />
                <p style={{ fontSize: '9px', color: '#7E5B35', letterSpacing: '0.16em', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                  {item.period}
                </p>
                <p style={{ fontSize: '14px', color: '#D4C4A8', fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 600, marginBottom: '6px' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '12px', color: '#9E8B72', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                  {isKo ? item.ko : item.en}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ━━ LINKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div {...fadeUp(0.3)}>
          <SectionTitle label={labels.linksSection} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              { href: `mailto:${profile.email}`, icon: <Mail size={13} />, label: 'Email', sub: profile.email },
              { href: profile.github, icon: <GitBranch size={13} />, label: 'GitHub', sub: profile.github.replace('https://', '') },
              { href: profile.blog, icon: <ExternalLink size={13} />, label: 'Tech Blog', sub: profile.blog.replace('https://', '') },
              { href: profile.linkedin, icon: <ExternalLink size={13} />, label: 'LinkedIn', sub: 'linkedin.com/in/jinjeong-seo' },
            ].map(({ href, icon, label, sub }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  border: '1px solid rgba(201,164,92,0.2)',
                  background: 'rgba(10,9,7,0.6)',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                  minWidth: '200px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(201,164,92,0.5)';
                  el.style.background = 'rgba(201,164,92,0.06)';
                  el.style.boxShadow = '0 0 20px rgba(201,164,92,0.08)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(201,164,92,0.2)';
                  el.style.background = 'rgba(10,9,7,0.6)';
                  el.style.boxShadow = 'none';
                }}
              >
                <span style={{ color: '#C9A45C', flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: '11px', color: '#D4C4A8', fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', marginBottom: '2px' }}>{label}</p>
                  <p style={{ fontSize: '10px', color: '#7E5B35', fontFamily: 'Inter, sans-serif' }}>{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom label */}
        <div style={{ marginTop: '64px', textAlign: 'center', borderTop: '1px solid rgba(201,164,92,0.08)', paddingTop: '24px' }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(126,91,53,0.4)', fontFamily: 'Inter, sans-serif' }}>
            PROJECT MUSEUM · CURATOR PROFILE
          </p>
        </div>
      </div>
    </div>
  );
}
