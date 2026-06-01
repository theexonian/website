"use client";

import Image from "next/image";

export default function SeniorGrid({ urls }: { urls: string[] }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
        {urls.map((url, index) => (
          <div key={index} className="group relative block aspect-[3/2] overflow-hidden">
            <div className="group relative block aspect-[4/3] overflow-hidden bg-neutral-100">
              <Image src={url} alt={`Senior photo ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: "top" }} className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}