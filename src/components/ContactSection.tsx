import { Mail, GitBranch } from 'lucide-react';

export function ContactSection() {
  return (
    <section
      id="section-contact"
      className="relative flex flex-col items-center justify-center py-24 px-6"
      style={{
        borderTop: '1px solid rgba(201,164,92,0.08)',
        background:
          'radial-gradient(ellipse at 50% 100%, rgba(74,18,14,0.12) 0%, transparent 60%)',
      }}
    >
      <p
        className="text-museum-accent-dim tracking-widest mb-4"
        style={{ fontSize: '9px', letterSpacing: '0.3em' }}
      >
        GUESTBOOK
      </p>

      <h2
        className="font-editorial text-museum-text-primary text-center"
        style={{ fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 300, lineHeight: 1.1 }}
      >
        Let's Connect
      </h2>

      <div
        className="my-6"
        style={{
          width: '50px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #C9A45C, transparent)',
        }}
      />

      <p
        className="text-museum-text-muted text-center max-w-sm leading-relaxed mb-10"
        style={{ fontSize: '14px', fontWeight: 300 }}
      >
        전시를 방문해 주셔서 감사합니다.
        궁금하신 점이나 협업 제안이 있으시면 편하게 연락해 주세요.
      </p>

      {/* Contact links */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="mailto:jinjeong619@gmail.com"
          className="flex items-center gap-2.5 px-6 py-3 transition-all duration-300 group"
          style={{
            border: '1px solid rgba(201,164,92,0.3)',
            color: '#CBBBA0',
            fontSize: '12px',
            letterSpacing: '0.1em',
          }}
        >
          <Mail size={14} className="group-hover:text-museum-accent transition-colors" />
          <span className="group-hover:text-museum-accent transition-colors">
            jinjeong619@gmail.com
          </span>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-6 py-3 transition-all duration-300 group"
          style={{
            border: '1px solid rgba(201,164,92,0.3)',
            color: '#CBBBA0',
            fontSize: '12px',
            letterSpacing: '0.1em',
          }}
        >
          <GitBranch size={14} className="group-hover:text-museum-accent transition-colors" />
          <span className="group-hover:text-museum-accent transition-colors">GitHub</span>
        </a>
      </div>

      {/* Footer note */}
      <div className="mt-16 text-center">
        <div
          className="mb-4 mx-auto"
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(201,164,92,0.2)',
          }}
        />
        <p
          className="font-editorial text-museum-accent-dim"
          style={{ fontSize: '13px', fontStyle: 'italic' }}
        >
          Project Museum — Jinjeong's Digital Exhibition
        </p>
        <p className="text-museum-accent-dim mt-1" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
          © 2026 Jinjeong. All exhibits reserved.
        </p>
      </div>
    </section>
  );
}
