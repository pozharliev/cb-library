import { CollectionAfterChangeHook } from "payload/types";
import { BookRequest } from "payload/generated-types";
import { sendEmail } from "../../../email/sender";
import getObject from "../../../utils/getObject";

export const sendEmailOnStatusChange: CollectionAfterChangeHook<BookRequest> = async ({
	previousDoc, doc,
}) => {
	const user = await getObject(doc.user, "users");

	await sendEmail("statusChange", {
		to: user.email,
		userFullName: user.fullName,
		stateFrom: previousDoc.state!,
		stateTo: doc.state!,
		requestId: doc.id,
	});
}