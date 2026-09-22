"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Sparkles, FileSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playClickSound, playHoverSound, playSwipeSound } from '@/lib/sound-effects';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  tags?: string[];
  link?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  problem?: string;
  threatModel?: string;
  architecture?: string[];
  findings?: string[];
  tools?: string[];
}

interface StaggerCardProps {
  position: number;
  item: StaggerItem;
  handleMove: (steps: number) => void;
  cardWidth: number;
  cardHeight: number;
  onItemClick?: (item: StaggerItem) => void;
}

const StaggerCard: React.FC<StaggerCardProps> = ({ 
  position, 
  item, 
  handleMove, 
  cardWidth,
  cardHeight,
  onItemClick,
}) => {
  const isCenter = position === 0;
  const absPos = Math.abs(position);

  // Symmetrical 3D Fan-out math for both Left (< 0) and Right (> 0)
  const xOffset = position * (cardWidth * 0.72);
  const yOffset = isCenter ? -10 : absPos * 18;
  const rotation = position * 3.8; // Left tilts negative (-), Right tilts positive (+)
  const scale = isCenter ? 1.03 : Math.max(0.76, 1 - absPos * 0.08);
  const zIndex = isCenter ? 30 : Math.max(1, 20 - absPos * 5);
  // Center is 1, pos 1/-1 is 0.75, pos 2/-2 is 0.45, buffer positions > 2 fade smoothly to 0
  const opacity = isCenter ? 1 : absPos > 2 ? 0 : Math.max(0.2, 0.48 - (absPos - 1) * 0.22);
  const pointerEvents = absPos > 2 ? "none" : "auto";

  return (
    <div
      onClick={() => {
        if (isCenter && onItemClick) {
          playClickSound();
          onItemClick(item);
        } else if (absPos <= 2) {
          playSwipeSound();
          handleMove(position);
        }
      }}
      onMouseEnter={() => absPos <= 2 && playHoverSound()}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-6 sm:p-7 transition-all duration-500 ease-out select-none flex flex-col justify-between rounded-3xl group",
        isCenter 
          ? "bg-[#090f20] text-white border-2 border-blue-400 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(59,130,246,0.35)] ring-1 ring-blue-400/40" 
          : "bg-[#080d1a]/25 text-[#8a9cc4] border border-white/10 backdrop-blur-sm hover:opacity-80 hover:bg-[#0c152a]/60 hover:border-blue-400/40"
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex,
        opacity,
        pointerEvents,
        clipPath: `polygon(30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, calc(100% - 30px) 100%, 30px 100%, 0 100%, 0 30px)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${xOffset}px)
          translateY(${yOffset}px)
          rotate(${rotation}deg)
          scale(${scale})
        `,
        transitionProperty: "transform, opacity, background-color, border-color, box-shadow",
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {/* ── Animated Cyber Corner Beam (Top-Right) ── */}
      <div
        className="absolute overflow-hidden pointer-events-none origin-top-right rotate-45"
        style={{
          right: -2,
          top: 28,
          width: SQRT_5000,
          height: 2.5,
        }}
      >
        <span
          className={cn(
            "block w-full h-full transition-colors duration-500",
            isCenter ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)]" : "bg-white/10"
          )}
        />
        {isCenter && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200 to-transparent animate-[shimmer_1.5s_infinite_linear] opacity-100" />
        )}
      </div>

      {/* ── Animated Cyber Corner Beam (Top-Left - Left Transaction Effect) ── */}
      <div
        className="absolute overflow-hidden pointer-events-none origin-top-left -rotate-45"
        style={{
          left: -2,
          top: 28,
          width: SQRT_5000,
          height: 2.5,
        }}
      >
        <span
          className={cn(
            "block w-full h-full transition-colors duration-500",
            isCenter ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)]" : "bg-white/10"
          )}
        />
        {isCenter && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200 to-transparent animate-[shimmer_1.5s_infinite_linear] opacity-100" />
        )}
      </div>

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          {item.icon && (
            <div className={cn(
              "p-3 rounded-2xl transition-all duration-500 shrink-0",
              isCenter 
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/40 shadow-[0_0_18px_rgba(59,130,246,0.3)]" 
                : "bg-white/5 text-[#8a9cc4] border border-white/10"
            )}>
              {item.icon}
            </div>
          )}
          {item.badge && (
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-500 flex items-center gap-1.5",
              isCenter 
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]" 
                : "bg-white/5 text-slate-400 border border-white/10"
            )}>
              {isCenter && <Sparkles className="w-3 h-3 text-blue-300 animate-pulse" />}
              {item.badge}
            </span>
          )}
        </div>

        <h3 className={cn(
          "text-lg sm:text-xl font-black tracking-tight mb-1.5 leading-snug line-clamp-2 transition-colors duration-500",
          isCenter ? "text-white" : "text-slate-200"
        )}>
          {item.title}
        </h3>

        {item.subtitle && (
          <p className={cn(
            "text-[11px] font-bold uppercase tracking-wider mb-2.5 transition-colors duration-500",
            isCenter ? "text-blue-400" : "text-blue-400/70"
          )}>
            {item.subtitle}
          </p>
        )}

        {item.description && (
          <p className={cn(
            "text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4 font-normal transition-colors duration-500",
            isCenter ? "text-slate-200 font-medium" : "text-[#8a9cc4]"
          )}>
            {item.description}
          </p>
        )}
      </div>

      {/* Footer / Tags / Link */}
      <div className={cn(
        "pt-3 border-t mt-auto transition-colors duration-500",
        isCenter ? "border-blue-500/25" : "border-white/10"
      )}>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {item.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-lg transition-all duration-500",
                  isCenter 
                    ? "bg-blue-500/20 text-blue-200 border border-blue-400/40" 
                    : "bg-white/5 text-slate-400 border border-white/5"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {onItemClick ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                onItemClick(item);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all duration-300",
                isCenter 
                  ? "bg-blue-500/25 text-blue-200 hover:bg-blue-500/40 hover:text-white border border-blue-400/50 shadow-[0_0_12px_rgba(59,130,246,0.25)]" 
                  : "bg-white/5 text-slate-400 hover:text-slate-200"
              )}
            >
              <span>Security Dossier</span>
              <FileSearch className="w-3.5 h-3.5 text-blue-400" />
            </button>
          ) : <div />}

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
              }}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-bold transition-all duration-300",
                isCenter 
                  ? "text-blue-300 hover:text-white hover:translate-x-1" 
                  : "text-slate-400 hover:text-blue-300"
              )}
            >
              <span>{item.link.includes("github") ? "GitHub" : "Open"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface StaggerCarouselProps {
  items: StaggerItem[];
  containerHeight?: number;
  onItemClick?: (item: StaggerItem) => void;
}

export const StaggerCarousel: React.FC<StaggerCarouselProps> = ({ 
  items,
  containerHeight = 500,
  onItemClick,
}) => {
  const [cardWidth, setCardWidth] = useState(360);
  const [cardHeight, setCardHeight] = useState(390);

  // Helper to ensure an odd count >= 9 so mid is an exact integer and buffers (-3, +3) always exist symmetrically
  const prepareList = (sourceItems: StaggerItem[]) => {
    if (!sourceItems || sourceItems.length === 0) return [];
    const targetCount = Math.max(9, (sourceItems.length * 2) | 1);
    const list: StaggerItem[] = [];
    for (let i = 0; i < targetCount; i++) {
      const original = sourceItems[i % sourceItems.length];
      const cycle = Math.floor(i / sourceItems.length);
      list.push({
        ...original,
        id: cycle === 0 ? original.id : `${original.id}-slot-${i}`,
      });
    }
    return list;
  };

  const [itemList, setItemList] = useState<StaggerItem[]>(() => prepareList(items));
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const lastWheelTime = useRef<number>(0);

  useEffect(() => {
    setItemList(prepareList(items));
  }, [items]);

  const handleMove = (steps: number) => {
    if (steps === 0) return;
    const newList = [...itemList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push(item);
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift(item);
      }
    }
    setItemList(newList);
  };

  // Horizontal mouse-wheel scroll handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 260) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 25) {
      lastWheelTime.current = now;
      if (delta > 0) {
        handleMove(1);
      } else {
        handleMove(-1);
      }
    }
  };

  // Touch & Swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleMove(1);
      } else {
        handleMove(-1);
      }
    }
    touchStartX.current = null;
  };

  // Mouse drag gesture
  const mouseStartX = useRef<number | null>(null);
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleMove(1);
      } else {
        handleMove(-1);
      }
    }
    mouseStartX.current = null;
  };

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setCardWidth(360);
        setCardHeight(390);
      } else if (w >= 640) {
        setCardWidth(320);
        setCardHeight(370);
      } else {
        setCardWidth(280);
        setCardHeight(350);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative w-full overflow-hidden flex items-center justify-center py-6 cursor-grab active:cursor-grabbing select-none"
      style={{ height: containerHeight }}
    >
      {itemList.map((item, index) => {
        const mid = (itemList.length - 1) / 2;
        const position = Math.round(index - mid);

        // Render visible cards (-2 to +2) plus buffer cards (-3 and +3) so entrance and exit animations glide smoothly
        if (Math.abs(position) > 3) return null;

        return (
          <StaggerCard
            key={item.id}
            item={item}
            handleMove={handleMove}
            position={position}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            onItemClick={onItemClick}
          />
        );
      })}

      {/* Subtle Horizontal Scroll Indicator Pill */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-[#8a9cc4] text-[11px] font-semibold tracking-wider uppercase pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span>Scroll or Swipe Horizontally</span>
      </div>
    </div>
  );
};
