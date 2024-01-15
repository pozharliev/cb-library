import { Container } from "@mantine/core";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<>
			<Header />
			<Container size="lg" h="100%" w="100%" component="main" style={{ display: "flex", flexGrow: 1 }}>
				{children}
			</Container>
		</>
	);
}
