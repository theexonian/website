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

	const displayDate = new Date(article.createdAt).toLocaleDateString("en-US", {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "America/New_York",
	});

	const photo = article.thumbnail;

	const useHero = Boolean(
		photo?.width &&
		photo?.height &&
		photo.width > photo.height
	);

	const photoSrc = photo?.url
		? photo.url.startsWith("http")
			? photo.url
			: `http://${Constants.STRAPI_IP}:1337${photo.url}`
		: null;

	const paragraphs = article.content.split("\n").filter((p) => p.trim());

	// Remove first paragraph if it starts with "By"
	const processedParagraphs = paragraphs[0]?.trim().startsWith("By ")
		? paragraphs.slice(1)
		: paragraphs;

	return (
		<>
			{useHero && photoSrc && (
				<header
					className="relative isolate flex w-full items-end bg-neutral-900"
					style={{
						minHeight: "calc(100dvh - var(--navbar-height, 0px))",
					}}
				>

					<div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-neutral-900">
						{/* Layer 1: the photo fills the header */}
						<Image
							src={photoSrc}
							alt={article.title}
							fill
							sizes="100vw"
							loading="eager"
							className="object-cover"
						/>

						{/* Layer 2: darken the bottom so the text is readable */}
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
						/>
					</div>

					{/* Layer 3: headline information over the photo */}
					<div className="relative z-10 w-full px-10 py-10 text-white sm:px-5 sm:py-6">
						<div className="max-w-[55rem]">

							<p className="font-sans text-xl font-black uppercase">
								{article.tag}
							</p>

							<h1 className="my-2 break-words font-serif text-4xl sm:text-3xl">
								<i>{article.title}</i>
							</h1>

							<p className="font-serif text-lg">
								By{" "}
								{article.authors.map((author, i) => (
									<Link
										key={author.slug}
										href={`/writers/${author.slug}`}
										className="font-bold capitalize text-white hover:text-white hover:underline"
									>
										{author.fullname}
										{i < article.authors.length - 1 ? ", " : ""}
									</Link>
								))}
							</p>

							<p className="mt-2 text-xs text-white/80">
								{displayDate}
							</p>

						</div>
					</div>
				</header>
			)}

			<div className="px-4 w-full flex justify-center">
				<article className="max-w-none w-[45rem] lg:w-[36rem] prose prose-neutral dark:prose-invert pt-7 sm:pt-3 font-serif prose-figcaption:font-sans prose-p:indent-8">
					{!useHero && (
						<>
							<h3 className="font-[700] font-sans text-xl text-red-700 inline-block bg-clip-text m-0">
								{article.tag.toUpperCase()}
							</h3>
							<h1 className="sm:text-3xl text-4xl mt-1 mb-2 font-test font-bold">{article.title}</h1>
							<span className="p-0 m-0 text-lg flex flex-wrap gap-1 leading-tight text-gray-600 tracking-wider font-[700] font-sans uppercase">
								By {" "}
								{article.authors.map((author, i) => (
									<Link
										className="hover:text-[rgb(158,158,158)] duration-200 no-underline"
										href={`/writers/${author.slug}`}
										key={i}
									>
										{author.fullname}{i < article.authors.length - 1 ? ", " : ""}
									</Link>
								))}
							</span>
							<span className="p-0 pb-2 m-0 text-xs text-neutral-600">
								{displayDate}
							</span>
						</>
					)}
					
					<div className="flex flex-row gap-5 my-2 child-hover:cursor-pointer print:hidden">
						<div className="flex items-center gap-2 text-red-700">
							{/* dynamically & automatically grabs link since it's a CSR component */}
							<SocialShareDropdown title={article.title} />
						</div>
						<div className="flex items-center gap-2 text-red-700">
							<FontChanger/>
						</div>
						<Link target="_blank" href="/pdf-exonian-archive" className="flex items-center gap-2 hover:underline underline-offset-4 text-sm font-medium hover:text-[rgb(158,158,158)] text-red-700 no-underline">
							<HiOutlineNewspaper className="text-xl" />
							Publication
						</Link>
						<div className="flex items-center gap-2 text-red-700 font-medium text-sm hover:underline underline-offset-4">
							<PrintArticle/>
						</div>
					</div>
					{/* <div className="py-1">
						<Speechify inputText={article.content} />
					</div> */}
					
					<hr className="border-neutral-400 mb-8 mt-2" />
					
					{!useHero && article.thumbnail && (
						<Image
							src={
								article.thumbnail.url.startsWith("http")
									? article.thumbnail.url 
										: `http://${Constants.STRAPI_IP}:1337${article.thumbnail.url}`
							}
							width="0"
							height="0"
							sizes="25vw"
							className="mx-auto w-5/6 max-h-[30vh] object-contain my-2 mb-7 sm:mb-3"
							alt={"Logo of The Exonian"}
						/>
					)}


					{paragraphs.map((paragraph, i) => (
						<p
							key={i}
							className={`indent-8 text-[14pt] leading-[1.5] mt-3 ${
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
					sectionTitle={`More ${article.tag === 'oped' ? 'Opinion' : article.tag.charAt(0).toUpperCase() + article.tag.slice(1)}`}
					sectionSlug={article.tag}
					limit={5}
					showImages={article.tag !== 'humor'}
				/>
			</div>
		</>
	);
}
