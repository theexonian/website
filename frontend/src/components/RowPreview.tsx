import Image from "next/image";
import { Author } from "../../types/APIResponse";
import Link from "next/link";

interface ArticleRowPreviewProps {
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

export default function RowPreview(props: ArticleRowPreviewProps) {
	const { title, tag, thumbnail, description, publishedAt, authors, slug } =
		props.article;

	return (
		// @TODO: refactor for props
		<div className="w-full flex items-center py-3 border-neutral-300 border-b gap-4">
			<div className="flex flex-col flex-wrap">
				<Link href={`/articles/${slug}`}>
					<div className="w-full pr-3">
						<h3 className="font-bold font-sans bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
							{tag
								? tag.charAt(0).toUpperCase() + tag.slice(1)
								: ""}
						</h3>
						<h1 className="font-serif font-medium text-xl hover:text-neutral-600 duration-200">
							{title}
						</h1>
					</div>
					<div className="py-2">
						<p className="text-xs text-[#4E4E4E] hover:text-neutral-500 duration-200">
							{description}
						</p>
					</div>
				</Link>
				<div className="font-sans">
					<p className="text-xs text-[#6C6C6C] duration-200">
						By:&nbsp;
						{authors &&
							authors.map((author, i) => {
								return (
									<Link
										className="text-xs hover:text-red-500 duration-200 no-underline capitalize"
										key={i}
										href={`/writers/${author.slug}`}
									>
										{author.fullname}
										{authors.length - 1 !== i && ", "}
									</Link>
								);
							})}
					</p>
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
