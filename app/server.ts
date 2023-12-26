import express from "express";
import payload from "payload";
import passport from "passport";
import { createServer } from "vite";

import { createRequestHandler } from "@remix-run/express";

import strategy from "./cms/auth/strategy";

import { type User } from "payload/generated-types";
import { USERS_COLLECTION } from "./cms/config/main";

require("dotenv").config();

const start = async (): Promise<void> => {
	const app = express();

	payload.init({
		secret: process.env.PAYLOAD_SECRET,
		express: app,
		onInit: async (): Promise<void> => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
		},
		loggerOptions: {
			level: process.env.NODE_ENV === "development" ? "debug" : "info",
			transport: process.env.NODE_ENV === "development" ?
				{
					target: "pino-pretty",
				} :
				undefined,
		},
	}).then(async () => {
		const viteDevServer =
			process.env.NODE_ENV === "production"
				? undefined
				: await createServer({
					server: {
						middlewareMode: true,
					},
				});

		app.use(express.static("public", {maxAge: "1h"}));

		if (viteDevServer) {
			app.use(viteDevServer.middlewares);
		} else {
			app.use(
				"/assets",
				express.static("build/client/assets", {immutable: true, maxAge: "1y"})
			);
		}

		app.use(express.static("build/client", {maxAge: "1h"}));

		app.all(
			/^(?!\/admin\/).*$/,
			createRequestHandler({
				// @ts-ignore
				build: viteDevServer
					? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
					: await import("./build/server/index.js"),
				getLoadContext(req, res) {
					return {
						payload: req.payload,
						user: req?.user,
						res,
					};
				},
			})
		);
	});

	passport.use(strategy);
	passport.serializeUser((user: User, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async (id: string, done): Promise<void> => {
		const ok = await payload.findByID({ collection: USERS_COLLECTION, id });
		done(null, ok);
	});

	app.listen(process.env.SERVER_PORT);
};

start();
