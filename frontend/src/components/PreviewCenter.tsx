import Image from 'next/image';
import { Author } from '../../types/APIResponse';

interface PreviewCenterProps {
	article: {
		title: string;
		thumbnail?: { url: string };
		description?: string;
		publishedAt?: string;
		authors?: Author[];
		slug: string;
	};
}

export default function PreviewCenter(props: PreviewCenterProps) {
	const { title, thumbnail, description, publishedAt, authors, slug } = props.article;

	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<div className="max-w-[600px]">
				<a href={`/articles/${slug}`}>
					{thumbnail && (
						<div className="hover:brightness-110 duration-500">
							<Image
								src={'http://34.227.161.14:1337' + thumbnail?.url}
								width="0"
								height="0"
								sizes="100vw"
								className="w-full h-auto"
								alt={'Logo of The Exonian'}
							/>
						</div>
					)}

					<div className="flex justify-between">
						<div className="">
							<h1 className="font-serif font-medium text-3xl md:text-xl py-2 hover:text-neutral-600 duration-200">
								{title}
							</h1>
						</div>
					</div>
					{description && (
						<div>
							<p className="text-xs md:text-2xs text-[#4E4E4E] hover:text-neutral-500 duration-200">
								{description}
							</p>
						</div>
					)}
				</a>
				<div className="pt-2">
					{authors && (
						<p className="text-xs text-[#6C6C6C] duration-200">
							By:&nbsp;
							{authors.map((author, i) => {
								return (
									<a
										className="text-xs hover:text-red-500 duration-200 no-underline"
										key={i}
										href={`/writers/${author.slug}`}
									>
										{author.fullname}
										{authors.length - 1 !== i && ', '}
									</a>
								);
							})}
						</p>
					)}
					{publishedAt && (
						<p className="text-xs text-[#6C6C6C]">
							{new Date(publishedAt).toLocaleDateString()}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
