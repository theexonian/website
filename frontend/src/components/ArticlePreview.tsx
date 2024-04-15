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
					<div className="">
						<p className="text-xs text-[#6C6C6C]">
							By:{' '}
							<span>
								{article.authors.map((author, i) => {
									return author.fullname;
								})}
							</span>
						</p>
						<p className="text-xs text-[#6C6C6C]">
							{new Date(article.publishedAt).toLocaleDateString()}
						</p>
					</div>
				</div>
			</a>
		</div>
	);
}
