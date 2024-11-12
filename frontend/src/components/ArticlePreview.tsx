import { getArticleByZIndex } from '@/actions/getArticleByZIndex';
import Image from 'next/image';

export default async function ArticlePreview({ z }: { z: number }) {
	const article = await getArticleByZIndex(z);

	if (!article) {
		return null;
	}

	return (
		<div className="w-full p-2 border-neutral-300 border-b">
			<a href={`/articles/${article.slug}`}>
				<div className="w-full pr-3">
					{article.tag && (
						<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text text-sm">
							{article.tag.charAt(0).toUpperCase() + article.tag.slice(1)}
						</h3>
					)}
				</div>
				{article.thumbnail && (
					<Image
						src={'http://34.227.161.14:1337' + article.thumbnail.url}
						width="0"
						height="0"
						sizes="25vw"
						className="w-full h-auto py-2"
						alt={'Logo of The Exonian'}
					/>
				)}

				<div className="max-w-[600px]">
					<div className="flex justify-between">
						<div className="">
							<h1 className="font-serif font-medium text-xl">
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
			</a>

			<div className="text-xs">
				{' '}
				{article.authors.map((author, i) => {
					return (
						<a
							className="text-xs hover:text-red-500 duration-200 no-underline uppercase text-neutral-700"
							key={i}
							href={`/writers/${author.slug}`}
						>
							{author.fullname}
							{article.authors.length - 1 !== i && ', '}
						</a>
					);
				})}
				{/* </div> */}
				<p className="text-xs text-neutral-600">
					{new Date(article.publishedAt).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
