import express from "express";
import payload from "payload";
import passport from "passport";

import strategy from "./auth/strategy";

import { type User } from "payload/generated-types";
import { USERS_COLLECTION } from "./config/main";

require("dotenv").config();
const app = express();

app.get("/", (_, res) => {
	res.redirect("/admin");
});

const start = async(): Promise<void> => {
	await payload.init({
		secret: process.env.PAYLOAD_SECRET,
		express: app,
		onInit: async(): Promise<void> => {
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
	});

	passport.use(strategy);
	passport.serializeUser((user: User, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async(id: string, done): Promise<void> => {
		const ok = await payload.findByID({ collection: USERS_COLLECTION, id });
		done(null, ok);
	});

	app.listen(process.env.SERVER_PORT);
};

start();
