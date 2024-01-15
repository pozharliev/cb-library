import "@mantine/core/styles.css";
import "@app/global.css";

import type { AppProps } from "next/app";

import { SWRConfig } from "swr";

import { MantineProvider } from "@mantine/core";
import theme from "@app/theme";

import Layout from "@app/components/common/Layout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<SWRConfig
			value={{
				fetcher: (resource: string, init?: RequestInit) => fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${resource}`, {
					...init,
					credentials: "include",
					headers: {
						...init?.headers,
						"Content-Type": "application/json",
					},
				}).then(res => res.json()),
			}}
		>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</SWRConfig>
	);
}
