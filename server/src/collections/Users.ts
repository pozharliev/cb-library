import { type CollectionConfig } from "payload/types";

import jwt from "jsonwebtoken";
import passport from "passport";

import session from "express-session";
import { type User } from "payload/generated-types";
import payload from "payload";
import getCookieExpiration from "payload/dist/utilities/getCookieExpiration";

const Users: CollectionConfig = {
	slug: "users",
	auth: {
		disableLocalStrategy: true,
	},
	admin: {
		useAsTitle: "email",
	},
	fields: [
		{
			name: "fullName",
			type: "text",
			required: true,
		},
		{
			name: "firstName",
			type: "text",
			required: true,
		},
		{
			name: "email",
			type: "email",
			unique: true,
			required: true,
		},
		{
			name: "role",
			type: "text",
			required: true,
		},
		{
			name: "sub",
			type: "text",
			required: true,
		},
	],
	endpoints: [
		{
			path: "/oauth2/authorize",
			method: "get",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			handler: passport.authenticate("oauth2"),
		},
		{
			path: "/oauth2/callback",
			method: "get",
			handler: session({
				resave: false,
				saveUninitialized: false,
				secret: process.env.PAYLOAD_SECRET,
				store: undefined,
			}),
		},
		{
			path: "/oauth2/callback",
			method: "get",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			handler: passport.authenticate("oauth2", { failureRedirect: "/" }),
		},
		{
			path: "/oauth2/callback",
			method: "get",
			handler(req, res) {
				const user = req.user as User;
				const config = payload.collections.users.config;

				const token = jwt.sign({
					collection: "users",
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
		},

	],
};

export default Users;
