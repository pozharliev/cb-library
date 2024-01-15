import { MeiliSearch } from "meilisearch";

import { BOOKS_INDEX } from "./main";


const meilisearchClient = new MeiliSearch({
	host: "http://meilisearch:7700",
	apiKey: process.env.MEILISEARCH_MASTER_KEY,

});

meilisearchClient
	.createKey({
		uid: process.env.MEILISEARCH_SEARCH_KEY_UUID,
		description: "My Search Key",
		indexes: ["*"],
		actions: ["search"],
		expiresAt: new Date("2100-01-01"),
		name: "Search Key",
	})
	.catch(console.error);

meilisearchClient
	.index(BOOKS_INDEX)
	.updateFilterableAttributes(["status", "author", "categories"])
	.catch(console.error);

export default meilisearchClient.index(BOOKS_INDEX);