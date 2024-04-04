import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";

import { useAuth } from "@app/context/auth";

import Loading from "@app/components/common/Loading";

export default function ProtectedRoute({ children }: { children: React.ReactNode }): JSX.Element {
	const router = useRouter();
	const { isAuthenticated, isLoading, user } = useAuth();


	useEffect(() => {
		console.log(isAuthenticated, isLoading);
		if (!isAuthenticated && !isLoading) {
			router.push("/login");
		}
	}, [user]);

	return (
		<Loading isLoading={isLoading}>
			{children}
		</Loading>
	);
};
