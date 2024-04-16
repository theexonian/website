import { MdOutlineEmail } from 'react-icons/md';
import Preview from '@/components/Preview';
import { getAuthorBySlug } from '@/actions/getAuthorBySlug';

export default async function Page({ params }: { params: { slug: string } }) {
	const author = await getAuthorBySlug(params.slug);

	return (
		<>
			<div className="w-full flex justify-center py-8">
				<div className="bg-clip-border bg-center bg-no-repeat rounded-full w-24 h-24 bg-[url('/Filler.png')]"></div>
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
			<div className="w-3/4 flex flex-col justify-center font-serif py-10">
				<hr className="border-black w-1/2" />
				<h1 className="text-2xl pt-3 font-semibold">Latest Articles</h1>
				{
					author.articles.map((article) => (
						<Preview
							key={article.slug}
							title={article.title}
							description={"Description"}
							genre={article.tag}
							image={article.thumbnail && "http://127.0.0.1:1337" + article.thumbnail.url}
							imageCenter={true}
						/>
					))
				}
		
			</div>
		</>
	);
}
