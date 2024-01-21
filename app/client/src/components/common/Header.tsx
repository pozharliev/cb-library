import Link from "next/link";
import { Button, Container, Flex, rem, Text, Box } from "@mantine/core";
import { IconBook2, IconBrandGithub, IconGraph, IconUserSquare } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useAuth } from "@app/context/auth";

export default function Header(): JSX.Element {
	const { user } = useAuth();

	const isMobile = useMediaQuery("(max-width: 36em");
	return (
		<Box bg="gray.7" h={rem(72)} component="header" mb={rem(12)} p={rem(16)}>
			<Container size="md" h="100%" w="100%">
				<Flex
					justify={{
						base: "center",
						sm: "space-between",
					}}
					align="center"
					h="100%"
					w="100%"
				>
					<Flex
						gap={{
							base: 0,
							sm: rem(8),
						}}
					>
						<Button variant="outline" component={Link} href="/">
							<Text size={"xl"}>
							/
							</Text>
						</Button>

						<Button variant="subtle" component={Link} href="/books">
							<IconBook2
								width={isMobile ? rem(26) : rem(44)}
								height={isMobile ? rem(26) : rem(44)}
								stroke={1.5}
							/>
							<Text size="xl" visibleFrom="sm">
							books
							</Text>
						</Button>

						<Button variant="subtle" component={Link} href="/statistics">
							<IconGraph
								width={isMobile ? rem(26) : rem(44)}
								height={isMobile ? rem(26) : rem(44)}
								stroke={1.5}
							/>
							<Text size="xl" visibleFrom="sm">
							statistics
							</Text>
						</Button>
					</Flex>

					<Flex>
						<Button component={Link} href={ user == null ? "/login" : "/profile" } variant="subtle">
							<IconUserSquare
								width={isMobile ? rem(26) : rem(44)}
								height={isMobile ? rem(26) : rem(44)}
								stroke={1.5}
							/>
							<Text size="xl" visibleFrom="sm" hidden={user != null}>
								login
							</Text>
						</Button>

						<Button component={Link} href="http://github.com" variant="subtle">
							<IconBrandGithub
								width={isMobile ? rem(26) : rem(44)}
								height={isMobile ? rem(26) : rem(44)}
								stroke={1.5}
							/>
						</Button>
					</Flex>
				</Flex>
			</Container>
		</Box>
			
	);
};
