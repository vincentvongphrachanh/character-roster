import Navbar from "@/components/Navbar";
import IllustrationGallery, { type GalleryItem } from "@/components/IllustrationGallery";
import { illustrations } from "@/lib/illustrations";
import { getPublicImageSize } from "@/lib/image-dimensions";

/**
 * Home page: the illustrations gallery. The artwork list lives in
 * lib/illustrations.ts -- add, remove or reorder pieces there.
 */
export default async function IllustrationsPage() {
  const items: GalleryItem[] = await Promise.all(
    illustrations.map(async (item) => ({ ...item, ...(await getPublicImageSize(item.image)) }))
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar active="illustrations" />
      <main className="px-4 sm:px-5 lg:px-[34px] pt-12 md:pt-20 pb-28">
        <IllustrationGallery items={items} />
      </main>
    </div>
  );
}
