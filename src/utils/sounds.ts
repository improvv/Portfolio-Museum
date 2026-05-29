type SoundName = 'click' | 'transition' | 'panel-open' | 'panel-close' | 'hover';

const FILE: Record<SoundName, string> = {
  'click':       '/sounds/sfx-transition.wav',
  'transition':  '/sounds/sfx-click.wav',
  'panel-open':  '/sounds/sfx-panel.ogg',
  'panel-close': '/sounds/sfx-panel.ogg',
  'hover':       '/sounds/sfx-hover.mp3',
};

const VOLUME: Record<SoundName, number> = {
  'click':       0.28,
  'transition':  0.40,
  'panel-open':  0.42,
  'panel-close': 0.32,
  'hover':       0.18,
};

const pool = new Map<SoundName, HTMLAudioElement>();

export function initSounds(): void {
  if (typeof window === 'undefined') return;
  (Object.keys(FILE) as SoundName[]).forEach(name => {
    const el = new Audio(FILE[name]);
    el.preload = 'auto';
    pool.set(name, el);
  });
}

export function playSound(name: SoundName): void {
  const el = pool.get(name);
  if (!el) return;
  el.currentTime = 0;
  el.volume = VOLUME[name];
  el.play().catch(() => {});
}

// Hover sound with cooldown to prevent rapid-fire triggering
let hoverCooldown = false;
export function playHover(): void {
  if (hoverCooldown) return;
  hoverCooldown = true;
  setTimeout(() => { hoverCooldown = false; }, 80);
  playSound('hover');
}
