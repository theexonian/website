"use client";

import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import type { Hit as HitType } from "instantsearch.js";
import { FaSearch } from "react-icons/fa";

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
	authors: { id: string; fullname: string }[];
}

export default function Search() {
	return (
		<InstantSearch indexName="article" searchClient={searchClient}>
			<div className="max-w-4xl mx-auto px-4 py-8">
				<h2 className="text-3xl font-serif mb-6 text-gray-900">
					Search Articles
				</h2>
				<div className="mb-8">
					<CustomSearchBox />
				</div>
				<Hits<Article> hitComponent={Hit} />
			</div>
		</InstantSearch>
	);
}

function CustomSearchBox() {
	return (
		<SearchBox
			classNames={{
				root: "relative",
				form: "relative",
				input: "w-full py-3 pl-4 pr-12 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 transition-colors duration-200",
				submit: "absolute right-0 top-0 mt-3 mr-4",
				submitIcon: "hidden",
				reset: "hidden",
			}}
			submitIconComponent={() => (
				<FaSearch className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
			)}
			placeholder="Search for articles..."
		/>
	);
}

interface HitProps {
	hit: HitType<Article>;
}

const Hit: React.FC<HitProps> = ({ hit }) => (
	<a href={`/articles/${hit.slug}`}>
		<div
			key={hit.id}
			className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
		>
			<h3 className="text-xl font-serif mb-2 text-gray-900">
				<Highlight
					classNames={{ highlighted: "bg-yellow-300/25" }}
					attribute="title"
					hit={hit}
					highlightedTagName="mark"
				/>
			</h3>
			<p className="text-gray-700">{hit.description}</p>
			<div className="mt-2">
				{hit.authors.map(
					(author: { id: string; fullname: string }, index: number) => (
						<span
							key={author.id}
							className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2"
						>
							{author.fullname}
						</span>
					)
				)}
			</div>
		</div>
	</a>
);
