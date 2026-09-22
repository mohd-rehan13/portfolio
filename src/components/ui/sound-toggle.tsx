"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isAudioMuted, toggleAudioMute, playClickSound } from "@/lib/sound-effects";

export const SoundToggle: React.FC = () => {
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(isAudioMuted());

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ muted: boolean }>;
      if (customEvent.detail) {
        setMuted(customEvent.detail.muted);
      }
    };

    window.addEventListener("portfolio_audio_toggle", handleToggle);
    return () => window.removeEventListener("portfolio_audio_toggle", handleToggle);
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    const nextMuted = toggleAudioMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      setTimeout(() => playClickSound(), 20);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
      <button
        onClick={handleClick}
        aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
        title={muted ? "Sound Effects: Muted (Click to enable)" : "Sound Effects: Active (Click to mute)"}
        className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg ${
          muted
            ? "bg-[#080d1a]/80 border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
            : "bg-blue-950/40 border-blue-400/40 text-blue-300 hover:border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
        }`}
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-muted-foreground transition-transform group-hover:scale-110" />
        ) : (
          <div className="relative flex items-center gap-0.5 h-3.5">
            <Volume2 className="w-4 h-4 text-blue-400 mr-1 shrink-0" />
            {/* Animated frequency equalizer bars */}
            <span className="w-0.5 h-2 bg-blue-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 h-3.5 bg-blue-300 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 h-1.5 bg-blue-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
          </div>
        )}

        <span className="text-[11px] font-bold tracking-wider uppercase pr-0.5">
          {muted ? "SFX: Off" : "SFX: On"}
        </span>
      </button>
    </div>
  );
};
