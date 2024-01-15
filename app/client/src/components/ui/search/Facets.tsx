import { useRefinementList, type UseRefinementListProps } from "react-instantsearch";
import { type RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";

import { Flex, Title, Text, Checkbox, ThemeIcon, Divider, rem } from "@mantine/core";

import { camelCaseToWords } from "@app/utils/camelCaseToSentence";

export function StatusFacet(props: Omit<UseRefinementListProps, "attribute">): JSX.Element {
	const { items, refine } = useRefinementList({
		...props,
		attribute: "status",
		sortBy: ["count:desc"],
	});

	return <Facet items={items} refine={refine} />;
}

export function CategoriesFacet(props: Omit<UseRefinementListProps, "attribute">): JSX.Element {
	const { items, refine } = useRefinementList({
		...props,
		attribute: "categories",
		sortBy: ["count:desc"],
	});

	return <Facet items={items} refine={refine} />;
}

function Facet({ items, refine }: { items: RefinementListItem[], refine: (value: string) => void }): JSX.Element {
	return (
		<Flex direction="column">
			<Title order={2}> Status </Title>
			<Divider mb="xs" />
			<Flex direction="column" gap={rem(4)}>
				{
					items.map(item => {
						return (
							<Flex
								key={item.value}
								align="center"
								gap="sm"
								styles={{
									root: {
										cursor: "pointer",
									},
								}}
								onClick={() => {
									refine(item.value);
								}}
								bg={item.isRefined ? "gray.7" : ""}
								p={rem(4)}

							>
								<Checkbox variant="outline" checked={item.isRefined} />
								<Text size="lg"> {camelCaseToWords(item.label)} </Text>
								<ThemeIcon ml="auto" variant="outline">
									<Text> {item.count} </Text>
								</ThemeIcon>
							</Flex>
						);
					})
				}
			</Flex>
		</Flex>
	);
};