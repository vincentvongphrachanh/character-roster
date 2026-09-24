import path from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";

export type ImageDimensions = { width: number; height: number };

/**
 * Reads the real width and height of an image in the /public folder
 * while the site is being built. The gallery uses this to show every
 * piece at its true shape, without cropping. It runs once per build,
 * so visitors never wait for it.
 *
 * `src` is the same path used in lib/illustrations.ts, for example
 * "/illustrations/escape.png".
 */
export async function getPublicImageSize(src: string): Promise<ImageDimensions> {
  const fallback = { width: 3, height: 4 };
  if (/^https?:\/\//i.test(src)) return fallback;

  try {
    const relative = decodeURIComponent(src.split("?")[0]);
    const file = path.join(process.cwd(), "public", relative);
    const size = await imageSizeFromFile(file);
    if (!size.width || !size.height) return fallback;

    // Photos from phones can be stored sideways with a "rotate me" flag.
    const sideways = typeof size.orientation === "number" && size.orientation >= 5;
    return sideways
      ? { width: size.height, height: size.width }
      : { width: size.width, height: size.height };
  } catch {
    console.warn(`Could not read the size of ${src}. Check that the file exists in /public and the path matches exactly.`);
    return fallback;
  }
}
