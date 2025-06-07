import { getArticleByZIndex } from "@/actions/getArticleByZIndex";
import Image from "next/image";
import * as Constants from "@/components/Constants";
import Link from "next/link";

export default async function ArticlePreview({ z }: { z: number }) {
	const article = await getArticleByZIndex(z);

	if (!article) {
		return null;
	}

	return (
		<div className="w-full p-2 border-neutral-300 border-b">
			<Link href={`/articles/${article.slug}`}>
				<div className="w-full pr-3">
					{article.tag && (
						<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text text-sm">
							{article.tag.charAt(0).toUpperCase() +
								article.tag.slice(1)}
						</h3>
					)}
				</div>
				{article.thumbnail && (
					<Image
						src={
							article.thumbnail.url.startsWith("http")
								? article.thumbnail.url 
								: `https://${Constants.STRAPI_IP}${article.thumbnail.url}`
						}
						width="0"
						height="0"
						sizes="25vw"
						className="w-full max-h-[40vh] py-2 overflow-hidden object-cover"
						alt={"Logo of The Exonian"}
					/>
				)}

				<div className="max-w-[600px]">
					<div className="flex justify-between">
						<div className="">
							<h1 className="font-serif font-medium text-xl">
								{article.title}
							</h1>
						</div>
					</div>
					<div className="py-3">
						<p className="text-xs text-neutral-500 text-ellipsis line-clamp-3 font-serif font-thin">
							{article.description}
						</p>
					</div>
				</div>
			</Link>

			<div className="text-xs">
				By{" "}
				{Array.isArray(article.authors) &&
					article.authors.map((author, i) => (
						<Link
							className="text-xs hover:text-red-500 duration-200 no-underline text-neutral-700 capitalize"
							key={i}
							href={`/writers/${author.slug}`}
						>
							{author.fullname}
							{article.authors.length - 1 !== i && ", "}
						</Link>
					))
				}
				<p className="text-xs text-neutral-600">
					{new Date(article.publishedAt).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
