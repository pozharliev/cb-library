import { Container, rem } from "@mantine/core";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<>
			<Header />
			<Container size="lg" h="100%" w="100%" component="main" mb={rem(48)} style={{ display: "flex", flexGrow: 1 }}>
				{children}
			</Container>
			<Footer />
		</>
	);
}
