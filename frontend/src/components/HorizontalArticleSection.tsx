import React from 'react';
import Link from 'next/link';
import { getArticlesByTag } from '@/actions/getArticlesByTag';

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
		articles = response && response.length > 0 ? response.slice(0, limit) : [];
	} catch (error) {
		console.error('Error fetching articles:', error);
		articles = [];
	}

	if (!articles.length) {
		return null;
	}

	return (
		<div className="py-3 print:hidden">
			<div className="max-w-full mx-auto">
				<div className="border-t border-border pt-4 mb-6">
					<div className="flex justify-between items-center mb-3 px-6">
						<h2 className="font-bold text-red-700 text-lg">{sectionTitle.toUpperCase()}</h2>
						<Link 
							href={`/tag/${sectionSlug}`}
							className="text-xs text-foreground hover:text-red-700 transition-colors duration-200"
						>
							VIEW ALL &gt;
						</Link>
					</div>
					<div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 px-6">
						{articles.map((article) => (
							<article key={article.id} className="pb-4 transition-colors duration-200 group">
								<Link
									href={`/articles/${article.slug}`}
									className="block"
								>
									<h3 className="font-serif font-medium text-sm leading-tight mb-2 group-hover:text-red-700 transition-colors duration-200 line-clamp-3">
										{article.title}
									</h3>
									{article.description && (
										<p className="font-serif font-thin text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
											{article.description}
										</p>
									)}
								</Link>
									<div className="mt-2">
										<div className="text-xs text-foreground mb-1">
											<div className="flex flex-wrap items-center gap-1">
												<span>By</span>
												{article.authors.map((author, i) => {
													return (
														<Link
															className="text-xs hover:text-red-500 duration-200 no-underline text-foreground capitalize"
															key={i}
															href={`/writers/${author.slug}`}
														>
															{author.fullname}
															{article.authors.length - 1 !== i && ","}
														</Link>
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
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
