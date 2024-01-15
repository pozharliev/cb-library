import Link from "next/link";
import { Button, Container, Flex, rem, Text, Box } from "@mantine/core";
import { IconBook2, IconBrandGithub, IconGraph, IconUserSquare } from "@tabler/icons-react";

export default function Header(): JSX.Element {
	return (
		<Box bg="gray.7" h={rem(72)} component="header" mb={rem(32)}>
			<Container size="xl" h="100%">
				<Flex
					justify={{
						base: "center",
						sm: "space-between",
					}}
					align="center"
					h="100%"
				>
					<Flex
						gap={{
							base: 0,
							sm: rem(8),
						}}
					>
						<Button variant="outline" component={Link} href="/">
							<Text size="xl">
							/
							</Text>
						</Button>

						<Button variant="subtle" component={Link} href="/books">
							<IconBook2
								width={rem(44)}
								height={rem(44)}
								stroke={1.5}
							/>
							<Text size="xl" visibleFrom="sm">
							books
							</Text>
						</Button>

						<Button variant="subtle" component={Link} href="/statistics">
							<IconGraph
								width={rem(44)}
								height={rem(44)}
								stroke={1.5}
							/>
							<Text size="xl" visibleFrom="sm">
							statistics
							</Text>
						</Button>
					</Flex>

					<Flex>
						<Button component={Link} href="https://github.com" variant="subtle" size="compact-xl">
							<IconBrandGithub
								width={rem(44)}
								height={rem(44)}
								stroke={1.5}
							/>
						</Button>

						<Button component={Link} href="http://localhost:3000/oauth2/authorize" variant="subtle">
							<IconUserSquare
								width={rem(44)}
								height={rem(44)}
								stroke={1.5}
							/>
							<Text size="xl" visibleFrom="sm">
								login
							</Text>
						</Button>
					</Flex>
				</Flex>
			</Container>
		</Box>
			
	);
};
