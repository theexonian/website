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
}

export default function RowPreview({ article, showSection = false }: ArticleRowPreviewProps) {
  const { title, tag, thumbnail, description, publishedAt, authors, slug } = article;

  return (
    <div className="w-full flex items-start py-3 border-neutral-300 border-b gap-4 group">
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          {showSection && (
            <h3 className="font-bold font-sans text-red-700 inline-block bg-clip-text">
              <Link href={`/tag/${tag}`}>{tag ? tag.toUpperCase() : ""}</Link>
            </h3>
          )}
          {publishedAt && (
            <p className="text-xs text-[#6C6C6C] inline-block bg-clip-text">
              {new Date(publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* <div className="group"> */}
          <Link href={`/articles/${slug}`} className="hover:no-underline">
            <h1 className="font-serif text-xl group-hover:underline underline-offset-4 duration-200 font-medium ">
              {title}
            </h1>
            <div className="py-2">
              <p className="text-xs text-[#4E4E4E] duration-200 line-clamp-4 overflow-hidden">
                {description}
              </p>
            </div>
          </Link>
        {/* </div> */}

        <p className="text-xs text-[#6C6C6C] duration-200 font-sans">
          By&nbsp;
          {authors &&
            authors.map((author, i) => (
              <Link
                className="text-xs hover:text-red-500 duration-200 no-underline capitalize"
                key={i}
                href={`/writers/${author.slug}`}
              >
                {author.fullname}
                {authors.length - 1 !== i && ", "}
              </Link>
            ))}
        </p>
      </div>

      {thumbnail?.url && (
        <Link href={`/articles/${slug}`}>
          <div className="relative sm:w-20 sm:h-20 md:w-40 md:h-40 w-44 h-44 shrink-0">
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
