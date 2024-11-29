"use client";

import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { searchClient } = instantMeiliSearch(
	`${process.env.MEILISEARCH_URL}`,
	`${process.env.MEILISEARCH_PK}`
);

export default function Search() {
	return (
		<InstantSearch indexName="article" searchClient={searchClient}>
			<SearchBox />
			<Hits hitComponent={Hit} />
		</InstantSearch>
	);
}

const Hit = ({ hit }) => (
	<div key={hit.id}>
		<div className="hit-name text-lg font-bold">
			<Highlight attribute="title" hit={hit} />
		</div>
		<p>{hit.description}</p>
	</div>
);
