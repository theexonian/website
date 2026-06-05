import Image from "next/image";
import { getImagesByGallery } from "@/actions/getImagesByGallery";
import * as Constants from "@/components/Constants";

interface SlidingPhotoGalleryProps {
  slug: string;
  className?: string;
}

export default async function SlidingPhotoGallery({
  slug,
  className,
}: SlidingPhotoGalleryProps) {
  const galleries = await getImagesByGallery(slug);
  const gallery = galleries?.[0];
  const rawImages = gallery?.images;
  const images = Array.isArray(rawImages) ? rawImages : rawImages?.data ?? [];

  if (!images.length) {
    return null;
  }

  return (
    <div className={`max-w-[100vw] overflow-hidden ${className ?? ""}`}>
      <div
        className="flex flex-row flex-nowrap gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth pb-2"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {images.map((image) => {
          const url = image.url.startsWith("http")
            ? image.url
            : `http://${Constants.STRAPI_IP}:1337${image.url}`;

          return (
            <div
              key={image.id}
              className="relative h-[8rem] w-44 md:h-[6rem] md:w-[8rem] flex-shrink-0 snap-start overflow-hidden rounded-md bg-neutral-100"
            >
              <Image
                src={url}
                alt={image.alternativeText ?? image.name}
                fill
                sizes="(max-width: 768px) 140px, 208px"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
