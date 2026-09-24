"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion, type PanInfo } from "motion/react";
import type { Illustration } from "@/lib/illustrations";

export type GalleryItem = Illustration & { width: number; height: number };

/** How the enlarged image slides in and out when moving between pieces. */
const slide = {
  enter: (dir: number) => ({ x: dir * 90, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -90, opacity: 0 }),
};
const slideTransition = {
  x: { type: "spring" as const, stiffness: 300, damping: 34 },
  opacity: { duration: 0.22 },
};
const ease = [0.22, 1, 0.36, 1] as const;

const GAP_X = 20;
/** Image sizes used in the gallery grid (the viewer reuses these as an instant preview). */
const THUMB_SIZES = "(max-width: 599px) 100vw, (max-width: 999px) 60vw, 40vw";
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Target row height for a given gallery width (about 5 tall pieces per row on desktop). */
function targetRowHeight(width: number) {
  if (width < 600) return width * 1.25; // phones: one piece per row
  if (width < 1000) return width * 0.42; // tablets: 2-3 per row
  return width * 0.27; // desktop: ~5 tall pieces per row
}

type Row = { items: { index: number; width: number }[]; height: number };

/**
 * Splits the pieces into rows that fill the full width, keeping every
 * row as close as possible to the target height. Each piece keeps its
 * own shape, so wide and tall artwork can share a row.
 */
function buildRows(ratios: number[], width: number): Row[] {
  const target = targetRowHeight(width);
  const n = ratios.length;
  const best = new Array<number>(n + 1).fill(Infinity);
  const from = new Array<number>(n + 1).fill(0);
  best[0] = 0;
  const heightOf = (start: number, end: number) => {
    let sum = 0;
    for (let k = start; k < end; k++) sum += ratios[k];
    return (width - GAP_X * (end - start - 1)) / sum;
  };
  for (let end = 1; end <= n; end++) {
    for (let start = end - 1; start >= 0 && end - start <= 8; start--) {
      const h = heightOf(start, end);
      const isLast = end === n;
      // The last row may stay short of full width instead of growing huge.
      const cost = isLast && h > target ? ((h - target) * 0.5) ** 2 : (h - target) ** 2;
      if (best[start] + cost < best[end]) {
        best[end] = best[start] + cost;
        from[end] = start;
      }
    }
  }
  const rows: Row[] = [];
  for (let end = n; end > 0; end = from[end]) {
    const start = from[end];
    let h = heightOf(start, end);
    if (end === n) h = Math.min(h, target * 1.15); // nearly-full last rows still fill the width
    const items = [];
    for (let k = start; k < end; k++) items.push({ index: k, width: ratios[k] * h });
    rows.unshift({ items, height: h });
  }
  return rows;
}

export default function IllustrationGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const justDragged = useRef(false);

  const go = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setOpen((i) => (i === null ? i : (i + step + items.length) % items.length));
    },
    [items.length]
  );
  const close = useCallback(() => setOpen(null), []);

  const isOpen = open !== null;

  // Keyboard: ← → to browse, Esc to close.
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go, close]);

  // Stop the page behind from scrolling while a piece is enlarged.
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const before = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      body.style.overflow = before.overflow;
      body.style.paddingRight = before.paddingRight;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function onDragEnd(_: unknown, info: PanInfo) {
    justDragged.current = true;
    window.setTimeout(() => (justDragged.current = false), 60);
    const { offset, velocity } = info;
    if (offset.x < -80 || velocity.x < -450) go(1);
    else if (offset.x > 80 || velocity.x > 450) go(-1);
  }

  // Measure the gallery so rows can be laid out to fill it exactly.
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState<number | null>(null);
  useIsomorphicLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const measure = () => setGridWidth(Math.floor(el.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const ratios = useMemo(() => items.map((item) => item.width / item.height), [items]);
  const rows = useMemo(() => (gridWidth ? buildRows(ratios, gridWidth) : null), [ratios, gridWidth]);

  function renderPiece(i: number, style: React.CSSProperties, rowHeight?: number) {
    const item = items[i];
    const label = item.name || `Illustration ${i + 1}`;
    return (
      <figure key={item.id} className="m-0" style={style}>
        <button
          type="button"
          onClick={(e) => {
            trigger.current = e.currentTarget;
            setDirection(1);
            setOpen(i);
          }}
          aria-label={`View ${label} larger`}
          className="group block w-full cursor-zoom-in"
        >
          <div
            className="relative w-full overflow-hidden bg-neutral-100"
            style={rowHeight ? { height: rowHeight } : { aspectRatio: `${item.width} / ${item.height}` }}
          >
            <Image
              src={item.image}
              alt={label}
              fill
              sizes={THUMB_SIZES}
              quality={85}
              priority={i < 5}
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
          </div>
        </button>
        {item.name && (
          <figcaption className="mt-3 text-[15px] leading-snug tracking-[0.03em] text-black">
            {item.name}
            {item.note && <span className="block text-[14px] text-black/50">{item.note}</span>}
          </figcaption>
        )}
      </figure>
    );
  }

  const current = open === null ? null : items[open];
  const neighbours =
    open === null || items.length < 2
      ? []
      : [items[(open + 1) % items.length], items[(open - 1 + items.length) % items.length]];

  return (
    <MotionConfig reducedMotion="user">
      {/* Gallery: full-width rows, each piece at its true shape (no cropping). */}
      <div ref={gridRef}>
        {rows ? (
          <div className="flex flex-col gap-y-10 md:gap-y-12">
            {rows.map((row, r) => (
              <div key={r} className="flex" style={{ columnGap: GAP_X }}>
                {row.items.map(({ index, width }) => renderPiece(index, { width, flexShrink: 1, minWidth: 0 }, row.height))}
              </div>
            ))}
          </div>
        ) : (
          // Shown for the split second before the page measures its width.
          <div className="flex flex-wrap gap-y-10 md:gap-y-12 [--row-h:130vw] sm:[--row-h:38vw] lg:[--row-h:24vw]" style={{ columnGap: GAP_X }}>
            {items.map((item, i) => {
              const ratio = item.width / item.height;
              return renderPiece(i, { flexGrow: ratio, flexShrink: 1, flexBasis: `calc(${ratio} * var(--row-h))`, maxWidth: "100%" });
            })}
            <div aria-hidden className="h-0" style={{ flexGrow: 1000, flexBasis: 0 }} />
          </div>
        )}
      </div>

      {/* Enlarged view */}
      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            key="viewer"
            role="dialog"
            aria-modal="true"
            aria-label={current.name || "Enlarged illustration"}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center [--lb-w:calc(100vw-24px)] [--lb-h:calc(100dvh-120px)] md:[--lb-w:calc(100vw-200px)] md:[--lb-h:calc(100dvh-96px)]"
            onClick={() => {
              if (!justDragged.current) close();
            }}
          >
            {/* Frosted, blurred page behind the image. */}
            <motion.div
              className="absolute inset-0"
              initial={{ backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
              animate={{ backgroundColor: "rgba(255,255,255,0.72)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
              exit={{ backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            <motion.button
              ref={closeButton}
              type="button"
              onClick={close}
              aria-label="Close"
              className="fixed top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-black transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </motion.button>

            {items.length > 1 && (
              <>
                <ArrowButton side="left" onClick={() => go(-1)} />
                <ArrowButton side="right" onClick={() => go(1)} />
              </>
            )}

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={open}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  drag={items.length > 1 ? "x" : false}
                  dragSnapToOrigin
                  onDragEnd={onDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="relative cursor-grab active:cursor-grabbing shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35)]"
                  style={{
                    width: `min(var(--lb-w), calc(var(--lb-h) * ${current.width / current.height}))`,
                    aspectRatio: `${current.width} / ${current.height}`,
                  }}
                >
                  <ViewerImage item={current} alt={current.name || `Illustration ${open + 1}`} />
                </motion.div>
              </AnimatePresence>
              {current.name && (
                <p className="absolute left-0 right-0 -bottom-9 text-center text-[15px] tracking-[0.03em] text-black">
                  {current.name}
                </p>
              )}
            </motion.div>

            {/* Loads the next and previous pieces in the background so browsing feels instant. */}
            <div aria-hidden className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none">
              {neighbours.map((n) => (
                <div key={n.id} className="relative w-px h-px">
                  <Image src={n.image} alt="" fill sizes="100vw" quality={90} loading="eager" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

/**
 * The enlarged image. The gallery thumbnail (already downloaded) shows
 * instantly, and the full-size version fades in over it once it arrives.
 */
function ViewerImage({ item, alt }: { item: GalleryItem; alt: string }) {
  const [sharp, setSharp] = useState(false);
  return (
    <>
      <Image
        src={item.image}
        alt=""
        aria-hidden
        fill
        sizes={THUMB_SIZES}
        quality={85}
        draggable={false}
        className="object-contain select-none pointer-events-none"
      />
      <Image
        src={item.image}
        alt={alt}
        fill
        sizes="100vw"
        quality={90}
        priority
        draggable={false}
        onLoad={() => setSharp(true)}
        className={`object-contain select-none pointer-events-none transition-opacity duration-300 ${sharp ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}

function ArrowButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous illustration" : "Next illustration"}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-neutral-900 text-white items-center justify-center hover:bg-black transition-colors ${
        side === "left" ? "left-8" : "right-8"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </motion.button>
  );
}
