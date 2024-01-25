import { Button, Flex, Modal, Text, rem } from "@mantine/core";
import { type Book } from "payload/generated-types";

export default function RequestModal({ book, opened, close }: { book: Book, opened: boolean, close: () => void }): JSX.Element {
	const onProceed = async () => {
		const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST}/book-requests`)
	};

	return (
		<Modal opened={opened} onClose={close} size="md" centered={true} withCloseButton={false}>
			<Flex w="100%" h="100%" align="center" direction="column" gap={rem(24)}>
				<Text size="xl" > Do you want to proceed? </Text>
				<Flex justify="space-evenly" w="100%">
					<Button size="compact-xl" fw="500"> Proceed </Button>
					<Button size="compact-xl" variant="outline" fw="500" onClick={close}> Cancel </Button>
				</Flex>
			</Flex>
		</Modal>
	);
}
