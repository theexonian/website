import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theexonian.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/masthead",
    "/search",
    "/webboard",
    "/writers",
    "/privacy-and-content-use",
    "/pdf-exonian-archive",
    "/the-exonian-charter",
    "/alumni-faculty-archives-feature",
    "/speechify",
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
