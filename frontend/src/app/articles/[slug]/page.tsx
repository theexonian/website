import Image from "next/image";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiFontFamily, BiPrinter } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { getArticleById } from "@/actions/getArticleById";
import { Speechify } from "@/components/ui/speechify";
import SocialShareDropdown from "@/components/ui/socialDropdown";
import Link from "next/link";
import FontChanger from "@/components/ui/fontChanger";
import PrintArticle from "@/components/ui/printArticle";
import HorizontalArticleSection from "@/components/HorizontalArticleSection";
import * as Constants from "@/components/Constants";

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const article = await getArticleById(slug);

	if (!article || !article.content) return null;

	const paragraphs = article.content.split("\n").filter((p) => p.trim());

	// Remove first paragraph if it starts with "By"
	const processedParagraphs = paragraphs[0]?.trim().startsWith("By ")
		? paragraphs.slice(1)
		: paragraphs;

	return (
		<>
			<div className="w-full px-10 mx-auto max-w-[50rem] flex justify-center">
				<article className="prose prose-neutral dark:prose-invert pt-8 font-serif prose-figcaption:font-sans prose-p:indent-8">
					<h3 className="font-black font-sans text-xl text-red-700 inline-block bg-clip-text m-0">
						{/* {article.tag.charAt(0).toUpperCase() + article.tag.slice(1)} */}
						{article.tag.toUpperCase()}
					</h3>
					<h1 className="font-normal text-5xl my-2 font-serif"><i>{article.title}</i></h1>
					<span className="p-0 m-0 text-lg text-muted-foreground">
						By {" "}
						{article.authors.map((author, i) => {
							return (
								<Link
									className="hover:text-red-500 duration-200 font-bold no-underline capitalize"
									href={`/writers/${author.slug}`}
									key={i}
								>
									{i === article.authors.length - 1
										? author.fullname
										: author.fullname + ", "}
								</Link>
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

					{article.thumbnail && (
						<Image
							src={
								article.thumbnail.url.startsWith("http")
									? article.thumbnail.url 
									: `http://${Constants.STRAPI_IP}:1337${article.thumbnail.url}`
							}
							width="0"
							height="0"
							sizes="25vw"
							className="w-full h-auto"
							alt={"Logo of The Exonian"}
						/>
					)}
					
					<div className="flex flex-row gap-5 my-2 child-hover:cursor-pointer">
						<div className="flex items-center gap-2 text-red-700">
							{/* dynamically & automatically grabs link since it's a CSR component */}
							<SocialShareDropdown title={article.title} />
						</div>
						<div className="flex items-center gap-2 text-red-700">
							<FontChanger/>
						</div>
						<Link target="_blank" href="/pdf-exonian-archive" className="flex items-center gap-2 hover:underline underline-offset-4 text-sm font-medium hover:text-red-700 text-red-700 no-underline">
							<HiOutlineNewspaper className="text-xl" />
							Publication
						</Link>
						<div className="flex items-center gap-2 text-red-700 font-medium text-sm hover:underline underline-offset-4">
							<PrintArticle/>
						</div>
					</div>
					<div className="py-1">
						<Speechify inputText={article.content} />
					</div>
					
					<hr className="border-neutral-400 mb-8 mt-2" />
					

					{paragraphs.map((paragraph, i) => (
						<p
							key={i}
							className={`indent-8 text-[13pt] ${
								i === 0 ? "first-letter:text-2xl" : ""
							}`}
						>
							{paragraph}
						</p>
					))}
				</article>
			</div>
			
			{/* Related Articles Section - Full width at bottom */}
			<div className="w-full mt-16">
				<HorizontalArticleSection 
					sectionTitle={`More ${article.tag === 'oped' ? 'Opinions' : article.tag.charAt(0).toUpperCase() + article.tag.slice(1)}`}
					sectionSlug={article.tag}
					limit={5}
				/>
			</div>
		</>
	);
}
