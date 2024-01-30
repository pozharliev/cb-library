import useSWR from "swr";
import { useRouter } from "next/router";

import { Button, Flex, Text, Title } from "@mantine/core";

import { Book, type BookRequest } from "payload/generated-types";
import { type APIError, type DefaultError } from "@app/types/error";

import ProtectedRoute from "@app/components/common/ProtectedRoute";
import Loading from "@app/components/common/Loading";
import type { GetServerSideProps } from "next";
import StateFactory from "@app/components/ui/request/StateFactory";

export default function Page(): JSX.Element {
	const { query: { id } } = useRouter();
	const requestId = id ? +id : undefined;

	const { data, isLoading } = useSWR<BookRequest, DefaultError<APIError>>(requestId ? `/book-requests/${requestId}?depth=2` : null, {
		refreshInterval: 1000,
	});

	return (
		<ProtectedRoute>
			<Loading isLoading={isLoading}>
				<Flex justify="center" align="center" direction="column" style={{ flexGrow: 1 }}>
					<StateFactory data={data} />
				</Flex>
			</Loading>
		</ProtectedRoute>
	);
}

export const getServerSideProps: GetServerSideProps<{ notFound: boolean }, { id: string }> = async({ params }) => {
	const res = await fetch(`${process.env.NEXT_SERVER_API_HOST}/book-requests/${params?.id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (res.status === 403) {
		return {
			notFound: true,
		};
	}

	return {
		props: {

		},
	};
};
