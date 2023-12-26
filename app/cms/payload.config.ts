import path from "path";

import { buildConfig } from "payload/config";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";

import Settings from "./collections/Settings";

import User from "./collections/User";
import Books from "./collections/Book";
import Categories from "./collections/Category";
import BookRequests from "./collections/BookRequest";
import Media from "./collections/Media";

import authEndpoints from "./auth/endpoints";

import BookRequestProvider from "./admin/providers/bookRequests";

import LoginButton from "./admin/components/LoginButton";
import DashboardView from "./admin/views/Dashboard";

export default buildConfig({
	globals: [Settings],
	serverURL: process.env.PAYLOAD_PUBLIC_SERVER_HOST,
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
				// @ts-expect-error No idea
				Dashboard: DashboardView,
			},
			providers: [
				BookRequestProvider,
			],
		},
	},
	endpoints: [...authEndpoints],
	editor: slateEditor({}),
	collections: [User, Media, Books, Categories, BookRequests],
	typescript: {
		outputFile: path.resolve(__dirname, "../payload-types.ts"),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, "../generated-schema.graphql"),
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
