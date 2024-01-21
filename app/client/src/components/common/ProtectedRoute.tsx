import { useRouter } from "next/router";
import { useAuth } from "@app/context/auth";
import { useLayoutEffect } from "react";
import { Flex, Loader } from "@mantine/core";

export default function ProtectedRoute({ children }: { children: React.ReactNode }): JSX.Element {
	const router = useRouter();
	const { isAuthenticated, isLoading } = useAuth();

	useLayoutEffect(() => {
		if (!isAuthenticated && !isLoading) {
			router.push("/login");
		}
	}, []);

	if (isLoading) {
		return (
			<Flex align="center" justify="center" h="100%" w="100%">
				<Loader size="xl" />
			</Flex>
		);
	}

	return (
		<>
			{children}
		</>
	);
};
