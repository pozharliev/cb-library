import { type GetServerSideProps, type InferGetServerSidePropsType } from "next";

import { Flex, Image, rem, Title, Text } from "@mantine/core";

import { type Book, type BookRequest } from "payload/generated-types";
import { getImage } from "@app/utils/image";
import Link from "next/link";

type BookInfo = Book & {
	request: BookRequest | null;
};

type BookOrError = BookInfo | {
	errors: Array<{ message: string }>;
};

export default function Page({ book }: { book: BookInfo }): InferGetServerSidePropsType<typeof getServerSideProps> {
	return (
		<Flex gap={rem(48)} w="100%">
			<Image
				alt={book.title}
				radius="sm"
				src={getImage(book)}
				fallbackSrc={"https://placehold.co/450"}
				w={rem(450)}
			/>

			<Flex direction="column">
				<Title order={3}> {book.title} </Title>

				<Flex direction="row" justify="center" align="center" gap={rem(8)}>
					<Title order={4}> Author: </Title>
					<Link href={`/books?author=${book.author}`}>
						<Text size="md"> {book.author} </Text>
					</Link>
				</Flex>

				<Flex direction="row" justify="center" align="center" gap={rem(8)}>
					<Title order={4}> Categories: </Title>
					<Link href={`/books?author=${book.author}`}>
						<Text size="md"> {book.author} </Text>
					</Link>
				</Flex>
			</Flex>
		</Flex>
	);
}

// @ts-expect-error Types
export const getServerSideProps: GetServerSideProps<{ props: { book: BookInfo } }, { id: string }> = async({ params }) => {
	const res = await fetch(`${process.env.NEXT_SERVER_API_HOST}/books/${params?.id}/info`);
	const book = await res.json() as BookOrError;

	if ("errors" in book) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			book,
		},
	};
};
