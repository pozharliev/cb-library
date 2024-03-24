import useSWR from "swr";

import { Flex } from "@mantine/core";
import ProtectedRoute from "@app/components/common/ProtectedRoute";

import { useAuth } from "@app/context/auth";

import { type BookRequest } from "payload/generated-types";
import { type APIError, type DefaultError } from "@app/types/error";
import { type PaginatedDocs } from "@app/types/docs";

function ExistingRequest({ data: BookRequest }): JSX.Element {
	return (
		<h1> Hello </h1>
	);
}

export default function Page(): JSX.Element {
	const { user } = useAuth();
	const { data, isLoading } = useSWR<PaginatedDocs<BookRequest>, DefaultError<APIError>>(`/book-requests?depth=2&where[user][id][equals]=${user?.id}`, {
		refreshInterval: 1000,
	});

	return (
		<ProtectedRoute>
			<Flex justify="center" align="center" direction="column" style={{ flexGrow: 1 }}>
				{
					data?.docs.map(request => <ExistingRequest key={request.id} data={request} />)
				}
			</Flex>
		</ProtectedRoute>
	);
}
