/// <reference types="node" />

namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_SERVER_HOST: string;
		NEXT_PUBLIC_SERVER_API_HOST: string;
		NEXT_SERVER_API_HOST: string;
		NEXT_PUBLIC_MEILISEARCH_CLIENT: string;
		NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY: string;
	}
}
