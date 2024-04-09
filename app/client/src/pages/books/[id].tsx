import { type GetServerSideProps, type InferGetServerSidePropsType } from "next";

import { Flex, Image, rem, Title, Text } from "@mantine/core";

import { type Book, type BookRequest, type Category } from "payload/generated-types";
import { getImage } from "@app/utils/image";
import Link from "next/link";

type BookInfo = Book & {
	request: BookRequest | null;
};

type BookOrError = BookInfo | {
	errors: Array<{ message: string }>;
};

export default function Page({ book }: { book: BookInfo }): InferGetServerSidePropsType<typeof getServerSideProps> {
	const categories = book.categories
		?.filter(cat => typeof cat !== "number")
		.map(cat => {
			return (
				<Link key={(cat as Category).id} href={{ pathname: "/books", query: `categories[0]=${(cat as Category).title}` }}>
					<Text size="xl"> {(cat as Category).title} </Text>
				</Link>
			);
		});

	return (
		<Flex gap={rem(48)} w="100%" align="center" justify="center">
			<Image
				alt={book.title}
				radius="sm"
				src={getImage(book)}
				fallbackSrc={"https://placehold.co/450"}
				w={rem(450)}
			/>

			<Flex direction="column">
				<Title order={1}> {book.title + (book.subtitle ? `. ${book.subtitle}.` : "")} </Title>

				<Flex direction="row" align="center" gap={rem(8)}>
					<Title order={2}> Author: </Title>
					<Link href={{ pathname: "/books", query: `author[0]=${book.author}` }}>
						<Text size="xl"> {book.author} </Text>
					</Link>
				</Flex>

				{
					categories != null && categories?.length > 0 ?
						<Flex direction="row" align="center" gap={rem(8)}>
							<Title order={2}> Categories: </Title>
							{categories}
						</Flex> :
						null
				}

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
