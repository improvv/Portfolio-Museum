import type { Exhibit } from '../types/exhibit';
import type { Lang } from '../App';
import { ArtifactIcon } from './ArtifactIcon';

interface ExhibitArtifactProps {
  exhibit: Exhibit;
  index: number;
  isCenter: boolean;
  lang: Lang;
}

export function ExhibitArtifact({ exhibit, index, isCenter, lang }: ExhibitArtifactProps) {
  const num = String(index + 1).padStart(2, '0');
  const displayTitle = lang === 'en' ? (exhibit.titleEn ?? exhibit.title) : exhibit.title;

  return (
    <div
      className="flex flex-col items-center select-none"
      style={{ width: isCenter ? '200px' : '160px', transition: 'width 0.4s' }}
    >
      {/* Spotlight cone from above */}
      <div
        style={{
          width: isCenter ? '140px' : '100px',
          height: isCenter ? '180px' : '120px',
          background: isCenter
            ? 'linear-gradient(to bottom, rgba(201,164,92,0.3) 0%, rgba(201,164,92,0.1) 50%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(201,164,92,0.07) 0%, transparent 100%)',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
          transition: 'all 0.45s',
          marginBottom: '-12px',
          flexShrink: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Platform circle ── */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          flexShrink: 0,
          width: isCenter ? '144px' : '112px',
          height: isCenter ? '144px' : '112px',
          background: 'radial-gradient(ellipse at 38% 28%, #221C12, #080706)',
          border: isCenter
            ? '1.5px solid rgba(201,164,92,0.55)'
            : '1px solid rgba(201,164,92,0.12)',
          boxShadow: isCenter
            ? '0 0 40px rgba(201,164,92,0.18), 0 12px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(201,164,92,0.12)'
            : '0 8px 28px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,164,92,0.04)',
          transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Top glow inside */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(201,164,92,0.22) 0%, transparent 60%)',
            opacity: isCenter ? 1 : 0.3,
            transition: 'opacity 0.45s',
            pointerEvents: 'none',
          }}
        />

        {/* Icon */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            filter: isCenter
              ? 'drop-shadow(0 0 14px rgba(201,164,92,0.55))'
              : 'drop-shadow(0 0 3px rgba(201,164,92,0.12))',
            transition: 'filter 0.45s',
          }}
        >
          <ArtifactIcon
            iconType={exhibit.iconType}
            size={isCenter ? 52 : 36}
            className={isCenter ? 'text-museum-accent-bright' : 'text-museum-accent-dim'}
          />
        </div>

        {/* Award badge */}
        {exhibit.award && isCenter && (
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              fontSize: '7px',
              letterSpacing: '0.08em',
              padding: '3px 7px',
              background: '#C9A45C',
              color: '#050505',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              borderRadius: '2px',
            }}
          >
            {exhibit.award}
          </div>
        )}
      </div>

      {/* ── Pedestal rings ── */}
      <div
        style={{
          width: isCenter ? '158px' : '124px',
          height: '10px',
          borderRadius: '50%',
          background: 'linear-gradient(to bottom, #1C1710, #0D0B08)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
          transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      <div
        style={{
          width: isCenter ? '168px' : '132px',
          height: '7px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, #0A0806, #14110C, #0A0806)',
          boxShadow: '0 6px 22px rgba(0,0,0,0.9)',
          transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Floor shadow */}
      <div
        style={{
          width: isCenter ? '188px' : '148px',
          height: '6px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.65) 0%, transparent 70%)',
          transition: 'all 0.45s',
        }}
      />

      {/* ── Museum label plate ── */}
      <div
        style={{
          marginTop: '14px',
          textAlign: 'center',
          padding: '8px 16px',
          width: isCenter ? '182px' : '148px',
          border: isCenter
            ? '1px solid rgba(201,164,92,0.42)'
            : '1px solid rgba(201,164,92,0.09)',
          background: isCenter ? 'rgba(14,11,7,0.95)' : 'rgba(8,7,6,0.7)',
          transition: 'all 0.45s',
        }}
      >
        <p
          style={{
            fontSize: '8px',
            letterSpacing: '0.26em',
            color: isCenter ? '#7E5B35' : 'rgba(126,91,53,0.4)',
            fontFamily: 'Inter, sans-serif',
            transition: 'color 0.4s',
          }}
        >
          EXHIBIT {num}
        </p>
        {isCenter && (
          <p
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#F4EBDD',
              marginTop: '2px',
              lineHeight: 1.2,
            }}
          >
            {displayTitle}
          </p>
        )}
      </div>
    </div>
  );
}
