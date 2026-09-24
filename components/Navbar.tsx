import Link from "next/link";
import SocialIcons from "./SocialIcons";

export type NavKey = "illustrations" | "select" | "about" | "contact";

export default function Navbar({ active }: { active: NavKey }) {
  const linkClass = (key: NavKey) =>
    `text-[13px] tracking-wide pb-2 border-b transition-colors ${
      active === key
        ? "text-[var(--char-text)] border-[var(--char-accent)]"
        : "text-[var(--char-text)]/60 border-transparent hover:text-[var(--char-text)]"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-12 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-3.5 gap-4">
      <div className="flex items-center gap-4 sm:gap-6 min-w-0">
        <SocialIcons />
        <Link href="/" className="font-display font-extrabold text-xl whitespace-nowrap hidden sm:block">
          ROSTER<span style={{ color: "var(--char-accent)" }}>.</span>
        </Link>
      </div>
      <div className="flex gap-3.5 sm:gap-8 shrink-0">
        <Link href="/illustrations" className={linkClass("illustrations")}>
          Illustrations
        </Link>
        <Link href="/" className={linkClass("select")}>
          Character Select
        </Link>
        <Link href="/about" className={linkClass("about")}>
          About
        </Link>
        <Link href="/contact" className={linkClass("contact")}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
