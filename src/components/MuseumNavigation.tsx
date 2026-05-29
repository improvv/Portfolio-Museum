import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navSections } from '../data/sections';

interface MuseumNavigationProps {
  currentSection: string;
}

export function MuseumNavigation({ currentSection }: MuseumNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id === 'contact' ? 'section-contact' : `section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10"
      style={{
        height: '56px',
        background: 'rgba(8,7,6,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(201,164,92,0.1)',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo('entrance')}
        className="flex items-center gap-2 group"
      >
        <span
          className="font-editorial text-museum-accent group-hover:text-museum-accent-bright transition-colors"
          style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '0.04em' }}
        >
          PM
        </span>
        <span
          className="text-museum-accent-dim hidden md:block"
          style={{ fontSize: '9px', letterSpacing: '0.2em' }}
        >
          / PROJECT MUSEUM
        </span>
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-0">
        {navSections.map((item, i) => {
          const isActive =
            currentSection === item.id ||
            (item.id === 'recent' &&
              ['recent', 'local', 'ai', 'creative', 'award'].includes(currentSection));

          return (
            <div key={item.id} className="flex items-center">
              {i > 0 && (
                <span className="text-museum-accent-dim mx-3" style={{ fontSize: '10px' }}>
                  ·
                </span>
              )}
              <button
                onClick={() => scrollTo(item.id)}
                className="transition-colors duration-200"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  color: isActive ? '#C9A45C' : '#CBBBA0',
                  fontWeight: isActive ? 500 : 400,
                  padding: '4px 0',
                  borderBottom: isActive ? '1px solid rgba(201,164,92,0.5)' : '1px solid transparent',
                }}
              >
                {item.label.toUpperCase()}
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-museum-text-muted hover:text-museum-accent transition-colors"
        onClick={() => setIsMenuOpen((p) => !p)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 md:hidden flex flex-col"
          style={{
            background: 'rgba(8,7,6,0.97)',
            borderBottom: '1px solid rgba(201,164,92,0.15)',
          }}
        >
          {navSections.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-6 py-3.5 transition-colors duration-200"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  color: isActive ? '#C9A45C' : '#CBBBA0',
                  borderBottom: '1px solid rgba(201,164,92,0.06)',
                }}
              >
                {item.label.toUpperCase()}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
