import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

export type NavKey = "illustrations" | "select" | "about";

/**
 * Site header. Not fixed/floating -- it takes real space at the top
 * of the page, the same way it does on sonialai.com. Swap
 * /public/brand/logo.svg for the artist's real logo file (SVG or
 * transparent PNG both work) and update the path below if the
 * filename changes.
 */
export default function Navbar({ active }: { active: NavKey }) {
  const linkClass = (key: NavKey) =>
    `text-[13px] tracking-wide pb-1 border-b transition-colors ${
      active === key
        ? "text-black border-black"
        : "text-black/50 border-transparent hover:text-black"
    }`;

  return (
    <header className="w-full bg-white text-black shrink-0">
      <div className="flex items-center px-5 sm:px-12 pt-4">
        <SocialIcons />
      </div>
      <div className="flex flex-col items-center pt-1 pb-4 px-5">
        <Link href="/" className="flex flex-col items-center gap-2">
          <Image src="/brand/logo.svg" alt="xmimiso logo" width={72} height={72} priority />
          <span className="font-display font-bold text-sm tracking-[0.25em]">XMIMISO</span>
        </Link>
        <nav className="flex gap-5 sm:gap-9 mt-4">
          <Link href="/" className={linkClass("illustrations")}>
            Illustrations
          </Link>
          <Link href="/character-select" className={linkClass("select")}>
            Character Select
          </Link>
          <Link href="/about" className={linkClass("about")}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
