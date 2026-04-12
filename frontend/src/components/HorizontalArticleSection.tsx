import Link from 'next/link';
import { getArticlesByTag } from '@/actions/getArticlesByTag';
import { HiChevronRight } from 'react-icons/hi';

interface Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail?: { url: string };
  publishedAt: string;
  tag: string;
  authors: Array<{ id: number; fullname: string; slug: string }>;
}

interface HorizontalArticleSectionProps {
  sectionTitle: string;
  sectionSlug: string;
  limit?: number;
  showArticlesWithoutImages?: boolean; // Control whether to force articles to have images
}

export default async function HorizontalArticleSection({
  sectionTitle,
  sectionSlug,
  limit = 5,
  showArticlesWithoutImages = true,
}: HorizontalArticleSectionProps) {
  let articles: Article[] = [];

  try {
    const response = await getArticlesByTag(sectionSlug, 30);
    if (response && response.length > 0) {
      const filteredArticles = showArticlesWithoutImages
        ? response
        : response.filter((article) => Boolean(article.thumbnail?.url));
      articles = filteredArticles.slice(0, limit);
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  if (!articles.length) return null;

  return (
    <section className="w-full pt-6">
      {/* GLOBAL CSS OVERRIDE: Ensure this container stays within screen bounds */}
      <div className="max-w-[100vw] overflow-hidden">
        <div className="border-t border-border pt-3">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-red-700 text-md tracking-widest uppercase">
              {sectionTitle}
            </h2>
            <Link
              href={`/${sectionSlug}`}
              className="group flex items-center gap-1 text-xs text-foreground hover:text-[rgb(158,158,158)] transition-colors"
            >
              <span className="font-sans text-[rgb(71,71,71)]">View all</span>
            </Link>
          </div>

          {/* SCROLLING CONTAINER */}
          {/* Added 'overflow-x-scroll' and 'block' to force the scrollbar to appear */}
          <div 
            className="flex flex-row flex-nowrap gap-8 overflow-x-scroll snap-x snap-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', // Forces scrollbar visibility for testing
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="w-[300px] min-w-[300px] md:w-[400px] md:min-w-[400px] flex-shrink-0 snap-start"
              >
                <Link href={`/articles/${article.slug}`} className="group flex flex-col h-full">
                  <article className="flex flex-col h-full">
                    
                    {/* Thumbnail Container */}
                    <div className="aspect-video w-full mb-4 overflow-hidden bg-gray-100">
                      {article.thumbnail?.url && (
                        <img 
                          src={article.thumbnail.url} 
                          alt={article.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      {/* Full Title */}
                      <h3 className="font-serif font-semibold text-xl leading-tight mb-3 group-hover:text-red-700 transition-colors">
                        {article.title}
                      </h3>
                      
                      {/* Description */}
                      {article.description && (
                        <p className="text-sm text-gray-600 line-clamp-3 leading-[1.6] text-ellipsis font-serif font-thin">
                          {article.description}
                        </p>
                      )}

                      {/* Authors */}
                      <div className=" pt-3">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                          By {article.authors.map((author, index) => (
                            <span key={author.id}>
                              {author.fullname}{index < article.authors.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>

                  </article>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
