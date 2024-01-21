import { Html, Head, Main, NextScript } from "next/document";

import { ColorSchemeScript } from "@mantine/core";

export default function Document(): JSX.Element {
	return (
		<Html lang="en">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<ColorSchemeScript defaultColorScheme="dark"/>
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	);
}
