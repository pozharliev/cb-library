import { Flex, Group, Paper, rem, Stack, Text, Title } from "@mantine/core";

import { IconBook2 } from "@tabler/icons-react";

import Search from "@app/components/common/Search";
import SearchBox from "@app/components/ui/search/SearchBox";
import { CategoriesFacet, StatusFacet } from "@app/components/ui/search/Facets";
import Hits from "@app/components/ui/search/Hits";
import Pagination from "@app/components/ui/search/Pagination";

export default function Page(): JSX.Element {
	return (
		<Search>
			<Flex component="section" direction="column" align="flex-start" gap="md">
				<Paper component={Group} withBorder={true} p="sm">
					<IconBook2 width={rem(120)} height={rem(120)} stroke={1.25} />
					<Stack>
						<Title order={1}> Search books </Title>
						<Text> Choose from one of 36 books. Search by text, filter by one or many categories and sort however you want. </Text>
					</Stack>
				</Paper>
				<Flex direction="row" gap="xl" w="100%">
					<Paper p="xs" withBorder={true} >
						<Flex direction="column" gap="lg">
							<SearchBox />
							<StatusFacet />
							<CategoriesFacet />
						</Flex>
					</Paper>

					<Hits />
				</Flex>
				<Pagination />
			</Flex>
		</Search>
	);
}
