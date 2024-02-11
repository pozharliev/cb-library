import meilisearchClient from "../../config/meilisearch";

import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload/types";
import { Book } from "payload/generated-types";

import getObject from "../../utils/getObject";


export const syncMeilisearchOnUpdateOrCreate: CollectionAfterChangeHook<Book> = async ({
	doc,
}) => {
	if (doc.categories != null) {
		const categories = await Promise.all(doc.categories.map(cat => getObject(cat, "categories")));

		// @ts-expect-error Ah well, there is nothing we can do
		doc.categories = categories.map(cat => cat.title);
	}

	if (doc.image != null) {
		doc.image = await getObject(doc.image, "media");
	}

	await meilisearchClient.updateDocuments([
		doc,
	]);
};

export const syncMeilisearchOnDelete: CollectionAfterDeleteHook<Book> = async ({
	doc,
}) => {
	await meilisearchClient.deleteDocuments([doc.id]);
};