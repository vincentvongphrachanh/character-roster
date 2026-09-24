import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import GalleryLightbox from "@/components/GalleryLightbox";
import { characters, getCharacter, getCharacterIndex } from "@/lib/characters";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const character = getCharacter(params.slug);
  if (!character) return {};
  return {
    title: `${character.name} — Roster`,
    description: character.description,
  };
}

export default function CharacterDetailPage({ params }: { params: { slug: string } }) {
  const character = getCharacter(params.slug);
  if (!character) notFound();

  const index = getCharacterIndex(params.slug);
  const isPortraitLike = character.displayMode === "portrait" || character.displayMode === "bust";

  const style = {
    "--char-bg": character.theme.backgroundColor,
    "--char-accent": character.theme.accentColor,
    "--char-secondary": character.theme.secondaryColor ?? "#1c1a22",
    "--char-text": character.theme.textColor,
  } as React.CSSProperties;

  return (
    <div style={style} className="min-h-screen" data-theme-root>
      <div
        className="min-h-screen"
        style={{ background: "var(--char-bg)", color: "var(--char-text)" }}
      >
        <Navbar active="select" />

        <div className="px-5 sm:px-12 pt-[74px] sm:pt-24">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px]" style={{ color: "rgba(243,241,236,0.62)" }}>
            ‹ Back to roster
          </Link>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-[minmax(260px,38%)_1fr] items-center gap-6 px-5 sm:px-12 pt-6 pb-10 min-h-[78vh] overflow-hidden">
          <div
            className="absolute -inset-[10%] pointer-events-none"
            style={{ background: `radial-gradient(60% 60% at 65% 45%, var(--char-secondary) 0%, transparent 70%)` }}
          />
          <div className="relative z-[2] order-2 md:order-1">
            <div className="text-[15px] mb-2" style={{ color: "var(--char-accent)" }}>
              {String(index + 1).padStart(2, "0")} / {String(characters.length).padStart(2, "0")}
            </div>
            <h1 className="font-display font-extrabold uppercase leading-[0.94] text-[clamp(34px,6.5vw,78px)]">
              {character.name}
            </h1>
            <p className="italic text-base mb-5 mt-1.5" style={{ color: "var(--char-accent)" }}>
              {character.title}
            </p>
            <p className="max-w-[52ch] text-[15.5px] leading-relaxed" style={{ color: "rgba(243,241,236,0.62)" }}>
              {character.description}
            </p>
          </div>
          <div className={`relative z-[2] order-1 md:order-2 flex justify-center ${isPortraitLike ? "items-center" : "items-end"} h-[46vh] md:h-[78vh]`}>
            <div className="relative h-full w-auto" style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.45))" }}>
              <Image
                src={character.mainArtwork}
                alt={`${character.name} main artwork placeholder`}
                width={520}
                height={isPortraitLike ? 620 : 760}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
            <div
              className="absolute -bottom-1 text-[10.5px] tracking-widest px-2.5 py-1.5 rounded-sm border"
              style={{ borderColor: "rgba(243,241,236,0.14)", background: "rgba(12,11,16,0.55)", color: "rgba(243,241,236,0.62)" }}
            >
              PLACEHOLDER ARTWORK
            </div>
          </div>
        </div>

        {character.lore && (
          <section className="max-w-[1180px] mx-auto px-5 sm:px-12 py-10 border-t" style={{ borderColor: "rgba(243,241,236,0.14)" }}>
            <h2 className="font-display font-bold uppercase text-2xl mb-4">Background</h2>
            <p className="max-w-[68ch] text-[15px] leading-relaxed whitespace-pre-line" style={{ color: "rgba(243,241,236,0.62)" }}>
              {character.lore}
            </p>
          </section>
        )}

        <section className="max-w-[1180px] mx-auto px-5 sm:px-12 py-10 border-t" style={{ borderColor: "rgba(243,241,236,0.14)" }}>
          <h2 className="font-display font-bold uppercase text-2xl mb-4">Gallery</h2>
          <GalleryLightbox character={character} />
        </section>

        {character.designNotes && (
          <section className="max-w-[1180px] mx-auto px-5 sm:px-12 py-10 border-t" style={{ borderColor: "rgba(243,241,236,0.14)" }}>
            <h2 className="font-display font-bold uppercase text-2xl mb-4">Design Notes</h2>
            <p className="max-w-[68ch] text-[15px] leading-relaxed whitespace-pre-line" style={{ color: "rgba(243,241,236,0.62)" }}>
              {character.designNotes}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
