import { ChevronDown } from 'lucide-react';

interface EntranceHallProps {
  onEnter: () => void;
}

export function EntranceHall({ onEnter }: EntranceHallProps) {
  return (
    <section
      id="section-entrance"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% -10%, #4A120E 0%, #11100E 42%, #080706 100%)',
      }}
    >
      {/* Subtle architectural columns (decorative) */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-8 md:px-20 opacity-20">
        <div
          className="w-px self-stretch"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,164,92,0.4) 20%, rgba(201,164,92,0.4) 80%, transparent)' }}
        />
        <div
          className="w-px self-stretch"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,164,92,0.4) 20%, rgba(201,164,92,0.4) 80%, transparent)' }}
        />
      </div>

      {/* Floor reflection line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,164,92,0.2) 30%, rgba(201,164,92,0.2) 70%, transparent)' }}
      />

      {/* Center spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,164,92,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Pre-title */}
        <p
          className="text-museum-accent-dim tracking-widest mb-6"
          style={{ fontSize: '9px', letterSpacing: '0.35em' }}
        >
          WELCOME TO
        </p>

        {/* Main title */}
        <h1
          className="font-editorial text-museum-text-primary"
          style={{
            fontSize: 'clamp(52px, 12vw, 110px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
          }}
        >
          PROJECT
          <br />
          <span
            style={{
              color: '#C9A45C',
              WebkitTextStroke: '0px',
            }}
          >
            MUSEUM
          </span>
        </h1>

        {/* Gold divider */}
        <div
          className="my-7"
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A45C, transparent)',
          }}
        />

        {/* Subtitle */}
        <p
          className="text-museum-text-muted tracking-widest"
          style={{ fontSize: '11px', letterSpacing: '0.25em' }}
        >
          JINJEONG'S DIGITAL EXHIBITION
        </p>

        {/* Description */}
        <p
          className="text-museum-text-muted mt-6 leading-relaxed max-w-md"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          제가 만든 프로젝트와 경험을 하나의 전시처럼 둘러볼 수 있는 디지털 포트폴리오입니다.
          각 전시품은 제가 발견한 문제, 설계한 해결책, 그리고 직접 만들어낸 결과의 기록입니다.
        </p>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          className="mt-10 group relative px-8 py-3 text-museum-accent transition-all duration-300 hover:text-museum-bg"
          style={{
            fontSize: '11px',
            letterSpacing: '0.22em',
            border: '1px solid rgba(201,164,92,0.5)',
            overflow: 'hidden',
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: '#C9A45C' }}
          />
          <span className="relative">ENTER EXHIBITION →</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <span
          className="text-museum-text-muted tracking-widest"
          style={{ fontSize: '8px', letterSpacing: '0.2em' }}
        >
          SCROLL
        </span>
        <ChevronDown size={14} className="text-museum-accent animate-bounce" />
      </div>
    </section>
  );
}
