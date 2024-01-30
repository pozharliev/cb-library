import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

import { useAuth } from "@app/context/auth";

import Loading from "@app/components/common/Loading";

export default function ProtectedRoute({ children }: { children: React.ReactNode }): JSX.Element {
	const router = useRouter();
	const { isAuthenticated, isLoading } = useAuth();

	useLayoutEffect(() => {
		if (!isAuthenticated && !isLoading) {
			router.push("/login");
		}
	}, []);

	return (
		<Loading isLoading={isLoading}>
			{children}
		</Loading>
	);
};
