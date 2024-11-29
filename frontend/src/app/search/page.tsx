"use client";

import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { searchClient } = instantMeiliSearch(
	"http://localhost:7700",
	"masterKey"
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
