import { getArticleByZIndex } from "@/actions/getArticleByZIndex";
import Image from "next/image";
import * as Constants from "@/components/Constants";
import Link from "next/link";



interface ArticlePreviewProps {
  z: number;
  section: string;
  showSection?: boolean;
  titleSize?: string;
  thumbnailRatio?: string;
  credit?: string;
  sectionOverride?: string; // Optional override for section name
}

export default async function ArticlePreview({
  z,
  section,
  showSection = true,
  titleSize = "1",
  thumbnailRatio,
  credit,
  sectionOverride,
}: ArticlePreviewProps) {
  const article = await getArticleByZIndex(z, section);

  if (!article) {
    return null;
  }

    const ratioClass = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-[16/9]",
    "2/3": "aspect-[2/3]",
  }[thumbnailRatio ?? ""] || "";
  // we cannot pass "thumbnailRatio" straight in as a parameter because of tailwind's static rendering. 


  return (
    <div className="w-full p-2 border-neutral-300 border-b box-border">
      <Link href={`/articles/${article.slug}`}>
        {article.thumbnail && thumbnailRatio && (
		<div className="w-full">
          <div className={`relative w-full ${ratioClass}`}>
            <Image
              src={
                article.thumbnail.url.startsWith("http")
                  ? article.thumbnail.url
                  : `http://${Constants.STRAPI_IP}:1337${article.thumbnail.url}`
              }
              // width="100"
              // height="100"
              // sizes="25vw"
              fill
              className="py-2 overflow-hidden object-cover"
              alt={article.description ? article.description: "Article image"}
            />			
          </div>
		<p className="text-[7px] font-sans text-neutral-500 w-full text-right -mt-2">
          {credit}</p>
		</div>
		)}

        <div className="flex items-baseline gap-2">
          <Link href={`/tag/${article.tag}`}>
            {showSection && article.tag && !sectionOverride && (
              <h3 className="font-bold text-red-700 inline-block bg-clip-text text-xs">
                {article.tag.toUpperCase()}
              </h3>
            )}
            {showSection && sectionOverride && (
              <h3 className="font-bold text-red-700 inline-block bg-clip-text text-xs">
                {(sectionOverride ?? "").toUpperCase()}
              </h3>
            )}
          </Link>
        </div>

        <div className="max-w-[600px]">
          <div className="flex justify-between">
            <div className="">
              <h1
                className={`font-serif font-medium text-${titleSize}xl`}
              >
                {article.title}
              </h1>
            </div>
          </div>
          <div className="py-3">
            <p className="text-xs text-neutral-500 text-ellipsis line-clamp-3 font-serif font-thin">
              {article.description}
            </p>
          </div>
        </div>
      </Link>

      <div className="text-xs items-center gap-1 flex text-neutral-700">
        By
        {article.authors.map((author, i) => {
          return (
            <Link
              className="text-xs hover:text-red-500 duration-200 no-underline text-neutral-700 capitalize"
              key={i}
              href={`/writers/${author.slug}`}
            >
              {author.fullname}
              {article.authors.length - 1 !== i && ", "}
            </Link>
          );
        })}
        <p className="text-xs text-neutral-500">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        {/* </div> */}
      </div>
    </div>
  );
}
