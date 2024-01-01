import { stringify } from "qs";

import { BookRequest } from "payload/generated-types";

import { useContext } from "react";

import { BookRequestsContext } from "../providers/bookRequests";
import { API_URL } from "../../config/main";
import { ActionHandler, BookRequestAction } from "../types/BookRequest";

export default function useBookRequests(): [BookRequest[], ActionHandler] {
	const { bookRequests, refetch } = useContext(BookRequestsContext);

	const handleBookRequestAction: ActionHandler = async (bookId: number, action: BookRequestAction): Promise<void> => {
		const URL_PREFIX = "/book-requests";
		const url = new URL(API_URL + URL_PREFIX + `/${bookId}`);

		const query = {
			action,
		};

		return fetch(url, {
			method: "PATCH",
			body: JSON.stringify(query),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(async () => await refetch())
			.catch(console.error);
	};

	return [bookRequests, handleBookRequestAction];
}