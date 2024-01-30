import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();
	if (typeof window !== "undefined") {
		router.push(`${process.env.NEXT_PUBLIC_SERVER_HOST}/oauth2/authorize`);
	}
}
