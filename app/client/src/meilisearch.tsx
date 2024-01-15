import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { searchClient } = instantMeiliSearch(
	process.env.NEXT_PUBLIC_MEILISEARCH_CLIENT,
	process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY
);

export default searchClient;
