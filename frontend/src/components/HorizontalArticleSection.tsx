import Link from 'next/link';
import { getArticlesByTag } from '@/actions/getArticlesByTag';
import { HiChevronRight } from "react-icons/hi";

interface Article {
	id: number;
	title: string;
	slug: string;
	description: string;
	thumbnail?: {
		url: string;
	};
	publishedAt: string;
	tag: string;
	authors: Array<{
		id: number;
		fullname: string;
		slug: string;
	}>;
}

interface HorizontalArticleSectionProps {
	sectionTitle: string;
	sectionSlug: string;
	limit?: number;
}

export default async function HorizontalArticleSection({ 
	sectionTitle, 
	sectionSlug, 
	limit = 5 
}: HorizontalArticleSectionProps) {
	let articles: Article[] = [];
	
	try {
		const response = await getArticlesByTag(sectionSlug);
		if (response && response.length > 0) {
			articles = response.slice(0, limit);
		}
	} catch (error) {
		console.error(`Error fetching articles for section ${sectionSlug}:`, error);
		// Return null on error to fail gracefully without breaking the page
		return null;
	}

	if (!articles.length) {
		return null;
	}

	return (
		<div className="pt-6">
			<div className="max-w-full mx-auto">
				<div className="border-t border-border pt-4 mb-6">
					<div className="flex justify-between items-center mb-6 px-6">
						<h2 className="font-bold text-red-700 text-xs">{sectionTitle.toUpperCase()}</h2>
						<Link 
							href={`/${sectionSlug}`}
							className="text-xs text-foreground hover:text-red-700 transition-colors duration-200"
						>
							<div className="flex flex-row gap-1"><span>View all</span><span><HiChevronRight className="h-4 w-4 mt-[-1px]"/></span></div>
						</Link>
					</div>
					<div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 px-6">
						{articles.map((article) => (
							<Link 
								key={article.id} 
								href={`/articles/${article.slug}`}
								className="group block"
							>
								<article className="pb-4 transition-colors duration-200">
									<h3 className="font-serif font-medium text-sm leading-tight mb-2 group-hover:text-red-700 transition-colors duration-200 line-clamp-3">
										{article.title}
									</h3>
									{article.description && (
										<p className="font-serif font-thin text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
											{article.description}
										</p>
									)}
									<div className="mt-2">
										<div className="text-xs text-foreground mb-1">
											<div className="flex flex-wrap items-center gap-1">
												<span>By</span>
												{article.authors.map((author, i) => {
													return (
														<p
															className="text-xs duration-200 no-underline text-foreground capitalize"
															key={i}
														>
															{author.fullname + (article.authors.length - 1 !== i ? "," : "")}
														</p>
													);
												})}
											</div>
										</div>
										<span className="text-xs text-muted-foreground">
											{new Date(article.publishedAt).toLocaleDateString('en-US', { 
												year: 'numeric',
												month: 'short', 
												day: 'numeric' 
											})}
										</span>
									</div>
								</article>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
