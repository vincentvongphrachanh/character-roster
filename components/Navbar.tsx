import Link from "next/link";
import { logoHeight, logoHeightMobile, logoSrc, showSiteName, siteName } from "@/lib/site";
import SocialIcons from "./SocialIcons";

export type NavKey = "illustrations" | "select" | "about";

const links: { key: NavKey; href: string; label: string }[] = [
  { key: "illustrations", href: "/", label: "Illustrations" },
  { key: "select", href: "/character-select", label: "Character Select" },
  { key: "about", href: "/about", label: "About" },
];

/**
 * Site header: social icons on the left, the logo centered, and the
 * page links centered underneath. Logo file and size live in lib/site.ts.
 */
export default function Navbar({ active }: { active: NavKey }) {
  const logoSize = `clamp(${logoHeightMobile}px, 10vw, ${logoHeight}px)`;

  return (
    <header
      className="relative w-full bg-white text-black shrink-0 pt-5 md:pt-12 pb-2"
      style={{ "--logo-h": logoSize } as React.CSSProperties}
    >
      {/* On wide screens the icons sit level with the middle of the logo. */}
      <div className="px-4 md:px-0 md:absolute md:left-[26px] md:top-12 md:h-[var(--logo-h)] md:flex md:items-center">
        <SocialIcons />
      </div>

      <div className="flex flex-col items-center px-5 mt-2 md:mt-0">
        <Link href="/" aria-label={`${siteName} home`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt={`${siteName} logo`} style={{ height: "var(--logo-h)", width: "auto" }} />
        </Link>
        {showSiteName && (
          <span className="mt-3 text-[18px] tracking-[0.2em] uppercase">{siteName}</span>
        )}

        <nav className="flex flex-wrap justify-center gap-x-8 sm:gap-x-10 gap-y-2 mt-7 md:mt-9">
          {links.map((link) => {
            const isActive = active === link.key;
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-[16px] tracking-[0.04em] text-black underline-offset-[6px] decoration-1 transition-colors ${
                  isActive ? "underline" : "no-underline hover:underline"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
