"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { illustrations } from "@/lib/illustrations";

export default function IllustrationsPage() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (open === null) return;
      if (e.key === "ArrowDown") setOpen((i) => (i === null ? i : Math.min(i + 1, illustrations.length - 1)));
      if (e.key === "ArrowUp") setOpen((i) => (i === null ? i : Math.max(i - 1, 0)));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen" style={{ background: "var(--char-bg, #0c0b10)", color: "var(--char-text, #f3f1ec)" }}>
      <Navbar active="illustrations" />

      <div className="max-w-[760px] mx-auto px-5 sm:px-12 pt-28 pb-24">
        <h1 className="font-display font-extrabold uppercase text-[clamp(32px,5vw,48px)] mb-2">
          Illustrations
        </h1>
        <p className="text-[15px] mb-10" style={{ color: "rgba(243,241,236,0.62)" }}>
          Standalone artwork, separate from the original character roster. Click any piece to view it larger.
        </p>

        <div className="flex flex-col gap-14">
          {illustrations.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setOpen(i)}
              className="text-left group"
            >
              <div
                className="relative w-full overflow-hidden rounded-sm border"
                style={{ borderColor: "rgba(243,241,236,0.14)", aspectRatio: "3 / 4" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="760px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-3">
                <p className="font-display text-lg">{item.name}</p>
                {item.note && (
                  <p className="text-[13px]" style={{ color: "rgba(243,241,236,0.5)" }}>
                    {item.note}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close image"
            className="fixed top-[calc(20px+env(safe-area-inset-top,0px))] right-5 w-10 h-10 rounded-full border flex items-center justify-center text-white"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-[720px] my-auto"
            style={{ aspectRatio: "3 / 4" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={illustrations[open].image}
              alt={illustrations[open].name}
              fill
              sizes="720px"
              className="object-contain"
            />
          </div>
          <p className="text-white font-display text-lg mt-4">{illustrations[open].name}</p>
          <p className="text-white/50 text-[12px] mt-1">Use ↑ / ↓ to browse, Esc to close</p>
        </div>
      )}
    </div>
  );
}
