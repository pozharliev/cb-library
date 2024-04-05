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
		<Flex align="center" gap={rem(8)}>
			<Title order={3} fw="500"> Current actions you can take: </Title>
			<Button onClick={onCancel}>
				Cancel
			</Button>
		</Flex>
	);
};
