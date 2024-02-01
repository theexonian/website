import Image from 'next/image';
import { getRecentArticle } from '@/actions/getRecentArticle';

export default async function PreviewCenter() {
	const article = await getRecentArticle();

	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<div className="">
				<Image
					src={'/Main.png'}
					width="0"
					height="0"
					sizes="25vw"
					className="w-full h-auto"
					alt={'Logo of The Exonian'}
				/>
			</div>
			<div className="max-w-[600px]">
				<div className="flex justify-between">
					<div className="">
						<h1 className="font-serif font-medium text-3xl py-2">{article.title}</h1>
					</div>
				</div>
				<div className="py-3">
					<p className="text-xs text-[#4E4E4E]">{article.content}</p>
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
		</div>
	);
}
