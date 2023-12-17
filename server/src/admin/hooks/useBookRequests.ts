import { useContext } from "react";

import { BookRequestsContext } from "../providers/bookRequests";
import { BookRequest } from "payload/generated-types";

export default function useBookRequests(): [BookRequest[], (bookId: string, action: string) => Promise<void>] {
	const { bookRequests, refetch } = useContext(BookRequestsContext);

	const handleBookRequestAction = async (bookId: string, action: string): Promise<void> => {
		await refetch();
	};

	return [bookRequests, handleBookRequestAction];
}