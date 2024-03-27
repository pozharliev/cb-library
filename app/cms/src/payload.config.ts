import path from "path";

import { buildConfig } from "payload/config";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";

import Settings from "./collections/Settings";

import User from "./collections/User";
import Books from "./collections/Book";
import Category from "./collections/Category";
import BookRequest from "./collections/BookRequest";
import Media from "./collections/Media";
import BookLog from "./collections/BookLog";
import BookInventory from "./collections/BookInventory";

import authEndpoints from "./auth/endpoints";

import BookRequestProvider from "./admin/providers/bookRequests";

import LoginButton from "./admin/components/LoginButton";
import DashboardView from "./admin/views/Dashboard";

export default buildConfig({
	globals: [Settings],
	serverURL: process.env.PAYLOAD_PUBLIC_SERVER_HOST,
	cors: [process.env.CLIENT_HOST],
	csrf: [process.env.CLIENT_HOST],
	admin: {
		user: User.slug,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		bundler: webpackBundler(),
		webpack: config => {
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
						meilisearch: path.resolve(__dirname, "mocks/meilisearch"),
					},
				},
				watch: true,
				watchOptions: {
					poll: true,
				},
			};
		},
		components: {
			afterLogin: [LoginButton],
			views: {
				Dashboard: DashboardView,
			},
			providers: [
				BookRequestProvider,
			],
		},
	},
	endpoints: [...authEndpoints],
	editor: slateEditor({}),
	collections: [User, Media, Books, Category, BookRequest, BookLog, BookInventory],
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
	},
	plugins: [payloadCloud()],
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI,
		},
	}),
	rateLimit: {
		skip: () => process.env.NODE_ENV === "development",
	},
});
