"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { illustrations } from "@/lib/illustrations";

export default function IllustrationsPage() {
  const [open, setOpen] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  function showNext() {
    setOpen((i) => (i === null ? i : (i + 1) % illustrations.length));
  }
  function showPrev() {
    setOpen((i) => (i === null ? i : (i - 1 + illustrations.length) % illustrations.length));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) {
      if (dx < 0) showNext();
      else showPrev();
    }
    touchStartX.current = null;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar active="illustrations" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-12 pt-6 pb-24">
        <h1 className="font-display font-extrabold uppercase text-[clamp(30px,4.5vw,44px)] mb-2 text-black">
          Illustrations
        </h1>
        <p className="text-[15px] mb-10 text-black/55">
          Standalone artwork, separate from the original character roster. Click any piece to view it larger.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
          {illustrations.map((item, i) => (
            <button key={item.id} onClick={() => setOpen(i)} className="text-left group">
              <div className="relative w-full overflow-hidden rounded-sm border border-black/10 bg-black/[0.03]" style={{ aspectRatio: "3 / 4" }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-2.5">
                <p className="font-display text-[15px] leading-tight text-black">{item.name}</p>
                {item.note && <p className="text-[12px] text-black/45">{item.note}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setOpen(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close image"
            className="fixed top-[calc(20px+env(safe-area-inset-top,0px))] right-5 w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center z-10"
          >
            ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous illustration"
            className="fixed top-1/2 -translate-y-1/2 left-2 sm:left-6 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center text-lg z-10"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next illustration"
            className="fixed top-1/2 -translate-y-1/2 right-2 sm:right-6 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center text-lg z-10"
          >
            ›
          </button>

          <div className="flex flex-col items-center max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <div className="relative max-w-[85vw] max-h-[78vh] w-[640px]" style={{ aspectRatio: "3 / 4" }}>
              <Image src={illustrations[open].image} alt={illustrations[open].name} fill sizes="640px" className="object-contain" />
            </div>
            <p className="text-white font-display text-lg mt-4">{illustrations[open].name}</p>
            <p className="text-white/45 text-[12px] mt-1">
              {open + 1} / {illustrations.length} — use ← / → or swipe, Esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
