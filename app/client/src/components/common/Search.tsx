import { InstantSearch, Configure } from "react-instantsearch";
import { history } from "instantsearch.js/es/lib/routers";

import searchClient from "@app/meilisearch";

export default function Search({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<InstantSearch
			indexName="books"
			searchClient={searchClient}
			routing={{
				router: history(),
				stateMapping: {
					stateToRoute(uiState) {
						const indexUiState = uiState.books;
						return {
							q: indexUiState.query,
							status: indexUiState.refinementList?.status,
							categories: indexUiState.refinementList?.categories,
							author: indexUiState.refinementList?.author,
							page: indexUiState.page,
						};
					},
					routeToState(routeState) {
						return {
							books: {
								query: routeState.q,
								refinementList: {
									status: routeState.status,
									categories: routeState.categories,
									author: routeState.author,
								},
								page: routeState.page,
							},
						};
					},
				}}
			}
		>
			<Configure hitsPerPage={8} />
			{children}
		</InstantSearch>
	);
}
