import type { Exhibit } from '../types/exhibit';
import { ArtifactIcon } from './ArtifactIcon';

interface ExhibitPedestalProps {
  exhibit: Exhibit;
  index: number;
  isSelected: boolean;
  isCenter: boolean;
  onClick: () => void;
}

export function ExhibitPedestal({
  exhibit,
  index,
  isSelected,
  isCenter,
  onClick,
}: ExhibitPedestalProps) {
  const exhibitNumber = String(index + 1).padStart(2, '0');

  return (
    <div
      className="flex flex-col items-center cursor-pointer group select-none"
      style={{ flexShrink: 0, width: '260px' }}
      onClick={onClick}
    >
      {/* Spotlight beam from above */}
      <div
        className="w-full flex justify-center"
        style={{
          background: isSelected || isCenter
            ? 'linear-gradient(to bottom, rgba(201,164,92,0.12) 0%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(201,164,92,0.04) 0%, transparent 100%)',
          paddingTop: '24px',
          transition: 'background 0.5s',
        }}
      >
        {/* Icon platform circle */}
        <div
          className="relative flex items-center justify-center rounded-full transition-all duration-500"
          style={{
            width: '152px',
            height: '152px',
            background: 'radial-gradient(ellipse at 50% 30%, #1E1A16 0%, #0A0908 100%)',
            border: isSelected
              ? '1.5px solid rgba(201,164,92,0.6)'
              : isCenter
              ? '1.5px solid rgba(201,164,92,0.35)'
              : '1.5px solid rgba(201,164,92,0.12)',
            boxShadow: isSelected || isCenter
              ? '0 0 32px rgba(201,164,92,0.12), inset 0 0 24px rgba(0,0,0,0.6)'
              : 'inset 0 0 24px rgba(0,0,0,0.6)',
          }}
        >
          {/* Spotlight highlight at top */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(201,164,92,0.18) 0%, transparent 60%)',
              opacity: isSelected || isCenter ? 1 : 0.4,
              transition: 'opacity 0.5s',
            }}
          />

          <ArtifactIcon
            iconType={exhibit.iconType}
            size={46}
            className={
              isSelected
                ? 'text-museum-accent-bright transition-colors duration-300'
                : isCenter
                ? 'text-museum-accent transition-colors duration-300'
                : 'text-museum-accent-dim group-hover:text-museum-accent transition-colors duration-300'
            }
          />

          {exhibit.award && (
            <div
              className="absolute -top-1.5 -right-1.5 text-[9px] font-medium tracking-wider px-1.5 py-0.5 rounded-sm"
              style={{
                background: '#C9A45C',
                color: '#080706',
              }}
            >
              {exhibit.award}
            </div>
          )}
        </div>
      </div>

      {/* Pedestal base — stacked rings */}
      <div
        className="rounded-full mt-0"
        style={{
          width: '160px',
          height: '10px',
          background: 'linear-gradient(to bottom, #1C1C1C, #111111)',
        }}
      />
      <div
        className="rounded-full"
        style={{
          width: '148px',
          height: '7px',
          background: 'linear-gradient(to bottom, #141414, #0A0A0A)',
        }}
      />
      <div
        className="rounded-full"
        style={{
          width: '136px',
          height: '5px',
          background: '#080808',
        }}
      />

      {/* Museum label plate */}
      <div
        className="mt-3 text-center px-4 py-3 transition-all duration-300"
        style={{
          width: '200px',
          border: isSelected
            ? '1px solid rgba(201,164,92,0.55)'
            : isCenter
            ? '1px solid rgba(201,164,92,0.3)'
            : '1px solid rgba(201,164,92,0.12)',
          background: isSelected ? 'rgba(12,9,6,0.95)' : 'rgba(8,7,6,0.8)',
        }}
      >
        <p
          className="text-museum-accent-dim mb-1 tracking-widest"
          style={{ fontSize: '8px', letterSpacing: '0.22em' }}
        >
          EXHIBIT {exhibitNumber}
        </p>
        <p
          className="text-museum-text-primary leading-tight font-editorial"
          style={{ fontSize: '14px' }}
        >
          {exhibit.title}
        </p>
        <p
          className="text-museum-text-muted mt-0.5 leading-tight"
          style={{ fontSize: '10px' }}
        >
          {exhibit.subtitle}
        </p>
        {exhibit.period && (
          <p
            className="text-museum-accent-dim mt-1"
            style={{ fontSize: '9px' }}
          >
            {exhibit.period}
          </p>
        )}
      </div>

      {/* View Exhibit label on hover */}
      <p
        className="mt-2 tracking-widest text-museum-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ fontSize: '8px', letterSpacing: '0.2em' }}
      >
        VIEW EXHIBIT →
      </p>
    </div>
  );
}
