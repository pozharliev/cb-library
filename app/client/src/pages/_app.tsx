import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";

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
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</SWRConfig>
	);
}
