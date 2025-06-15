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
}

export default function RowPreview(props: ArticleRowPreviewProps) {
  const { title, tag, thumbnail, description, publishedAt, authors, slug } =
    props.article;

  return (
    <div className="w-full flex items-start py-3 border-neutral-300 border-b gap-4">
      {/* // date and authors */}

      {publishedAt && (
        <p className="text-xs text-[#6C6C6C]">
          {new Date(publishedAt).toLocaleDateString()}
        </p>
      )}

      {/* // thumbnail, title, and preview description */}

      <Link
        href={`/articles/${slug}`}
        className="flex flex-start gap-4 w-full align-top"
      >
        {/* <h3 className="font-bold font-sans bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
							{tag
								? tag.charAt(0).toUpperCase() + tag.slice(1)
								: ""}
						</h3> */}

        <div className="flex flex-col w-full">
          <h1 className="font-serif text-xl hover:underline duration-200 font-medium">
            {title}
          </h1>
          <div className="py-2">
            <p className="text-xs text-[#4E4E4E] hover:text-neutral-500 duration-200 line-clamp-4 overflow-hidden">
              {description}
            </p>
          </div>
          <p className="text-xs text-[#6C6C6C] duration-200 font-sans">
            By&nbsp;
            {authors &&
              authors.map((author, i) => {
                return (
                  <Link
                    className="text-xs hover:text-red-500 duration-200 no-underline capitalize"
                    key={i}
                    href={`/writers/${author.slug}`}
                  >
                    {author.fullname}
                    {authors.length - 1 !== i && ", "}
                  </Link>
                );
              })}
          </p>
        </div>
        {thumbnail?.url && (
		<div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0">
          <Image
            src={
              props.article.thumbnail.url.startsWith("http")
                ? props.article.thumbnail.url
                : `http://${Constants.STRAPI_IP}:1337${props.article.thumbnail.url}`
            }
            alt={title}
            fill
            className="object-cover"
          />
		  </div>
        )}
		
      </Link>
    </div>
  );
}
