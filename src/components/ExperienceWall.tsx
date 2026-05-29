import type { Exhibit, MuseumSection } from '../types/exhibit';
import { ArtifactIcon } from './ArtifactIcon';

const cardStyles: Record<string, { border: string; bg: string; badge?: string }> = {
  passport: {
    border: '1px solid rgba(91,130,170,0.35)',
    bg: 'linear-gradient(135deg, #080E18 0%, #0A1020 100%)',
    badge: 'PASSPORT',
  },
  uk: {
    border: '1px solid rgba(170,91,91,0.35)',
    bg: 'linear-gradient(135deg, #12080A 0%, #1A0B0D 100%)',
    badge: 'STAMP',
  },
  newspaper: {
    border: '1px solid rgba(180,160,110,0.35)',
    bg: 'linear-gradient(135deg, #130F08 0%, #1A1508 100%)',
    badge: 'PRESS',
  },
  mentoring: {
    border: '1px solid rgba(91,140,91,0.35)',
    bg: 'linear-gradient(135deg, #080F08 0%, #0A1409 100%)',
    badge: 'MENTOR',
  },
  bass: {
    border: '1px solid rgba(140,140,160,0.35)',
    bg: 'linear-gradient(135deg, #0A0A10 0%, #0D0D18 100%)',
    badge: 'BAND',
  },
  community: {
    border: '1px solid rgba(201,120,60,0.35)',
    bg: 'linear-gradient(135deg, #120A06 0%, #1A100A 100%)',
    badge: 'COMMUNITY',
  },
};

const defaultStyle = {
  border: '1px solid rgba(201,164,92,0.2)',
  bg: 'linear-gradient(135deg, #0C0A08 0%, #111008 100%)',
};

interface ExperienceCardProps {
  exhibit: Exhibit;
  onClick: () => void;
}

function ExperienceCard({ exhibit, onClick }: ExperienceCardProps) {
  const style = cardStyles[exhibit.iconType] ?? defaultStyle;

  return (
    <div
      className="cursor-pointer group transition-all duration-300 hover:-translate-y-1 flex-shrink-0"
      style={{
        width: '280px',
        border: style.border,
        background: style.bg,
        padding: '20px',
        position: 'relative',
      }}
      onClick={onClick}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <ArtifactIcon iconType={exhibit.iconType} size={28} className="text-museum-accent-dim group-hover:text-museum-accent transition-colors duration-300" />
        {style.badge && (
          <span
            className="text-museum-accent-dim tracking-widest"
            style={{ fontSize: '8px', letterSpacing: '0.2em' }}
          >
            {style.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <h3
        className="font-editorial text-museum-text-primary leading-tight mt-3"
        style={{ fontSize: '16px', fontWeight: 400 }}
      >
        {exhibit.title}
      </h3>
      <p className="text-museum-text-muted mt-0.5" style={{ fontSize: '11px' }}>
        {exhibit.subtitle}
      </p>
      {exhibit.period && (
        <p className="text-museum-accent-dim mt-1.5" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
          {exhibit.period}
        </p>
      )}

      {/* Description */}
      <p
        className="text-museum-text-muted mt-3 leading-relaxed line-clamp-3"
        style={{ fontSize: '11px' }}
      >
        {exhibit.description}
      </p>

      {/* Features list */}
      {exhibit.features && exhibit.features.length > 0 && (
        <ul className="mt-3 space-y-1">
          {exhibit.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex gap-1.5 text-museum-text-muted" style={{ fontSize: '10px' }}>
              <span className="text-museum-accent shrink-0">·</span>
              {f}
            </li>
          ))}
          {exhibit.features.length > 3 && (
            <li className="text-museum-accent-dim" style={{ fontSize: '10px' }}>
              +{exhibit.features.length - 3} more
            </li>
          )}
        </ul>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {exhibit.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-museum-accent-dim" style={{ fontSize: '9px' }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Hover indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,164,92,0.4), transparent)' }}
      />
    </div>
  );
}

interface ExperienceWallProps {
  section: MuseumSection;
  sectionNumber: number;
  exhibits: Exhibit[];
  onSelectExhibit: (exhibit: Exhibit) => void;
}

export function ExperienceWall({
  section,
  sectionNumber,
  exhibits,
  onSelectExhibit,
}: ExperienceWallProps) {
  if (exhibits.length === 0) return null;
  const num = String(sectionNumber).padStart(2, '0');

  return (
    <section id={`section-${section.id}`} className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(74,18,14,0.06) 0%, transparent 30%, transparent 70%, rgba(74,18,14,0.06) 100%)',
        }}
      />

      {/* Section header */}
      <div
        className="relative px-8 md:px-16 pt-16 pb-0"
        style={{ borderTop: '1px solid rgba(201,164,92,0.08)' }}
      >
        <div className="flex items-start gap-6 md:gap-10">
          <div
            className="font-editorial text-museum-wall-1 shrink-0 select-none hidden md:block"
            style={{ fontSize: '80px', lineHeight: '1', fontWeight: 300, opacity: 0.4, marginTop: '-8px' }}
          >
            {num}
          </div>
          <div>
            <p
              className="text-museum-accent-dim tracking-widest mb-2"
              style={{ fontSize: '9px', letterSpacing: '0.25em' }}
            >
              GALLERY {num}
            </p>
            <h2
              className="font-editorial text-museum-text-primary"
              style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 400, lineHeight: 1.1 }}
            >
              {section.title}
            </h2>
            <p className="text-museum-text-muted mt-1" style={{ fontSize: '12px' }}>
              {section.subtitle}
            </p>
          </div>
        </div>
        <div
          className="mt-6"
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, transparent 0%, rgba(201,164,92,0.35) 20%, rgba(201,164,92,0.35) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Wall cards — horizontal scroll */}
      <div
        className="flex overflow-x-auto hide-scrollbar py-10 gap-5"
        style={{
          paddingLeft: 'max(40px, calc(50vw - 280px))',
          paddingRight: 'max(40px, calc(50vw - 280px))',
          paddingBottom: '48px',
        }}
      >
        {exhibits.map((exhibit) => (
          <ExperienceCard
            key={exhibit.id}
            exhibit={exhibit}
            onClick={() => onSelectExhibit(exhibit)}
          />
        ))}
      </div>
    </section>
  );
}
