import meilisearchClient from "../config/meilisearch";

import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload/types";
import { Book } from "payload/generated-types";


export const syncMeilisearchOnUpdateOrCreate: CollectionAfterChangeHook<Book> = async ({
	doc,
}) => {
	await meilisearchClient.updateDocuments([
		doc,
	]);
};

export const syncMeilisearchOnDelete: CollectionAfterDeleteHook<Book> = async ({
	doc,
}) => {
	await meilisearchClient.deleteDocuments([doc.id]);
};