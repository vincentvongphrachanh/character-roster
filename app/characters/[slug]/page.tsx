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
    title: `${character.name} — xmimiso`,
    description: character.description,
  };
}

export default function CharacterDetailPage({ params }: { params: { slug: string } }) {
  const character = getCharacter(params.slug);
  if (!character) notFound();

  const index = getCharacterIndex(params.slug);
  const isPortraitLike = character.displayMode === "portrait" || character.displayMode === "bust";

  return (
    <div className="min-h-screen bg-white text-black" style={{ "--char-accent": character.theme.accentColor } as React.CSSProperties}>
      <Navbar active="select" />

      <div className="px-5 sm:px-12 pt-5">
        <Link href="/character-select" className="inline-flex items-center gap-2 text-[13px] text-black/55 hover:text-black">
          ‹ Back to roster
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(260px,38%)_1fr] items-center gap-6 px-5 sm:px-12 pt-6 pb-10 min-h-[70vh]">
        <div className="order-2 md:order-1">
          <div className="text-[15px] mb-2" style={{ color: "var(--char-accent)" }}>
            {String(index + 1).padStart(2, "0")} / {String(characters.length).padStart(2, "0")}
          </div>
          <h1 className="font-display font-extrabold uppercase leading-[0.94] text-[clamp(30px,6vw,72px)] text-black">
            {character.name}
          </h1>
          <p className="italic text-base mb-5 mt-1.5" style={{ color: "var(--char-accent)" }}>
            {character.title}
          </p>
          <p className="max-w-[52ch] text-[15.5px] leading-relaxed text-black/60">
            {character.description}
          </p>
        </div>
        <div className={`relative order-1 md:order-2 flex justify-center ${isPortraitLike ? "items-center" : "items-end"} h-[42vh] md:h-[68vh]`}>
          <div className="relative h-full w-auto">
            <Image
              src={character.mainArtwork}
              alt={`${character.name} main artwork placeholder`}
              width={520}
              height={isPortraitLike ? 620 : 760}
              priority
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="absolute -bottom-1 text-[10.5px] tracking-widest px-2.5 py-1.5 rounded-sm border border-black/15 bg-white/90 text-black/50">
            PLACEHOLDER ARTWORK
          </div>
        </div>
      </div>

      {character.lore && (
        <section className="max-w-[1180px] mx-auto px-5 sm:px-12 py-10 border-t border-black/10">
          <h2 className="font-display font-bold uppercase text-2xl mb-4 text-black">Background</h2>
          <p className="max-w-[68ch] text-[15px] leading-relaxed whitespace-pre-line text-black/60">
            {character.lore}
          </p>
        </section>
      )}

      <section className="max-w-[1180px] mx-auto px-5 sm:px-12 py-10 border-t border-black/10">
        <h2 className="font-display font-bold uppercase text-2xl mb-4 text-black">Gallery</h2>
        <GalleryLightbox character={character} />
      </section>

      {character.designNotes && (
        <section className="max-w-[1180px] mx-auto px-5 sm:px-12 py-10 border-t border-black/10">
          <h2 className="font-display font-bold uppercase text-2xl mb-4 text-black">Design Notes</h2>
          <p className="max-w-[68ch] text-[15px] leading-relaxed whitespace-pre-line text-black/60">
            {character.designNotes}
          </p>
        </section>
      )}
    </div>
  );
}
