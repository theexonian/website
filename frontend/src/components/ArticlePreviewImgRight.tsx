import { getArticleByZIndex } from '@/actions/getArticleByZIndex';
import Image from 'next/image';
import * as Constants from '@/components/Constants';
import Link from 'next/link';

interface ArticlePreviewImgRightProps {
  z: number;
  section: string;
  showSection?: boolean;
  titleSize?: string;
  imageRatio?: number;
  thumbnailRatio?: string;
  credit?: string;
  sectionOverride?: string; // Optional override for section name
  showDescription?: boolean; // Option to show/hide description
  showThumbnail?: boolean; // Option to show/hide thumbnail
}

export default async function ArticlePreviewImgRight({
  z,
  section,
  showSection = true,
  titleSize = "2",
  imageRatio = 50,
  thumbnailRatio,
  credit,
  sectionOverride,
  showDescription = true,
  showThumbnail = true,
}: ArticlePreviewImgRightProps) {
  const article = await getArticleByZIndex(z, section);

  if (!article) {
    return null;
  }

  // Container query responsive aspect ratios (square on small, specified ratio on larger containers)
  /*
  const responsiveRatioClass = {
    '1/1': 'aspect-square @[min-width:24rem]:aspect-square',
    '4/3': 'aspect-square @[min-width:1rem]:aspect-[4/3]',
    '3/2': 'aspect-square @[min-width:24rem]:aspect-[3/2]',
    '16/9': 'aspect-square @[min-width:24rem]:aspect-[16/9]',
    '2/3': 'aspect-square @[min-width:24rem]:aspect-[2/3]',
  }[thumbnailRatio ?? ''] || 'aspect-square @[min-width:24rem]:aspect-[4/3]';
  */

  const responsiveRatioClass = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '16/9': 'aspect-[16/9]',
    '2/3': 'aspect-[2/3]',
  }[thumbnailRatio ?? ''] || 'aspect-[4/3]';

  // Description line clamp (3 on small, varies on larger containers)
  const descriptionClampClass = thumbnailRatio === '4/3' 
    ? 'line-clamp-3 @[min-width:24rem]:line-clamp-5' 
    : 'line-clamp-3';

  const clampedImageRatio = Math.min(100, Math.max(0, imageRatio));
  const contentRatio = 100 - clampedImageRatio;

  showThumbnail = showThumbnail && !!article.thumbnail; // Only show thumbnail if it exists and option is true
  return (
    <article className="w-full group @container">

      {/* The main content area that becomes a link target. */}
      <div className="relative isolate flex lg:flex-col gap-[10rem] flex-row flex-row-reverse items-start rounded-md">
        {/* The Link wraps the visible content */}
        <Link href={`/articles/${article.slug}`} className="block w-full active:bg-[#f8f8f8] relative lg:flex-col flex-row items-start">

          <div className='px-3 py-3 sm:p-0 flex sm:flex-col lg:flex-row items-start gap-4'>
          {/* Content column */}
          <div
            className={`w-[50%] md:w-full min-w-0 ${showThumbnail ? 'shrink-0' : 'lg:w-[50%]'} showThumbnail ? w-${contentRatio}% : lg:w-[50%] `}
          >
            {/* Screen Reader Title */}
            <span className="absolute inset-0 z-10 sr-only">
              Read article: {article.title}
            </span>

            {/* Section/Tag Info */}
            <div className={`flex font-sans items-baseline leading-[1.6]`}>
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
            <h1 className={`font-serif font-semibold text-${titleSize}xl text-foreground group-hover:text-[#404040] transition-colors duration-200 leading-1.6`}>
              {article.title}
            </h1>

            
            {/* Article Description */}
            {showDescription && (
              <div className="max-w-[600px] py-1">
                <p className={`text-xs text-muted-foreground text-ellipsis ${descriptionClampClass} font-serif font-thin leading-[1.6]`}>
                  {article.description}
                </p>
              </div>
            )}
            
              {/* Author */}
              <div className="text-xs text-foreground md:hidden">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">By</span>
                  {article.authors.map((author, i) => {
                    return (
                      <p className="text-[10px] uppercase tracking-wider text-gray-600 font-bold" key={i}>
                        {author.fullname + (article.authors.length - 1 !== i ? "," : "")}
                      </p>
                    );
                  })}
                </div>
              </div>

            {/* Time stamp */}
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>

          </div>
          
          {/* Thumbnail Image, (off to the right) */}
          {showThumbnail && (
            <div className="w-[50%] md:w-full lg:w-[50%] sm:order-first lg:order-last">
              <div className={`relative max-h-[25rem] w-full my-auto flex overflow-hidden ${responsiveRatioClass}`}>
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