import { type Book, type BookRequest } from "payload/generated-types";
import { Button, Flex, Image, rem, Title } from "@mantine/core";
import { getImage } from "@app/utils/image";

export const ApprovedState = ({ data, book }: { data: BookRequest, book: Book }): JSX.Element => {
	return (
		<Flex direction="column" gap={rem(26)}>
			<Flex direction="row" align="center" gap={rem(8)}>
				<Title fw="500"> Request #{data.id} for </Title>
				<Title> {book.title} </Title>
				<Title fw="500"> by </Title>
				<Title> {book.author} </Title>
			</Flex>

			<Flex gap={rem(16)} align="center">
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
						<Button variant="outline" disabled={true}>
							Approved
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
