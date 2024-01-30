import { Button, Flex, Image, rem, Title } from "@mantine/core";
import { type Book, type BookRequest } from "payload/generated-types";
import { getImage } from "@app/utils/image";
import { useRouter } from "next/router";

export const PendingState = ({ data, book }: { data: BookRequest, book: Book }): JSX.Element => {
	const router = useRouter();
	const onCancel = async() => {
		const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST}/book-requests/cancel`, {
			body: JSON.stringify({ requestId: data.id }),
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (req.status >= 400) {
			router.push("/error");
		}
	};
	
	return (
		<Flex direction="column" gap={rem(26)}>
			<Flex direction="row" align="center" gap={rem(8)}>
				<Title fw="500"> Request #{data.id} for </Title>
				<Title> {book.title} </Title>
				<Title fw="500"> by </Title>
				<Title> {book.author} </Title>
			</Flex>

			<Flex gap={rem(32)} align="center">
				<Image
					alt={book.title}
					radius="sm"
					src={getImage(book)}
					fallbackSrc={"https://placehold.co/450x650"}
					w={rem(450)}
				/>

				<Flex gap={rem(16)} direction="column">
					<Flex gap={rem(8)} align="center">
						<Title order={2} fw="500">Current status of the request is: </Title>
						<Title order={2}> Pending </Title>
					</Flex>
					<Flex align="center" gap={rem(8)}>
						<Title order={3} fw="500"> Current actions you can take: </Title>
						<Button onClick={onCancel}>
							Cancel
						</Button>
					</Flex>
					<Flex align="center" gap={rem(8)}>
						<Title order={3} fw="500"> The request was created on: </Title>
						<Title order={3}> {new Date(data.createdAt).toDateString()} </Title>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
