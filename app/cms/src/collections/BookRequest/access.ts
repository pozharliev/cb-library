import type { Access } from "payload/types";
import type { BookRequest, User } from "payload/generated-types";
import { isLoggedIn } from "../../auth/middleware";
import getObject from "../../utils/getObject";


export const hasCreatedRequest: Access<BookRequest, User> = async({ req, data }) => {
	if (!isLoggedIn({ req }) || data == null) {
		return false;
	}

	const user = await getObject(data.user, "users");

	return user?.id === req.user?.id;
};
