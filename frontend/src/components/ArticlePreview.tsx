import { getArticleByZIndex } from '@/actions/getArticleByZIndex';
import { getArticleByRelevance } from '@/actions/getArticleByRelevance';
import Image from 'next/image';
import * as Constants from '@/components/Constants';
import Link from 'next/link';

type PositionProps =
  | { z: number; relevance?: never }
  | { relevance: number; z?: never };

interface ArticlePreviewBaseProps {
  section: string;
  showSection?: boolean;
  titleSize?: string;
  thumbnailRatio?: string;
  credit?: string;
  sectionOverride?: string; // Optional override for section name
  showDescription?: boolean; // Option to show/hide description
  showThumbnail?: boolean; // Option to show/hide thumbnail
}

type ArticlePreviewProps = ArticlePreviewBaseProps & PositionProps;

export default async function ArticlePreview({
  z,
  relevance,
  section,
  showSection = true,
  titleSize = "2",
  thumbnailRatio,
  credit,
  sectionOverride,
  showDescription = true,
  showThumbnail = true,
}: ArticlePreviewProps) {
  if (z === undefined && relevance === undefined) {
    return null;
  }

  const article = relevance !== undefined
    ? await getArticleByRelevance(relevance, section)
    : await getArticleByZIndex(z as number, section);

  if (!article) {
    return null;
  }

  const responsiveRatioClass = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '16/9': 'aspect-[16/9]',
    '2/3': 'aspect-[2/3]',
  }[thumbnailRatio ?? ''] || 'aspect-[4/3]';

  const descriptionClampClass = thumbnailRatio === '4/3'
    ? 'line-clamp-3 @[min-width:24rem]:line-clamp-5'
    : 'line-clamp-3';

  const titleSizeClass = {
    '0': 'text-base',
    '1': 'text-lg',
    '2': 'text-xl',
    '3': 'text-2xl',
    '4': 'text-3xl',
    '5': 'text-4xl',
    '6': 'text-5xl',
    '7': 'text-6xl',
  }[titleSize] || 'text-2xl';

  const titlePaddingClass = 'pb-1';

  showThumbnail = showThumbnail && !!article.thumbnail; // Only show thumbnail if it exists and option is true

  return (
    <article className="w-full group @container">
      <div className="relative isolate flex flex-col items-start rounded-md">
        <Link href={`/articles/${article.slug}`} className="block w-full active:bg-[#f8f8f8] relative">
          <div className="px-3 py-3 sm:p-0 flex flex-col items-start gap-4">
            {showThumbnail && (
              <div className="w-full">
                <div className={`relative max-h-[25rem] w-full my-auto flex overflow-hidden ${responsiveRatioClass}`}>
                  <Image
                    src={
                      article.thumbnail.url.startsWith('http')
                        ? article.thumbnail.url
                        : `http://${Constants.STRAPI_IP}:1337${article.thumbnail.url}`
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={z === 1 || relevance === 1 ? 'eager' : 'lazy'}
                    className="absolute inset-0 object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                    alt={article.description ? article.description : 'Article image'}
                  />
                </div>
                {credit && (
                  <p className="text-[7px] font-sans text-muted-foreground w-full text-right -mt-2">
                    {credit}
                  </p>
                )}
              </div>
            )}

            <div className="min-w-0 w-full">
              <span className="absolute inset-0 z-10 sr-only">
                Read article: {article.title}
              </span>

              {showSection && (
                <div className="flex font-sans items-baseline leading-[1.6] mb-1">
                  {article.tag && !sectionOverride && (
                    <h3 className="font-bold text-red-700 inline-block text-xs leading-none">
                      {article.tag.toUpperCase()}
                    </h3>
                  )}
                  {sectionOverride && (
                    <h3 className="font-bold text-red-700 inline-block text-xs">
                      {(sectionOverride ?? '').toUpperCase()}
                    </h3>
                  )}
                </div>
              )}

              <h1 className={`font-test font-bold ${titleSizeClass} text-foreground group-hover:text-[#404040] transition-colors duration-200 leading-[1.3] ${titlePaddingClass}`}>
                {article.title}
              </h1>

              {showDescription && (
                <div className="max-w-[600px] py-1">
                  <p className={`text-xs text-muted-foreground text-ellipsis ${descriptionClampClass} font-serif font-thin leading-[1.6]`}>
                    {article.description}
                  </p>
                </div>
              )}

              <div className="text-xs text-foreground md:hidden">
                <div className="flex flex-wrap items-center gap-1 leading-tight text-[10px] uppercase tracking-wider text-gray-600 font-bold font-sans">
                  <span>By</span>
                  {article.authors.map((author, i) => {
                    return (
                      <p key={i}>
                        {author.fullname + (article.authors.length - 1 !== i ? ',' : '')}
                      </p>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-1">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}