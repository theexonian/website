import Image from 'next/image';
import { Author } from '../../types/APIResponse';

interface PreviewProps {
	article: {
		title: string;
		tag?: string;
		description?: string;
		publishedAt?: string;
		authors?: Author[];
		slug: string;
		thumbnail: {
			url: string;
		};
	};
}

export default function Preview(props: PreviewProps) {
	const { title, tag, description, publishedAt, authors, thumbnail, slug } = props.article;
	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<a href={`/articles/${slug}`}>
				<div className="flex justify-between">
					<div className="w-full pr-3">
						{tag && (
							<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
								{tag.charAt(0).toUpperCase() + tag.slice(1)}
							</h3>
						)}
						{
							<h1 className="font-serif font-medium text-xl lg:text-lg py-2 hover:text-neutral-600 duration-200">
								{title}
							</h1>
						}
					</div>
				</div>
				{thumbnail && (
					<div className="hover:brightness-110 duration-500 py-2">
						<Image
							src={'http://127.0.0.1:1337' + thumbnail.url}
							width="0"
							height="0"
							sizes="25vw"
							className="w-full h-auto"
							alt={''}
						/>
					</div>
				)}

				{description && (
					<div>
						<p className="text-xs text-[#4E4E4E] hidden sm:flex hover:text-neutral-500 duration-200">
							{description}
						</p>
						<p className="text-xs text-[#4E4E4E] xl:hidden hover:text-neutral-500 duration-200">
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
	);
}
