import { useRefinementList, type UseRefinementListProps } from "react-instantsearch";
import { type RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";

import { Flex, Title, Text, Checkbox, ThemeIcon, Divider, rem } from "@mantine/core";

import { camelCaseToWords } from "@app/utils/camelCaseToSentence";

export function CategoriesFacet(props: Omit<UseRefinementListProps, "attribute">): JSX.Element {
	const { items, refine } = useRefinementList({
		...props,
		attribute: "categories",
		sortBy: ["count:desc"],
	});

	return <Facet items={items} refine={refine} name="categories" />;
}

export function AuthorFacet(props: Omit<UseRefinementListProps, "attribute">): JSX.Element {
	const { items, refine } = useRefinementList({
		...props,
		attribute: "author",
		sortBy: ["count:desc"],
	});

	return <Facet items={items} refine={refine} name="author" />;
}

function Facet({ items, refine, name }: { items: RefinementListItem[], refine: (value: string) => void, name: string }): JSX.Element {
	return (
		<Flex direction="column">
			<Title order={3} tt="capitalize"> {name} </Title>
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
								<Checkbox variant="outline" size="sm" checked={item.isRefined} />
								<Text size="md"> {camelCaseToWords(item.label)} </Text>
								<ThemeIcon ml="auto" variant="outline">
									<Text size="sm"> {item.count} </Text>
								</ThemeIcon>
							</Flex>
						);
					})
				}
			</Flex>
		</Flex>
	);
};