import PreviewCenter from '@/components/PreviewCenter';
import RowPreview from '@/components/RowPreview';
import { getArticlesByTag } from '@/actions/getArticlesByTag';
import { notFound } from 'next/navigation';

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
	const { tag } = await params;

	if (!tag) {
		notFound();
	}

	const articles = await getArticlesByTag(tag);

	if (!articles || articles.length == 0)
		return <p>There aren't any articles in this category yet, check back later</p>;

	return (
		<>
			<div className="mb-3 py-5 px-3 2xl:px-8">
				<h1
					className={`inline-block text-7xl xl:text-5xl md:text-3xl font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] text-transparent bg-clip-text ${
						/[gjpqy]/i.test(tag) ? 'pb-3.5' : 'pb-1.5'
					}`}
				>
					{tag.charAt(0).toUpperCase() + tag.slice(1)}
				</h1>
				<span className="md:hidden font-serif text-sm xl:text-md inline px-[3rem] text-muted-foreground">
					{tag.toLowerCase() == 'news'
						? `Stay updated with the latest news articles on campus and the world.`
						: tag.toLowerCase() == 'oped'
						? `Explore diverse opinions and insights with our opinion articles.`
						: tag.toLowerCase() == 'life'
						? `Explore articles about campus life, student experiences, and lifestyle tips.`
						: tag.toLowerCase() == 'sports'
						? `Get the latest updates and highlights from our sports teams.`
						: tag.toLowerCase() == 'humor'
						? `Read humorous takes on campus life and current events.`
						: `Discover articles and stories related to ${tag}.`}
				</span>
				<hr className="border-red-700 w-3/4 md:w-full border-[1px]" />
			</div>
			

			
			{/* Grid layout similar to home page */}
			<div className="grid grid-cols-4 lg:grid-cols-1">
				{/* Main featured article in center */}
				<div className="flex col-span-4 px-4 2xl:px-8 border-border border-b md:border-none mb-7 md:mb-0">
					{articles[0] && (
						<>
							{(() => {
								const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL ?? '';
								const imageByTag: Record<string, string> = {
									news: 'https://d2stzhv1hip58f.cloudfront.net/News_pick_13b4cd203f.png',
									oped: 'https://d2stzhv1hip58f.cloudfront.net/oped_pick_63e8212271.png',
									life: 'https://d2stzhv1hip58f.cloudfront.net/Life_pick_5d5ab0621c.png',
									sports: 'https://d2stzhv1hip58f.cloudfront.net/Sports_pick_9a8dd1ac76.png',
									humor: 'https://d2stzhv1hip58f.cloudfront.net/humor_pick_91f35c33fc.png',
								};

								const src = imageByTag[tag.toLowerCase()];
								const finalSrc = src?.startsWith('http') ? src : (baseUrl ? `${baseUrl}${src}` : undefined);
								if (!finalSrc) return null;

								return (
									<div className="relative h-[5rem] sm:h-[3.5rem] md:h-[4.5rem] xl:h-[5rem] flex items-center pr-3 lg:pr-4 xl:pr-6">
										<img
											src={finalSrc}
											alt={`${tag} banner`}
											className="h-full aspect-square object-cover"
											loading="eager"
										/>
										{/* shorter vertical border, centered */}
										{/* <span className="absolute right-0 top-3/4 -translate-y-1/2 h-20 border-r border-border" aria-hidden /> */}
									</div>
								);
							})()}
							<RowPreview article={articles[0]} border={false} thumbnailRatio='16/9'/>
						</>
					)}
				</div>
				{/* Left column - featured article */}
				<div className="col-span-4 ">
					<div className="grid grid-cols-2 lg:grid-cols-1">
						{articles.slice(1).map((article, i) =>
							article ? (
								<div
									key={i + 1}
									className={`h-full w-full px-4 2xl:px-8 py-2 
										${i >= 2 ? 'border-t border-border' : ''} 
										${i % 2 === 1 ? 'border-l border-border lg:border-l-0' : ''}
									`}
								>
									<RowPreview article={article} border={false} />
								</div>
							) : null
						)}
					</div>
				</div>
			</div>

			{/* Additional articles in row format if there are more
			{articles.length > 8 && (
				<div className="py-7 md:py-2">
					<div className="w-full flex flex-col justify-center font-serif px-3">
						{articles.slice(8).map((article, i) => {
							return <RowPreview key={i + 8} article={article} />;
						})}
					</div>
				</div>
			)} */}
		</>
	);
}
