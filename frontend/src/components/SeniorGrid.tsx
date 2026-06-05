import { getImagesByGallery } from "@/actions/getImagesByGallery";
import * as Constants from "@/components/Constants";
import SeniorGridClient from "./SeniorGridClient";

export default async function SeniorGrid({ slug }: { slug: string }) {
  const galleries = await getImagesByGallery(slug);
  const gallery = galleries?.[0];
  const images = gallery?.images ?? [];

  if (!images.length) {
    return null;
  }

  const normalizedImages = images.map((image, index) => {
    const url = image.url.startsWith("http")
      ? image.url
      : `http://${Constants.STRAPI_IP}:1337${image.url}`;

    return {
      id: image.id ?? `${index}`,
      url,
      alt: image.alternativeText ?? `Senior photo ${index + 1}`,
    };
  });

  return <SeniorGridClient images={normalizedImages} />;
}