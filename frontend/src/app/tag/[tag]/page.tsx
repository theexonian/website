import PreviewCenter from '@/components/PreviewCenter';
import Preview from '@/components/Preview';
import RowPreview from '@/components/RowPreview';
import { getArticlesByTag } from '@/actions/getArticlesByTag';

export default async function Page({ params }: { params: { tag: string } }) {
	const { tag } = params;

	const articles = await getArticlesByTag(tag);

	if (!articles || articles.length == 0)
		return <p>There aren't any articles in this category yet, check back later</p>;

	return (
		<>
			<div className="py-3">
				<h1 className="text-7xl xl:text-5xl md:text-3xl font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
					{tag.charAt(0).toUpperCase() + tag.slice(1)}
				</h1>
				<hr className="border-red-600 w-1/2 border-[1px]" />
			</div>
			
			{/* Grid layout similar to home page */}
			<div className="grid grid-cols-4 md:grid-cols-1">
				{/* Left column - featured article */}
				<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-r md:border-none md:order-1">
					{articles[0] && <PreviewCenter article={articles[0]} />}
					{articles[3] && <RowPreview article={articles[3]} />}
					{articles[4] && <RowPreview article={articles[4]} />}
				</div>
				
				{/* Right column - additional articles */}
				<div className="col-span-2 px-4 2xl:px-8 md:order-2">
					{articles[1] && <Preview article={articles[1]} />}
					{articles[2] && <Preview article={articles[2]} />}
					{articles[5] && <Preview article={articles[5]} />}
					{articles[6] && <Preview article={articles[6]} />}
				</div>
			</div>

			{/* Additional articles in row format if there are more */}
			{articles.length > 7 && (
				<div className="py-7 md:py-2">
					<div className="w-full flex flex-col justify-center font-serif px-3">
						{articles.slice(7).map((article, i) => {
							return <RowPreview key={i + 7} article={article} />;
						})}
					</div>
				</div>
			)}
		</>
	);
}
