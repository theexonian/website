"use client";

import {
	InstantSearch,
	SearchBox,
	InfiniteHits,
	Highlight,
	Snippet,
} from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import type { Hit as HitType } from "instantsearch.js";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const { searchClient } = instantMeiliSearch(
	`${process.env.MEILISEARCH_URL}`,
	`${process.env.MEILISEARCH_PK}`
);

interface Article {
	id: string;
	title: string;
	description: string;
	slug: string;
	tag: string;
	authors: { id: string; fullname: string; slug: string }[];
	publishedAt: string;
}

function Search() {
	const searchParams = useSearchParams();
	const search = searchParams.get("");
	return (
		<InstantSearch
			indexName="article"
			initialUiState={{
				article: {
					query: search || "",
				},
			}}
			searchClient={searchClient}
		>
			<div className="max-w-3xl w-11/12 mx-auto px-4 py-8 duration-300">
				<h2 className="text-3xl font-serif mb-6 text-gray-900">
					Search Articles
				</h2>
				<div className="mb-8">
					<CustomSearchBox />
				</div>
				<AnimatePresence>
					<InfiniteHits<Article>
						showPrevious={false}
						hitComponent={AnimatedHit}
						classNames={{
							loadMore:
								"border my-5 p-2 rounded-xl text-sm text-neutral-600 hover:bg-neutral-100 duration-300 flex items-center justify-center gap-2",
						}}
					/>
				</AnimatePresence>
			</div>
		</InstantSearch>
	);
}

export default function Searchbar() {
	return (
		<Suspense>
			<Search />
		</Suspense>
	);
}

function CustomSearchBox() {
	return (
		<>
			<SearchBox
				classNames={{
					root: "relative",
					form: "relative",
					input: "w-full py-3 pl-4 pr-12 text-lg border-b border-gray-300 focus:outline-none focus:border-red-600/50 transition-colors duration-200",
					submit: "absolute right-0 top-0 mt-3 mr-4",
					submitIcon: "hidden",
					reset: "hidden",
				}}
				submitIconComponent={() => (
					<FaSearch className="h-6 w-6 text-gray-500 transition-colors duration-200" />
				)}
				placeholder="Search title, text, date, author..."
			/>
		</>
	);
}

interface HitProps {
	hit: HitType<Article>;
}

const AnimatedHit: React.FC<HitProps> = ({ hit }) => (
	<motion.div
		key={hit.id}
		initial={{ opacity: 0.5, y: 0 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0.5, y: -10 }}
		transition={{ duration: 0.5, ease: "easeInOut" }}
	>
		<Hit hit={hit} />
	</motion.div>
);

const Hit: React.FC<HitProps> = ({ hit }) => (
	<div className="w-full flex items-center py-3 border-neutral-300 border-b gap-4">
		<div className="flex flex-col flex-wrap">
			<Link href={`/articles/${hit.slug}`}>
				<div className="w-full pr-3">
					<h3 className="font-bold font-sans capitalize bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
						{hit.tag}
					</h3>
					<h1 className="font-serif font-medium text-xl hover:text-neutral-600 duration-200">
						<Highlight
							classNames={{ highlighted: "bg-red-300/25" }}
							attribute="title"
							hit={hit}
							highlightedTagName="mark"
						/>
					</h1>
				</div>
				<div className="py-2">
					<p className="text-xs text-[#4E4E4E] hover:text-neutral-500 duration-200">
						<Snippet
							classNames={{ highlighted: "bg-red-300/25" }}
							hit={hit}
							attribute="description"
						/>
					</p>
				</div>
			</Link>
			<div className="font-sans">
				<p className="text-xs text-[#6C6C6C] duration-200">
					By:&nbsp;
					{hit.authors &&
						hit.authors.map((author, i) => {
							return (
								<Link
									className="text-xs hover:text-red-500 duration-200 no-underline capitalize"
									key={i}
									href={`/writers/${author.slug}`}
								>
									{author.fullname}
									{hit.authors.length - 1 !== i && ", "}
								</Link>
							);
						})}
				</p>
				{hit.publishedAt && (
					<p className="text-xs text-[#6C6C6C]">
						{new Date(hit.publishedAt).toLocaleDateString()}
					</p>
				)}
			</div>
		</div>
	</div>
);
