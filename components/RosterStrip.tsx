"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Character } from "@/lib/types";

export default function RosterStrip({
  roster,
  currentIndex,
  onSelect,
}: {
  roster: Character[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const selected = track.children[currentIndex] as HTMLElement | undefined;
    selected?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentIndex]);

  return (
    <div className="relative z-10 px-5 sm:px-12 pb-[calc(20px+env(safe-area-inset-bottom,0px))] pt-4">
      <p className="text-[11.5px] tracking-wide text-black/50 mb-1.5 px-0.5">
        Browse the roster — click, scroll, swipe, or use ← →
      </p>
      <div
        ref={trackRef}
        role="listbox"
        aria-label="Character roster"
        className="flex gap-3 overflow-x-auto pb-2.5 pt-1.5 px-0.5 scroll-smooth"
      >
        {roster.map((char, i) => (
          <button
            key={char.id}
            role="option"
            aria-selected={i === currentIndex}
            aria-label={char.name}
            onClick={() => onSelect(i)}
            className={`relative flex-none w-20 h-20 rounded overflow-hidden border-2 transition-all duration-200 ${
              i === currentIndex
                ? "opacity-100 -translate-y-1.5 scale-105 shadow-lg"
                : "opacity-80 hover:opacity-100 hover:-translate-y-1"
            }`}
            style={{
              borderColor: i === currentIndex ? "var(--char-accent)" : "rgba(0,0,0,0.12)",
              background: "var(--char-secondary)",
            }}
          >
            <span className="absolute top-1 left-1 font-display font-bold text-[10px] px-1 rounded-sm bg-white/85 text-black z-10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Image
              src={char.thumbnail}
              alt={`${char.name} thumbnail`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
