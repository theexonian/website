import { getArticleByZIndex } from '@/actions/getArticleByZIndex';
import Image from 'next/image';
import * as Constants from '@/components/Constants';
import Link from 'next/link';

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
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '16/9': 'aspect-[16/9]',
    '2/3': 'aspect-[2/3]',
  }[thumbnailRatio ?? ''] || ''; // we cannot pass thumbnailRatio straight in as a parameter because of tailwind's static rendering.

  return (
    // The main container now uses a grid layout, similar to the requested design
    <article className="w-full group">
      
      {/* The main content area that becomes a link target */}
      <div className="relative isolate flex flex-col items-start rounded-md md:col-span-3">
        {/* The Link wraps the visible content except for the authors/date block */}
        <Link href={`/articles/${article.slug}`} className="block w-full p-4 active:bg-[#f8f8f8] relative">

        {article.thumbnail && (
            <div className="w-full">
              <div className={`mb-[10px] relative w-full overflow-hidden ${thumbnailRatio ? ratioClass : 'aspect-[4/3]'}`}>
                <Image
                  src={
                    article.thumbnail.url.startsWith('http')
                      ? article.thumbnail.url
                      : `http://${Constants.STRAPI_IP}:1337${article.thumbnail.url}`
                  }
                  fill
                  className="absolute inset-0 object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                  alt={article.description ? article.description : 'Article image'} // Alt text remains for sighted users if image fails
                />
              </div>
              {credit && (
                <p className="text-[7px] font-sans text-muted-foreground w-full text-right -mt-2">
                  {credit}
                </p>
              )}
            </div>
          )}
          
          {/* Screen Reader Title */}
          <span className="absolute inset-0 z-10 sr-only">
            Read article: {article.title}
          </span>
          
          {/* Article Title */}
          <h1 className={`font-serif font-medium text-${titleSize}xl group-hover:text-[#404040] transition-colors duration-200`}>
            {article.title}
          </h1> 

          {/* Section/Tag Info */}
          <div className="flex items-baseline gap-2 mt-2">
            {showSection && article.tag && !sectionOverride && (
              <h3 className="font-bold text-red-700 inline-block text-xs">
                {article.tag.toUpperCase()}
              </h3>
            )}
            {showSection && sectionOverride && (
              <h3 className="font-bold text-red-700 inline-block text-xs">
                {(sectionOverride ?? '').toUpperCase()}
              </h3>
            )}
          </div>

          {/* Article Description */}
          <div className="max-w-[600px] py-3">
            <p className="text-xs text-muted-foreground text-ellipsis line-clamp-3 font-serif font-thin">
              {article.description}
            </p>
          </div>
          
          {/* Author */}
          <div className="text-xs text-foreground md:hidden">
            <div className="flex flex-wrap items-center gap-1">
              <span>By</span>
              {article.authors.map((author, i) => {
                return (
                  <p className="text-xs duration-200 no-underline text-foreground capitalize key={i}">
                    {author.fullname + (article.authors.length - 1 !== i && ",")}
                  </p>
                  
                );
              })}
            </div>
          </div>

          {/* Time stamp */}
          <time className="order-first hidden text-sm text-muted-foreground md:block" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })}
          </time>
        </Link>
      </div>
    </article>
  );
}