import express from "express";
import payload from "payload";
import passport from "passport";
import bodyParser from "body-parser";

import strategy from "./auth/strategy";

import { type User } from "payload/generated-types";
import { USERS_COLLECTION } from "./config/main";
import CronJobs from "./cron/jobs";

require("dotenv").config();

const start = async (): Promise<void> => {
	const app = express();

	app.use(bodyParser.json());

	app.get("/", (req, res) => {
		res.redirect("/admin");
	});

	await payload.init({
		secret: process.env.PAYLOAD_SECRET,
		express: app,
		onInit: async (): Promise<void> => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
		},
		email: {
			fromName: "Atanas",
			fromAddress: "ABPozharliev19@codingburgas.bg",
			transportOptions: {
				host: "smtp-mail.outlook.com", // hostname
				secureConnection: false, // use SSL
				port: 587, // port for secure SMTP
				auth: {
					user: process.env.OUTLOOK_USER,
					pass: process.env.OUTLOOK_PASSWORD,
				},
			},
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
	passport.deserializeUser(async (id: string, done): Promise<void> => {
		const ok = await payload.findByID({ collection: USERS_COLLECTION, id });
		done(null, ok);
	});

	new CronJobs().start();

	app.listen(process.env.SERVER_PORT);
};

start();
