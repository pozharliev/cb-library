import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import Link from "next/link";
import { Flex, Grid, Paper, rem, Title, Text, Button, Image } from "@mantine/core";
import ProtectedRoute from "@app/components/common/ProtectedRoute";

import { useAuth } from "@app/context/auth";

import { getImage } from "@app/utils/image";
import { cancelRequest } from "@app/utils/cancelRequest";
import { createRequest } from "@app/utils/createRequest";


import { type Book, type BookRequest } from "payload/generated-types";
import { type APIError, type DefaultError } from "@app/types/error";
import { capitalize } from "@app/utils/capitalize";

type RequestWithTakenInfo = BookRequest & {
	taken: boolean;
};

function ExistingRequest({ data }: { data: RequestWithTakenInfo }): JSX.Element {
	const cancel = useSWRMutation("book-requests/cancel", cancelRequest);
	const create = useSWRMutation("book-requests/create", createRequest);

	const book = data.book as Book;

	return (
		<Grid.Col
			span={{
				base: 12,
				md: 4,
				sm: 6,
				xl: 3,
			}}
			m={0}
			w={0}
		>
			<Paper withBorder={true} py="xs" h={rem(500)}>
				<Flex align="center" direction="column" justify="center" gap={rem(8)} h="100%">
					<Link href={`/books/${book.id}`}>
						<Image
							alt={book.title}
							radius="sm"
							src={getImage(book, "thumbnail")}
							fallbackSrc={"https://placehold.co/400"}
							w={rem(150)}
							h={rem(250)}
							style={{ objectFit: "contain" }}
						/>
					</Link>
					<Title ta="center" order={4}> {book.title} </Title>
					<Flex gap={rem(4)} direction="row" align="center">
						<Text size="sm"> Status of request is: </Text>
						<Button variant="outline" disabled={true} size="xs"> {capitalize(data.state)} </Button>
					</Flex>
					<Flex gap={rem(4)} direction="row" align="center">
						<Text size="sm">Type of request is: </Text>
						<Button variant="outline" disabled={true} size="xs"> {capitalize(data.type)} </Button>
					</Flex>
					<Flex direction="column" justify="center" align="center" gap={rem(8)}>
						<Text size="xs"> Available actions: </Text>
						<Flex gap={rem(8)}>
							<Button component={Link} href={`/book-requests/${data.id}`} size="xs">
								Go
							</Button>
							<Button onClick={() => cancel.trigger({ requestId: data.id })} size="xs" disabled={!(data.state === "pending" || data.state === "stale")}>
								Cancel
							</Button>
							<Button onClick={() => create.trigger({ bookId: book.id, action: "return" })} size="xs" disabled={!(data.state === "approved" && data.taken)}>
								Return
							</Button>

						</Flex>
					</Flex>
				</Flex>
			</Paper>
		</Grid.Col>
	);
}

export default function Page(): JSX.Element {
	const { user } = useAuth();
	const { data, isLoading } = useSWR<RequestWithTakenInfo[], DefaultError<APIError>>(`/book-requests/user/${user?.id}`, {
		refreshInterval: 1000,
	});

	console.log(data);

	return (
		<ProtectedRoute>
			<Flex justify="center" align="center" direction="column" style={{ flexGrow: 1 }}>
				<Grid
					align="center"
					w="100%"
				>
					{
						data?.map(request => <ExistingRequest key={request.id} data={request} />)
					}
				</Grid>
			</Flex>
		</ProtectedRoute>
	);
}
