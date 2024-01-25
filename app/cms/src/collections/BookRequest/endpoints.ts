import payload from "payload";
import type { Endpoint } from "payload/config";
import { User } from "payload/generated-types";
import { PayloadRequest } from "payload/types";
import { isLoggedIn } from "../../auth/middleware";


export const createBookRequest: Endpoint = {
	path: "/create",
	method: "post",
	handler: async (req: PayloadRequest<User>, res) => {
		if (!isLoggedIn({ req })) {
			return res.status(403);
		}
	},
};