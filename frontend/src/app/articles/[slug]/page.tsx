import Image from "next/image";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiFontFamily, BiPrinter } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { getArticleById } from "@/actions/getArticleById";
import Markdown from "react-markdown";

export default async function Page({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const article = await getArticleById(slug);

	const paragraphs = article.content.split("\n").filter((p) => p.trim());

	// Remove first paragraph if it starts with "By"
	const processedParagraphs = paragraphs[0]?.trim().startsWith("By")
		? paragraphs.slice(1)
		: paragraphs;

	if (!article) return null;

	return (
		<div className="w-full flex justify-center">
			<article className="prose prose-sm pt-8 font-serif prose-figcaption:font-sans prose-p:indent-8">
				<h3 className="font-black font-sans text-3xl bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text m-0">
					{article.tag.charAt(0).toUpperCase() + article.tag.slice(1)}
				</h3>
				<h1 className="font-normal text-5xl my-2">{article.title}</h1>
				<span className="p-0 m-0 text-lg text-neutral-800">
					By:{" "}
					{article.authors.map((author, i) => {
						return (
							<a
								className="hover:text-red-500 duration-200 font-bold no-underline"
								href={`/writers/${author.slug}`}
								key={i}
							>
								{i === article.authors.length - 1
									? author.fullname
									: author.fullname + ", "}
							</a>
						);
					})}
				</span>
				<br />
				<span className="p-0 m-0 text-xs text-neutral-600">
					{new Date(article.publishedAt)
						.toUTCString()
						.split(" ")
						.slice(0, 4)
						.join(" ")}
				</span>
				<div className="flex flex-row gap-5 my-2">
					<div className="flex items-center gap-2 text-red-700">
						<IoShareSocialOutline className="text-xl" /> Share
					</div>
					<div className="flex items-center gap-2 text-red-700">
						<BiFontFamily className="text-xl" /> Font
					</div>
					<div className="flex items-center gap-2 text-red-700">
						<HiOutlineNewspaper className="text-xl" /> Publication
					</div>
					<div className="flex items-center gap-2 text-red-700">
						<BiPrinter className="text-xl" /> Print
					</div>
				</div>
				<hr className="border-neutral-400 mb-8 mt-2" />
				{article.thumbnail && (
					<Image
						src={"http://34.227.161.14:1337" + article.thumbnail.url}
						width="0"
						height="0"
						sizes="25vw"
						className="w-full h-auto"
						alt={"Logo of The Exonian"}
					/>
				)}

				{paragraphs.map((paragraph, i) => (
					<p
						key={i}
						className={`indent-8 ${
							i === 0 ? "first-letter:text-2xl" : ""
						}`}
					>
						{paragraph}
					</p>
				))}
			</article>
		</div>
	);
}
