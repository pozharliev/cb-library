import { useHits, type UseHitsProps } from "react-instantsearch";

import { Flex, Image, Paper, SimpleGrid, Title, rem } from "@mantine/core";

import { type BaseHit } from "instantsearch.js";
import { type Book } from "payload/generated-types";

type BookHit = Book & BaseHit;

function Hit({ hit }: { hit: BookHit }): JSX.Element {
	return (
		<Paper p="sm" withBorder={true}>
			<Flex direction="column" align="flex-start">
				<Image
					alt={hit.title}
					radius="sm"
					src={null}
					w={rem(125)}
					fallbackSrc="https://placehold.co/600x400?text=Placeholder"
					style={{
						alignSelf: "center",
					}}
				/>
				<Title order={3}> {hit.title} </Title>
			</Flex>
		</Paper>
	);
}

export default function Hits(props: UseHitsProps<BookHit>): JSX.Element {
	const { hits } = useHits<BookHit>(props);

	return (
		<SimpleGrid
			cols={4}
			spacing="md"
			w="100%"
		>
			{
				hits.map(hit => <Hit key={hit.id} hit={hit} />)
			}
		</SimpleGrid>
	);
};