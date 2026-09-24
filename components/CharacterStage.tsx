"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Character } from "@/lib/types";

export default function CharacterStage({
  character,
  direction,
  onPrev,
  onNext,
}: {
  character: Character;
  direction: "left" | "right";
  onPrev: () => void;
  onNext: () => void;
}) {
  const isPortraitLike = character.displayMode === "portrait" || character.displayMode === "bust";
  const slideOffset = direction === "right" ? 40 : -40;

  return (
    <div className="relative h-full w-full flex items-end justify-center overflow-hidden">
      <button
        onClick={onPrev}
        aria-label="Previous character"
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-5 z-20 w-11 h-11 rounded-full border flex items-center justify-center text-lg transition-transform hover:scale-105 bg-white/90 border-black/15 text-black"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        aria-label="Next character"
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5 z-20 w-11 h-11 rounded-full border flex items-center justify-center text-lg transition-transform hover:scale-105 bg-white/90 border-black/15 text-black"
      >
        ›
      </button>

      <div className={`relative h-full w-full flex ${isPortraitLike ? "items-center mb-[4%]" : "items-end"} justify-center`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={character.id}
            initial={{ opacity: 0, x: slideOffset, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -slideOffset, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.3, 1] }}
            className={`relative ${isPortraitLike ? "h-[74%]" : "h-[92%]"} w-auto`}
          >
            <Image
              src={character.mainArtwork}
              alt={`${character.name} artwork placeholder`}
              width={520}
              height={isPortraitLike ? 620 : 760}
              priority
              className="h-full w-auto object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-[10%] right-[6%] text-[10.5px] tracking-widest px-2.5 py-1.5 rounded-sm border border-black/15 bg-white/90 text-black/50 pointer-events-none">
        PLACEHOLDER ARTWORK
      </div>
    </div>
  );
}
