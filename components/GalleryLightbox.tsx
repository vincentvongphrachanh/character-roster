"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { galleryLabels, type Character, type GalleryCategory } from "@/lib/types";

export default function GalleryLightbox({ character }: { character: Character }) {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = Object.keys(character.gallery) as GalleryCategory[];
  const populated = categories.filter((key) => (character.gallery[key]?.length ?? 0) > 0);

  if (populated.length === 0) return null;

  return (
    <>
      {populated.map((key) => (
        <div key={key} className="mb-9">
          <h3 className="text-[12.5px] tracking-wide uppercase mb-3" style={{ color: "rgba(243,241,236,0.62)" }}>
            {galleryLabels[key]}
          </h3>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {character.gallery[key]!.map((src, i) => (
              <button
                key={src}
                onClick={() => setOpen({ src, alt: `${character.name} — ${galleryLabels[key]} ${i + 1}` })}
                className="relative aspect-[3/4] rounded-[3px] overflow-hidden border cursor-zoom-in transition-colors"
                style={{ borderColor: "rgba(243,241,236,0.14)", background: "var(--char-secondary)" }}
              >
                <Image src={src} alt={`${character.name} ${galleryLabels[key]} ${i + 1}`} fill sizes="200px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/90"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close image"
            className="absolute top-[calc(20px+env(safe-area-inset-top,0px))] right-5 w-10 h-10 rounded-full border flex items-center justify-center"
            style={{ borderColor: "rgba(243,241,236,0.14)" }}
          >
            ✕
          </button>
          <div className="relative max-w-[88vw] max-h-[82vh] w-[700px] aspect-[3/4]" onClick={(e) => e.stopPropagation()}>
            <Image src={open.src} alt={open.alt} fill sizes="700px" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
