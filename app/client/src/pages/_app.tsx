import "@app/global.css";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { type APIError, DefaultError } from "@app/types/error";

import Head from "next/head";
import { SWRConfig } from "swr";

import { MantineProvider } from "@mantine/core";
import theme from "@app/theme";


import Layout from "@app/components/common/Layout";
import { AuthProvider } from "@app/context/auth";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<SWRConfig
			value={{
				fetcher: (resource: string, init?: RequestInit) => fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST}/${resource}`, {
					...init,
					credentials: "include",
					headers: {
						...init?.headers,
						"Content-Type": "application/json",
					},
				})
					.then(async res => {
						if (!res.ok) {
							const errorInfo = await res.json() as APIError;

							const error: DefaultError<APIError> = {
								error: errorInfo,
								status: res.status,
							};

							throw error;
						}

						return res.json();
					}),
			}}
		>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<AuthProvider>
					<Head>
						<meta name="viewport" content="width=device-width, initial-scale=1"/>
					</Head>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AuthProvider>
			</MantineProvider>
		</SWRConfig>
	);
}
