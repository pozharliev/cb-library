import { type PayloadRequest } from "payload/types";
import { type User } from "payload/generated-types";

export default function isAdmin({ req }: { req: PayloadRequest }): boolean {
	if (process.env.NODE_ENV === "development") {
		return true;
	}

	// TODO: Add to config
	return (req.user as User).role !== "Ученик";
}
