declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URI: string;
			SERVER_HOST: string;

			PAYLOAD_SECRET: string;

			OAUTH_AUTHORIZATION_URL: string;
			OAUTH_CLIENT_ID: string;
			OAUTH_CLIENT_SECRET: string;
			OAUTH_TOKEN_URL: string;
			OAUTH_IDENTITY_ENDPOINT: string;
		}
	}
}

export {};
