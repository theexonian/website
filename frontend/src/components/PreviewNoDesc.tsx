import { getRecentArticle } from '@/actions/getRecentArticle';

export default async function PreviewNoDesc() {
	const article = await getRecentArticle();

	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<a href={`/articles/${article.slug}`}>
				<div className="flex justify-between">
					<div className="">
						<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
							Life
						</h3>
						<h1 className="font-serif font-medium text-xl py-2">{article.title}</h1>
					</div>
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
			</a>
		</div>
	);
}
