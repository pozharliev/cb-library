import { type StrategyOptions } from "passport-oauth2";

import { OAUTH_CALLBACK_URL } from "./main";

export const options: StrategyOptions = {
	authorizationURL: process.env.OAUTH_AUTHORIZATION_URL,
	clientID: process.env.OAUTH_CLIENT_ID,
	clientSecret: process.env.OAUTH_CLIENT_SECRET,
	tokenURL: process.env.OAUTH_TOKEN_URL,
	scope: ["openid", "email", "profile", "offline_access", "User.Read"],
	callbackURL: OAUTH_CALLBACK_URL,
};
