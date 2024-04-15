import Image from 'next/image';
import { MdOutlineEmail } from 'react-icons/md';
import RowPreviewWithImage from '@/components/RowPreviewWithImage';
import { getAuthorBySlug } from '@/actions/getAuthorBySlug';

export default async function Page({ params }: { params: { slug: string } }) {
	const author = await getAuthorBySlug(params.slug);

	return (
		<div className="flex w-screen h-auto items-center justify-center">
			{/* TODO: Optimize min-h requirement */}
			<main className="flex w-3/4 max-w-[1600px] h-auto min-h-screen">
				<div className="w-full flex flex-col flex-wrap gap-1">
					<hr className="w-full border-neutral-300" />
					<hr className="w-full border-neutral-300" />
					<div className="w-full flex justify-center py-8">
						<div className={`bg-clip-border bg-center bg-no-repeat rounded-full w-24 h-24 bg-[url('/Filler.png')]`}></div>
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
						<div className="w-1/2 text-center">
							<p>
								{author.description ||
									'This author has not provided a description yet.'}
							</p>
						</div>
					</div>
					<div className="w-3/4 flex flex-col justify-center font-serif py-10">
						<hr className="border-black w-1/2" />
						<h1 className="text-2xl font-semibold">Latest Articles</h1>
						<RowPreviewWithImage article={author.articles[0]} />
					</div>
				</div>
			</main>
		</div>
	);
}
