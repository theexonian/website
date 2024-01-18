import { getArticleById } from '@/actions/getArticleById';
import Image from 'next/image';

export default async function Page({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const article = await getArticleById(slug);

	return (
		<div className="flex w-screen h-auto items-center justify-center">
			{/* TODO: Optimize min-h requirement */}
			<main className="flex w-3/4 max-w-[1600px] h-auto min-h-screen">
				<div className="w-full flex flex-col flex-wrap gap-1">
					<hr className="w-full border-neutral-300" />
					<hr className="w-full border-neutral-300" />
					<article className="prose 2xl:prose-lg pt-8 font-serif ml-32 2xl:ml-64 prose-figcaption:font-sans prose-p:indent-8">
						<h3 className="font-bold text-3xl bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text m-0">
							Life
						</h3>
						<h1>{article.title}</h1>
						<span className="p-0 m-0">
							By:{' '}
							{article.authors.map((author, i) => {
								return (
									<a
										className="hover:text-red-500 duration-200 font-bold no-underline"
										href="/writers"
										key={i}
									>
										{author.fullname}
									</a>
								);
							})}
						</span>
						<br />
						<span className="p-0 m-0">
							{new Date(article.publishedAt).toUTCString()}
						</span>
						<figure>
							<Image
								src={'/Article.png'}
								width="0"
								height="0"
								sizes="25vw"
								className="w-full h-auto"
								alt={'Logo of The Exonian'}
							/>
							<figcaption>
								Emma Zimmerman poses for a photo, Courtesy of Grounded Podcast
							</figcaption>
						</figure>
						<p>{article.content}</p>
					</article>
				</div>
			</main>
		</div>
	);
}
