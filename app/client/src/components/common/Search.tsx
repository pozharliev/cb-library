import { InstantSearch } from "react-instantsearch";
import searchClient from "@app/meilisearch";

export default function Search({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<InstantSearch
			indexName="books"
			searchClient={searchClient}
		>
			{children}
		</InstantSearch>
	);
}
