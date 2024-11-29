"use client";

import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import type { Hit as HitType } from "instantsearch.js";

const { searchClient } = instantMeiliSearch(
	`${process.env.MEILISEARCH_URL}`,
	`${process.env.MEILISEARCH_PK}`
);

interface Article {
	id: string;
	title: string;
	description: string;
  }

  export default function Search() {
	return (
	  <InstantSearch indexName="article" searchClient={searchClient}>
		<SearchBox />
		<Hits<Article> hitComponent={Hit} />
	  </InstantSearch>
	);
  }

  interface HitProps {
	hit: HitType<Article>;
  }

  const Hit: React.FC<HitProps> = ({ hit }) => (
	<div key={hit.id}>
	  <div className="hit-name text-lg font-bold">
		<Highlight attribute="title" hit={hit} />
	  </div>
	  <p>{hit.description}</p>
	</div>
  );
