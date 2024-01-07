import { type PayloadRequest } from "payload/types";
import { type User } from "payload/generated-types";

export const isAdmin = ({ req }: { req: PayloadRequest<User> }): boolean => {
	if (process.env.NODE_ENV === "development") {
		return true;
	}

	// TODO: Add to config
	return req.user.role !== "Ученик";
};

export const isLoggedIn = ({ req }: { req: PayloadRequest<User> }): boolean => {
	return req.user != null;
};
