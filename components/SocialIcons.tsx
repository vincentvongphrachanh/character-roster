import { socialLinks } from "@/lib/social-links";

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="w-10 h-10 flex items-center justify-center rounded-full text-black hover:opacity-50 transition-opacity"
    >
      {children}
    </a>
  );
}

/** Simple pictogram glyphs -- not brand wordmarks, just linkable icons. */
export default function SocialIcons({ size = 22 }: { size?: number }) {
  const s = size;
  return (
    <div className="flex items-center gap-2">
      <IconLink href={socialLinks.instagram} label="Instagram">
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      </IconLink>
      <IconLink href={socialLinks.vgen} label="VGen">
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9.2" />
          <path d="M8 8.5 L12 15.5 L16 8.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconLink>
      <IconLink href={socialLinks.kofi} label="Ko-fi">
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" strokeLinejoin="round" />
          <path d="M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17" />
          <path d="M8 4.5c-.6.7-.6 1.3 0 2M11.5 4.5c-.6.7-.6 1.3 0 2" strokeLinecap="round" />
        </svg>
      </IconLink>
      <IconLink href={socialLinks.email} label="Email">
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2.4" />
          <path d="M4 6.5 12 13 20 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconLink>
    </div>
  );
}
