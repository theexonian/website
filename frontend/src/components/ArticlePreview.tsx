import { getArticleByZIndex } from '@/actions/getArticleByZIndex';
import Image from 'next/image';

export default async function ArticlePreview({ z }: { z: number }) {
	const article = await getArticleByZIndex(z);

	if (!article) {
		return null;
	}

	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<a href={`/articles/${article.slug}`}>
				<div className="w-full pr-3">
					{article.tag && (
						<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
							{article.tag.charAt(0).toUpperCase() + article.tag.slice(1)}
						</h3>
					)}
				</div>
				{article.thumbnail && (
					<Image
						src={'http://127.0.0.1:1337' + article.thumbnail.url}
						width="0"
						height="0"
						sizes="25vw"
						className="w-full h-auto"
						alt={'Logo of The Exonian'}
					/>
				)}

				<div className="max-w-[600px]">
					<div className="flex justify-between">
						<div className="">
							<h1 className="font-serif font-medium text-3xl py-2">
								{article.title}
							</h1>
						</div>
					</div>
					<div className="py-3">
						<p className="text-xs text-[#4E4E4E] text-ellipsis line-clamp-3">
							{article.content}
						</p>
					</div>
					{/* A list of authors separated by a comma and a space */}
					{/* <div className="text-xs text-[#6C6C6C]"> */}
				</div>
			</a>

			<div className="text-xs">
				By:{' '}
				{article.authors.map((author, i) => {
					return (
						<a
							className="text-xs hover:text-red-500 duration-200 no-underline"
							key={i}
							href={`/writers/${author.slug}`}
						>
							{author.fullname}
							{article.authors.length - 1 !== i && ', '}
						</a>
					);
				})}
				{/* </div> */}
				<p className="text-xs text-[#6C6C6C]">
					{new Date(article.publishedAt).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
