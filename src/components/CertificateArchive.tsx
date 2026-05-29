import { Award } from 'lucide-react';
import type { Exhibit, MuseumSection } from '../types/exhibit';
import { useState } from 'react';

const categoryGroups: { label: string; ids: string[] }[] = [
  { label: 'IT / Software', ids: ['information-processing-engineer', 'information-processing-craftsman', 'network-manager-2'] },
  { label: 'Office / Data', ids: ['computer-specialist-1', 'word-processor'] },
  { label: 'ERP', ids: ['erp-accounting-2', 'erp-logistics-2', 'erp-hr-2'] },
  { label: 'History', ids: ['korean-history-1'] },
];

interface CertificatePlateProps {
  exhibit: Exhibit;
  groupIndex: number;
}

function CertificatePlate({ exhibit }: CertificatePlateProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className="relative cursor-pointer transition-all duration-300"
      style={{
        border: isHovered
          ? '1px solid rgba(201,164,92,0.55)'
          : '1px solid rgba(201,164,92,0.2)',
        background: isHovered
          ? 'linear-gradient(135deg, #141008 0%, #0E0C08 100%)'
          : 'linear-gradient(135deg, #0C0A06 0%, #090806 100%)',
        padding: '14px 16px',
        minWidth: '200px',
        boxShadow: isHovered
          ? '0 0 20px rgba(201,164,92,0.08), inset 0 0 20px rgba(0,0,0,0.3)'
          : 'inset 0 0 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowDetail(false); }}
      onClick={() => setShowDetail((p) => !p)}
    >
      {/* Screw corners */}
      <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-museum-accent-dim opacity-40" />
      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-museum-accent-dim opacity-40" />
      <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-museum-accent-dim opacity-40" />
      <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-museum-accent-dim opacity-40" />

      {/* Content */}
      <div className="flex items-center gap-2 mb-1">
        <Award
          size={12}
          className={isHovered ? 'text-museum-accent' : 'text-museum-accent-dim'}
          style={{ transition: 'color 0.3s' }}
        />
        <span
          className="text-museum-accent-dim tracking-widest"
          style={{ fontSize: '7px', letterSpacing: '0.2em' }}
        >
          CERTIFIED
        </span>
      </div>

      <p
        className="font-editorial text-museum-text-primary leading-tight"
        style={{ fontSize: '13px', fontWeight: 400 }}
      >
        {exhibit.title}
      </p>
      <p className="text-museum-text-muted mt-0.5" style={{ fontSize: '9px' }}>
        {exhibit.subtitle}
      </p>

      {/* Detail tooltip on click */}
      {showDetail && exhibit.description && (
        <div
          className="absolute left-0 right-0 z-10 px-3 py-2 mt-1"
          style={{
            top: '100%',
            background: '#0C0A08',
            border: '1px solid rgba(201,164,92,0.25)',
          }}
        >
          <p className="text-museum-text-muted" style={{ fontSize: '10px', lineHeight: '1.5' }}>
            {exhibit.description}
          </p>
        </div>
      )}

      {/* Glow overlay on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(201,164,92,0.06) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}

interface CertificateArchiveProps {
  section: MuseumSection;
  sectionNumber: number;
  exhibits: Exhibit[];
}

export function CertificateArchive({ section, sectionNumber, exhibits }: CertificateArchiveProps) {
  if (exhibits.length === 0) return null;
  const num = String(sectionNumber).padStart(2, '0');

  const getGroupExhibits = (ids: string[]) =>
    ids.map((id) => exhibits.find((e) => e.id === id)).filter((e): e is Exhibit => !!e);

  return (
    <section id={`section-${section.id}`} className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(74,18,14,0.06) 0%, transparent 40%)',
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

      {/* Archive wall */}
      <div className="px-8 md:px-16 py-10 pb-16">
        <div className="space-y-8">
          {categoryGroups.map((group) => {
            const groupExhibits = getGroupExhibits(group.ids);
            if (groupExhibits.length === 0) return null;

            return (
              <div key={group.label}>
                {/* Category label */}
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="text-museum-accent-dim tracking-widest"
                    style={{ fontSize: '9px', letterSpacing: '0.2em' }}
                  >
                    {group.label}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(201,164,92,0.12)' }} />
                </div>

                {/* Plates grid */}
                <div className="flex flex-wrap gap-3">
                  {groupExhibits.map((exhibit, i) => (
                    <CertificatePlate key={exhibit.id} exhibit={exhibit} groupIndex={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
