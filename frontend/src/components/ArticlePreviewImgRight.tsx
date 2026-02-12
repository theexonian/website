import { getArticleByZIndex } from '@/actions/getArticleByZIndex';
import Image from 'next/image';
import * as Constants from '@/components/Constants';
import Link from 'next/link';

interface ArticlePreviewImgRightProps {
  z: number;
  section: string;
  showSection?: boolean;
  titleSize?: string;
  thumbnailRatio?: string;
  credit?: string;
  sectionOverride?: string; // Optional override for section name
}

export default async function ArticlePreviewImgRight({
  z,
  section,
  showSection = true,
  titleSize = "2",
  thumbnailRatio,
  credit,
  sectionOverride,
}: ArticlePreviewImgRightProps) {
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
    <article className="w-full group">

      {/* The main content area that becomes a link target. */}
      <div className="relative isolate flex lg:flex-col gap-[10rem] flex-row flex-row-reverse items-start rounded-md">
        {/* The Link wraps the visible content */}
        <Link href={`/articles/${article.slug}`} className="block w-full active:bg-[#f8f8f8] relative lg:flex-col flex-row items-start">

          <div className='px-3 py-3 flex items-start gap-3'>
          {/* Content column */}
          <div className={`lg:w-full ${article.thumbnail ? 'w-[50%]' : 'w-full'}`}>
            {/* Screen Reader Title */}
            <span className="absolute inset-0 z-10 sr-only">
              Read article: {article.title}
            </span>

            {/* Section/Tag Info */}
            <div className={`flex items-baseline ${ titleSize == "3" ? 'mb-[0.2rem]' : ''}`}>
              {showSection && article.tag && !sectionOverride && (
                <h3 className="font-bold text-red-700 inline-block text-xs leading-none">
                  {article.tag.toUpperCase()}
                </h3>
              )}
              {showSection && sectionOverride && (
                <h3 className="font-bold text-red-700 inline-block text-xs">
                  {(sectionOverride ?? '').toUpperCase()}
                </h3>
              )}
            </div>

            {/* Article Title */}
            <h1 className={`font-serif font-medium text-${titleSize}xl group-hover:text-[#404040] transition-colors duration-200`}>
              {article.title}
            </h1>

            
            {/* Article Description */}
            <div className="max-w-[600px] pb-2 pt-1">
              <p className={`text-xs text-muted-foreground text-ellipsis ${thumbnailRatio == "4/3" ? 'line-clamp-5' : 'line-clamp-3'} font-serif font-thin`}>
                {article.description}
              </p>
            </div>
            
            {/* Author */}
            <div className="text-xs text-foreground lg:hidden">
              <div className="flex flex-wrap items-center gap-1">
                <span>By</span>
                {article.authors.map((author, i) => {
                  return (
                    <p className="text-xs duration-200 no-underline text-foreground capitalize" key={i}>
                      {author.fullname + (article.authors.length - 1 !== i ? "," : "")}
                    </p>
                    
                  );
                })}
              </div>
            </div>

            {/* Time stamp */}
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>

          </div>
          
          {/* Thumbnail Image, (off to the right) */}
          {article.thumbnail && (
            <div className="lg:w-full w-[50%]">
              <div className={`relative max-h-[25rem] w-full overflow-hidden ${thumbnailRatio ? ratioClass : 'aspect-[4/3]'}`}>
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
          </div>
          
        </Link>
      </div>
    </article>
  );
}