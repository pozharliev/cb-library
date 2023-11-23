import payload from "payload";

import passport from "passport";
import session from "express-session";
import jwt from "jsonwebtoken";
import getCookieExpiration from "payload/dist/utilities/getCookieExpiration";

import { type User } from "../payload-types";
import { type Endpoint } from "payload/config";

import { AUTH_ENDPOINT, CALLBACK_ENDPOINT, USERS_COLLECTION } from "../config/main";

const authorizeEndpoint: Endpoint = {
	path: AUTH_ENDPOINT,
	root: true,
	method: "get",
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	handler: passport.authenticate("oauth2"),
};

const callbackSession: Endpoint = {
	path: CALLBACK_ENDPOINT,
	root: true,
	method: "get",
	handler: session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.PAYLOAD_SECRET,
		store: undefined,
	}),
};

const callbackAuthenticate: Endpoint = {
	path: CALLBACK_ENDPOINT,
	root: true,
	method: "get",
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	handler: passport.authenticate("oauth2", { failureRedirect: "/" }),
};

const callbackMain: Endpoint = {
	path: CALLBACK_ENDPOINT,
	root: true,
	method: "get",
	handler(req, res) {
		const user = req.user as User;
		const config = payload.collections.users.config;

		const token = jwt.sign({
			collection: USERS_COLLECTION,
			sub: user.sub,
			id: user.id,
			role: user.role,
			email: user.email,
			fullName: user.fullName,
		}, payload.secret, {
			expiresIn: config.auth.tokenExpiration,
		});

		res.cookie(`${payload.config.cookiePrefix}-token`, token, {
			path: "/",
			httpOnly: true,
			expires: getCookieExpiration(config.auth.tokenExpiration),
			secure: config.auth.cookies.secure,
			sameSite: config.auth.cookies.sameSite,
			domain: config.auth.cookies.domain,
		});

		res.redirect("/admin");
	},
};

export default [authorizeEndpoint, callbackSession, callbackAuthenticate, callbackMain];
