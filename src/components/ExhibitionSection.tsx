import type { Exhibit, MuseumSection } from '../types/exhibit';
import { HorizontalGallery } from './HorizontalGallery';

interface ExhibitionSectionProps {
  section: MuseumSection;
  sectionNumber: number;
  exhibits: Exhibit[];
  selectedExhibitId?: string;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

export function ExhibitionSection({
  section,
  sectionNumber,
  exhibits,
  selectedExhibitId,
  onSelectExhibit,
}: ExhibitionSectionProps) {
  if (exhibits.length === 0) return null;

  const num = String(sectionNumber).padStart(2, '0');

  return (
    <section id={`section-${section.id}`} className="relative">
      {/* Ambient wall gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(74,18,14,0.08) 0%, transparent 30%, transparent 70%, rgba(74,18,14,0.08) 100%)',
        }}
      />

      {/* Section header */}
      <div
        className="relative px-8 md:px-16 pt-16 pb-0"
        style={{ borderTop: '1px solid rgba(201,164,92,0.08)' }}
      >
        <div className="flex items-start gap-6 md:gap-10">
          {/* Large gallery number */}
          <div
            className="font-editorial text-museum-wall-1 shrink-0 select-none hidden md:block"
            style={{
              fontSize: '80px',
              lineHeight: '1',
              fontWeight: 300,
              opacity: 0.4,
              marginTop: '-8px',
            }}
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

        {/* Thin gold line */}
        <div
          className="mt-6"
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, transparent 0%, rgba(201,164,92,0.35) 20%, rgba(201,164,92,0.35) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Horizontal gallery */}
      <HorizontalGallery
        exhibits={exhibits}
        selectedExhibitId={selectedExhibitId}
        onSelectExhibit={onSelectExhibit}
      />
    </section>
  );
}
