import { getAuthorBySlug } from '@/actions/getAuthorBySlug';
import PreviewNoImage from '@/components/PreviewNoImage';
import Image from 'next/image';
import { MdOutlineEmail } from 'react-icons/md';

export default async function Page({ params }: { params: { slug: string } }) {
	const author = await getAuthorBySlug(params.slug);

	return (
		<>
			<div className="w-full flex justify-center py-8">
				<div className="bg-clip-border bg-center bg-no-repeat rounded-full w-24 h-24">
					{author.picture ? (
						<Image
							src={'http://127.0.0.1:1337' + author.picture.url}
							alt={author.fullname}
							height={96}
							width={96}
						/>
					) : (
						<Image src={'/Small.png'} alt="Missing Image" height={96} width={96} />
					)}
				</div>
			</div>
			<div className="w-full flex justify-center font-serif text-4xl font-semibold">
				<h1>{author.fullname}</h1>
			</div>
			<div className="w-full flex justify-center font-sans text-md items-center text-neutral-600 font-light">
				<p>{author.position}</p>
				<div className="p-2 font-xl">
					<a href={'mailto:' + author.email}>
						<MdOutlineEmail />
					</a>
				</div>
			</div>
			<div className="w-full flex justify-center font-serif text-neutral-500 font-thin">
				<div className="w-1/2 md:w-2/3 text-center text-sm md:text-xs">
					<p>{author.description}</p>
				</div>
			</div>
			<div className="w-full flex flex-col items-center justify-center font-serif py-10">
				<hr className="border-black w-full" />
				<h1 className="text-2xl pt-3 font-semibold">Latest Articles</h1>
				{author.articles.map((article) => (
					<PreviewNoImage
						key={article.slug}
						title={article.title}
						description={article.description}
						tag={article.tag}
						slug={article.slug}
						publishedAt={article.publishedAt}
					/>
				))}
			</div>
		</>
	);
}
