import path from "path";

import { buildConfig } from "payload/config";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";

import Users from "./collections/Users";
import Books from "./collections/Books";

import authEndpoints from "./auth/endpoints";
import LoginButton from "./admin/components/LoginButton";
import Categories from "./collections/Categories";

export default buildConfig({
	admin: {
		user: Users.slug,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		bundler: webpackBundler(),
		webpack: (config) => {
			return {
				...config,
				resolve: {
					...config.resolve,
					fallback: {
						// @ts-expect-error Not nullable
						...config.resolve.fallback,
						stream: require.resolve("stream-browserify"),
					},
					alias: {
						// @ts-expect-error Not nullable
						...config.resolve.alias,
						passport: path.resolve(__dirname, "mocks/passport"),
					},
				},
			};
		},
		components: {
			afterLogin: [LoginButton],
		},
	},
	endpoints: [
		...authEndpoints,
	],
	editor: slateEditor({}),
	collections: [
		Users,
		Books,
		Categories,
	],
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
	},
	plugins: [
		payloadCloud(),
	],
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI,
		},
	}),
});
