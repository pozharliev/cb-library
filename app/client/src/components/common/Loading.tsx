import { Flex, Loader } from "@mantine/core";

export default function Loading({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }): JSX.Element {
	if (isLoading) {
		return (
			<Flex align="center" justify="center" h="100%" w="100%" style={{ flexGrow: 1 }}>
				<Loader size="xl" />
			</Flex>
		);
	}

	return (
		<>
			{children}
		</>
	);
}
