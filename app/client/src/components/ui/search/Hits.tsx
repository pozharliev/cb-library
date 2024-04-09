import { useHits, type UseHitsProps } from "react-instantsearch";

import Link from "next/link";

import { Image, Paper, Title, Text, rem, Grid, Flex, Button } from "@mantine/core";
import { type BaseHit } from "instantsearch.js";
import { type Book } from "payload/generated-types";
import { IconCheck, IconX } from "@tabler/icons-react";
import { getImage } from "@app/utils/image";
import { useDisclosure } from "@mantine/hooks";
import RequestModal from "@app/components/ui/request/Modal";

type BookHit = Book & BaseHit &
{
	availableCopies: number;
};

function Hit({ hit }: { hit: BookHit }): JSX.Element {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
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
				<Paper withBorder={true} py="xs" h={rem(400)}>
					<Flex align="center" direction="column" justify="center" gap={rem(8)} h="100%">
						<Link href={`/books/${hit.id}`}>
							<Image
								alt={hit.title}
								radius="sm"
								src={getImage(hit, "thumbnail")}
								fallbackSrc={"https://placehold.co/400"}
								w={rem(150)}
								h={rem(250)}
								style={{ objectFit: "contain" }}
							/>
						</Link>
						<Title ta="center" order={4}> {hit.title} </Title>
						<Text ta="center" size="xs"> {hit.author} </Text>
						{
							hit.availableCopies > 0 ?
								<>
									<Button leftSection={<IconCheck />} size="sm" onClick={() => open()} > Вземи </Button>
								</> :
								<>
									<Button leftSection={<IconX />} variant="outline" size="sm" disabled={true}> Взета </Button>
								</>
						}
					</Flex>
				</Paper>
			</Grid.Col>

			<RequestModal book={hit} opened={opened} close={close} />
		</>
	);
}

export default function Hits(props: UseHitsProps<BookHit>): JSX.Element {
	const { hits } = useHits<BookHit>(props);

	return (
		<Grid
			align="center"
			w="100%"
		>
			{
				hits.map(hit => <Hit key={hit.id} hit={hit} />)
			}
		</Grid>
	);
};
