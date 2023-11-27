import payload from "payload";
import { type User } from "payload/generated-types";

import OAuth2Strategy, { type VerifyCallback } from "passport-oauth2";

import { USERS_COLLECTION } from "../config/main";
import { options } from "../config/auth";

interface OAuthUser {
	id: string;
	displayName: string;
	givenName: string;
	jobTitle: string;
	mail: string;
	surname: string;
	userPrincipalName: string;
}

const strategy = new OAuth2Strategy(options, async function(
	accessToken: string,
	refreshToken: string,
	// eslint-disable-next-line @typescript-eslint/ban-types
	profile: {},
	callback: VerifyCallback
) {
	try {
		const oauthUser = await fetch(process.env.OAUTH_IDENTITY_ENDPOINT, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}).then(async(res) => await res.json() as OAuthUser);

		let user: User;

		const userExists = await payload.find({
			collection: USERS_COLLECTION,
			where: {
				sub: {
					equals: oauthUser.id,
				},
			},
		});

		if (userExists.docs.length > 0) {
			user = userExists.docs[0];
		} else {
			user = await payload.create({
				collection: USERS_COLLECTION,
				data: {
					email: oauthUser.mail,
					sub: oauthUser.id,
					fullName: oauthUser.userPrincipalName,
					firstName: oauthUser.givenName,
					role: oauthUser.jobTitle,
				},
			});
		}

		callback(null, user);
	} catch (e) {
		payload.logger.error("User tried to sign in with bad data");
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		callback(e);
	}
});

export default strategy;
