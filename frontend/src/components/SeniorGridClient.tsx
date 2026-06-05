"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type SeniorImage = {
  id: string | number;
  url: string;
  alt: string;
};

export default function SeniorGridClient({ images }: { images: SeniorImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, goNext, goPrev]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4 py-5 xl:grid-cols-3 lg:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative block aspect-[4/3] overflow-hidden rounded-md bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "top" }}
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 ring-0 transition group-hover:ring-2 group-hover:ring-red-300/70" />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-black/90"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              quality={100}
              className="object-contain"
            />

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 font-sans text-xs font-semibold text-gray-900 shadow"
            >
              Close
            </button>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow"
            >
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow"
            >
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 font-sans text-xs font-semibold text-white">
              {activeIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
