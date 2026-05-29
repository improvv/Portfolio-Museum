import { useRef, useState, useEffect, useCallback } from 'react';
import type { Exhibit } from '../types/exhibit';
import { ExhibitPedestal } from './ExhibitPedestal';

interface HorizontalGalleryProps {
  exhibits: Exhibit[];
  selectedExhibitId?: string;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

export function HorizontalGallery({
  exhibits,
  selectedExhibitId,
  onSelectExhibit,
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const CARD_WIDTH = 260;
  const CARD_GAP = 32;

  const detectCenter = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIdx = 0;
    let minDist = Infinity;
    exhibits.forEach((_, i) => {
      const cardEl = el.querySelector<HTMLElement>(`[data-card-index="${i}"]`);
      if (!cardEl) return;
      const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    });
    setCenterIndex(closestIdx);
  }, [exhibits]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', detectCenter);
    detectCenter();

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', detectCenter);
    };
  }, [detectCenter]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    setIsGrabbing(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    startScrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.8;
    containerRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsGrabbing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    startScrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const sidepadding = `max(40px, calc(50vw - ${(CARD_WIDTH + CARD_GAP) / 2}px))`;

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto hide-scrollbar py-10 items-end"
      style={{
        scrollSnapType: 'x mandatory',
        cursor: isGrabbing ? 'grabbing' : 'grab',
        gap: `${CARD_GAP}px`,
        paddingLeft: sidepadding,
        paddingRight: sidepadding,
        paddingBottom: '48px',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {exhibits.map((exhibit, i) => (
        <div
          key={exhibit.id}
          data-card-index={i}
          style={{
            flexShrink: 0,
            scrollSnapAlign: 'center',
            opacity: i === centerIndex ? 1 : 0.6,
            transform: i === centerIndex ? 'scale(1.03)' : 'scale(0.97)',
            transition: 'opacity 0.4s, transform 0.4s',
          }}
        >
          <ExhibitPedestal
            exhibit={exhibit}
            index={i}
            isSelected={selectedExhibitId === exhibit.id}
            isCenter={i === centerIndex}
            onClick={() => onSelectExhibit(exhibit)}
          />
        </div>
      ))}
    </div>
  );
}
