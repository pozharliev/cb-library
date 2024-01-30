import { type Book } from "payload/generated-types";

export const getImage = (book?: Book, size: "main" | "thumbnail" = "main"): string | null | undefined => {
	if (book?.image == null || typeof book.image === "number") {
		return null;
	}

	return book.image.sizes?.[size]?.url ?? book.image.url;
};
