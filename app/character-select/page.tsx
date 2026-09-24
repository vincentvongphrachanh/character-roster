"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CharacterStage from "@/components/CharacterStage";
import RosterStrip from "@/components/RosterStrip";
import { characters } from "@/lib/characters";

export default function CharacterSelectPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const touchStartX = useRef<number | null>(null);

  const character = characters[index];

  const goTo = useCallback(
    (next: number) => {
      const n = characters.length;
      const wrapped = ((next % n) + n) % n;
      setDirection(wrapped > index || (index === n - 1 && wrapped === 0) ? "right" : "left");
      setIndex(wrapped);
    },
    [index]
  );

  // Only the accent color is character-specific now; background stays white.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--char-accent", character.theme.accentColor);
  }, [character]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, goTo]);

  useEffect(() => {
    const n = characters.length;
    const neighbors = [characters[(index + 1) % n], characters[(index - 1 + n) % n]];
    neighbors.forEach((c) => {
      const img = new window.Image();
      img.src = c.mainArtwork;
    });
  }, [index]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) {
      goTo(dx < 0 ? index + 1 : index - 1);
    }
    touchStartX.current = null;
  }

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col bg-white text-black">
      <Navbar active="select" />

      <div className="flex flex-col flex-1 min-h-0">
        <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[minmax(260px,34%)_1fr] items-center gap-6 px-5 sm:px-12 pt-4">
          {/* Info column */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-2.5 text-[13px] mb-3.5" style={{ color: "var(--char-accent)" }}>
              <span className="text-black/45">
                {String(index + 1).padStart(2, "0")} / {String(characters.length).padStart(2, "0")}
              </span>
              <span className="w-8 h-px bg-current opacity-60" />
              ORIGINAL CHARACTER ROSTER
            </div>
            <h1 className="font-display font-extrabold uppercase leading-[0.92] text-[clamp(34px,7vw,80px)] -tracking-[0.01em] text-black">
              {character.name}
            </h1>
            <p className="italic text-[15px] sm:text-lg mt-2.5 mb-5" style={{ color: "var(--char-accent)" }}>
              {character.title}
            </p>
            <p className="max-w-[46ch] text-[15.5px] leading-relaxed mb-7 text-black/60">
              {character.description}
            </p>
            <Link
              href={`/characters/${character.slug}`}
              className="inline-block font-semibold text-sm tracking-wide px-6 py-3.5 rounded-sm border border-black text-black transition-colors hover:bg-black hover:text-white"
            >
              Explore Character
            </Link>
          </div>

          {/* Stage column */}
          <div
            className="relative order-1 md:order-2 h-[36vh] md:h-full"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <CharacterStage
              character={character}
              direction={direction}
              onPrev={() => goTo(index - 1)}
              onNext={() => goTo(index + 1)}
            />
          </div>
        </div>

        <RosterStrip roster={characters} currentIndex={index} onSelect={(i) => goTo(i)} />
      </div>
    </div>
  );
}
