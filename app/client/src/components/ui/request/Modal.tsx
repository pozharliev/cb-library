import { Button, Flex, Modal, Text, rem, Tooltip } from "@mantine/core";
import { type Book, type BookRequest } from "payload/generated-types";
import { useRouter } from "next/router";
import { useAuth } from "@app/context/auth";
import { IconInfoCircle } from "@tabler/icons-react";

export default function RequestModal({ book, opened, close }: { book: Book, opened: boolean, close: () => void }): JSX.Element {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	const onProceed = async(): Promise<void> => {
		const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST}/book-requests/create`, {
			body: JSON.stringify({ bookId: book.id, action: "take" }),
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		
		const response: { request: BookRequest } = await request.json();

		if (request.status >= 400) {
			router.push("/error");
		}

		await router.push({ pathname: `/requests/${response.request.id}` });
	};

	return (
		<Modal opened={opened} onClose={close} size="md" centered={true} withCloseButton={false}>
			<Flex w="100%" h="100%" align="center" direction="column" gap={rem(24)}>
				<Text size="xl" > Do you want to proceed? </Text>
				<Flex justify="space-evenly" w="100%">
					<Flex align="center" gap={rem(4)}>
						<Button size="compact-xl" fw="500" onClick={onProceed} disabled={!isAuthenticated} hidden={true}> Proceed </Button>
					</Flex>
					<Button size="compact-xl" variant="outline" fw="500" onClick={close}> Cancel </Button>
				</Flex>
			</Flex>
		</Modal>
	);
}
