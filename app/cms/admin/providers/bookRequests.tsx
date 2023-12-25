import React, { createContext, useState, useEffect } from "react";

import { BookRequest } from "payload/generated-types";
import { API_URL } from "../../config/main";
import { stringify } from "qs";

interface BookRequestsContextType {
	bookRequests: BookRequest[];
	refetch: () => Promise<void>;
}

export const BookRequestsContext = createContext<BookRequestsContextType>({
	bookRequests: [],
	refetch: async () => {},
});

export default function BookRequestProvider({ children }: { children: React.ReactNode }) {
	const URL_PREFIX = "/book-requests";

	const [bookRequests, setBookRequests] = useState<BookRequest[]>([]);

	const fetchData = async () => {
		const url = new URL(API_URL + URL_PREFIX);
		const query = stringify({
			where: {
				state: {
					equals: "stale",
				},
			},

		});
		url.search = query;

		const { docs }: { docs: BookRequest[] } = await fetch(url).then(async res => res.json());

		setBookRequests(docs);
	};

	const refetch = async () => {
		await fetchData();
	};

	useEffect(() => {
		fetchData().catch(console.error);
		setInterval(() => fetchData().catch(console.error), 10000);
	}, []);

	return (
		<BookRequestsContext.Provider value={{
			bookRequests,
			refetch,
		}}>
			{children}
		</BookRequestsContext.Provider>

	);
}