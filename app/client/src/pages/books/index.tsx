import useSWR from "swr";

import { Flex, Paper, rem, Stack, Text, Title } from "@mantine/core";

import { IconBook2 } from "@tabler/icons-react";

import Search from "@app/components/common/Search";
import SearchBox from "@app/components/ui/search/SearchBox";
import Hits from "@app/components/ui/search/Hits";
import Pagination from "@app/components/ui/search/Pagination";
import { AuthorFacet, CategoriesFacet } from "@app/components/ui/search/Facets";

import { PaginatedDocs } from "@app/types/docs";

export default function Page(): JSX.Element {
	const { data } = useSWR<PaginatedDocs>("/books");

	return (
		<Search>
			<Flex component="section" w="100%" direction="column" align="flex-start" gap="md">
				<Paper withBorder={true} p="sm" w="100%">
					<Flex align="center">
						<Flex visibleFrom="sm">
							<IconBook2 width={rem(100)} height={rem(100)} stroke={1.25} />
						</Flex>
						<Stack>
							<Title order={2}> Search books </Title>
							<Text size="sm"> Choose from one of {data?.totalDocs} books. Search by text, filter by one or many categories and sort however you want. </Text>
						</Stack>
					</Flex>
				</Paper>
				<Flex direction={{ base: "column", sm: "row" }} gap="xl" w="100%">
					<Paper p="xs" withBorder={true} w={{ base: "100%", sm: rem(300) }} >
						<Flex direction="column" gap="lg">
							<SearchBox />
							<CategoriesFacet />
							<AuthorFacet />
						</Flex>
					</Paper>

					<Flex w="100%" h="100%" direction="column" align="center" gap="xl">
						<Hits />
						<Pagination />
					</Flex>
				</Flex>
			</Flex>
		</Search>
	);
}
