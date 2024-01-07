/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";

			DATABASE_URI: string;
			PAYLOAD_PUBLIC_SERVER_HOST: string;

			PAYLOAD_SECRET: string;

			CLIENT_HOST: string;

			OAUTH_AUTHORIZATION_URL: string;
			OAUTH_CLIENT_ID: string;
			OAUTH_CLIENT_SECRET: string;
			OAUTH_TOKEN_URL: string;
			OAUTH_IDENTITY_ENDPOINT: string;

			MEILISEARCH_URL: string;
			MEILISEARCH_MASTER_KEY: string;
		}
	}
}

export {};
