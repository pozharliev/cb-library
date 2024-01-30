import { CollectionBeforeChangeHook } from "payload/types";
import { BookRequest } from "payload/generated-types";


export const handleRequestAction: CollectionBeforeChangeHook<BookRequest> = ({
	data,
	originalDoc,
}) => {
	// the state has just changed
	if (originalDoc?.action == null && data.action != null) {
		// @ts-expect-error No idea
		data.state = data.action.concat("d");
	}
	return data;
};