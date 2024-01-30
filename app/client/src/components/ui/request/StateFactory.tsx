import { type Book, type BookRequest } from "payload/generated-types";

import { PendingState } from "@app/components/ui/request/states/PendingState";
import { ApprovedState } from "@app/components/ui/request/states/ApprovedState";

export default function StateFactory({ data }: { data: BookRequest }): JSX.Element {
	const book = data?.book as Book | undefined;

	if (book == null || data == null) {
		// TODO
		return <h1> Bad Request </h1>;
	}

	switch (data?.state) {
		case "pending":
			return <PendingState data={data} book={book} />;

		case "approved":
			return <ApprovedState data={data} book={book} />;
	}
}
