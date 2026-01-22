import Image from "next/image";
import { Author } from "../../types/APIResponse";
import * as Constants from "@/components/Constants";
import Link from "next/link";

interface ArticleRowPreviewProps {
  article: {
    title: string;
    tag?: string;
    description?: string;
    publishedAt?: string;
    authors?: Author[];
    slug: string;
    thumbnail: {
      url: string;
    };
  };
  showSection?: boolean;
  titleSize?: number;
  border?: boolean;
  thumbnailRatio?: string;
}

export default function RowPreview({ article, showSection = false, titleSize = 2, border = false, thumbnailRatio = "1/1" }: ArticleRowPreviewProps) {
  const { title, tag, thumbnail, description, publishedAt, authors, slug } = article;

  const ratioClass = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-[16/9]",
    "2/3": "aspect-[2/3]",
  }[thumbnailRatio ?? ""] || "";

  return (
    <div className={`w-full flex items-start p-3 ${border ? "border-border border-b" : ""} gap-4 group`}>

      <div className="flex flex-col w-full">
       
        <div className="flex items-center gap-2">
          {showSection && (
            <h3 className="font-bold font-sans text-red-700 inline-block bg-clip-text">
              <Link href={`/tag/${tag}`}>{tag ? tag.toUpperCase() : ""}</Link>
            </h3>
          )}
        </div>

        <Link href={`/articles/${slug}`} className="hover:no-underline">
          <h1 className={`font-serif text-${titleSize}xl group-hover:text-red-700 transition-colors duration-200 font-medium`}>
            {title}
          </h1>
          <div className="py-2">
            <p className="text-xs text-muted-foreground duration-200 line-clamp-4 overflow-hidden">
              {description}
            </p>
          </div>
        </Link>

        <div className="pt-2">
          <div className="text-xs text-muted-foreground duration-200 font-sans">
            <div className="flex flex-wrap items-center gap-1">
              <span>By</span>
              {authors &&
                authors.map((author, i) => (
                  <Link
                    className="text-xs hover:text-red-500 duration-200 no-underline capitalize"
                    key={i}
                    href={`/writers/${author.slug}`}
                  >
                    {author.fullname}
                    {authors.length - 1 !== i && ","}
                  </Link>
                ))}
            </div>
          </div>
          {publishedAt && (
            <p className="text-xs text-muted-foreground inline-block bg-clip-text mt-1">
              {new Date(publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      {thumbnail?.url && (
        <Link href={`/articles/${slug}`}>
          <div className={`${ratioClass} relative lg:w-[6rem] lg:h-[8rem] xl:w-[8rem] xl:h-[10rem] h-40 shrink-0 transition-transform duration-300 ease-in-out hover:scale-[1.03]`}>
            <Image
              src={
                thumbnail.url.startsWith("http")
                  ? thumbnail.url
                  : `http://${Constants.STRAPI_IP}:1337${thumbnail.url}`
              }
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}
    </div>
  );
}
