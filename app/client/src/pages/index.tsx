import { useRouter } from "next/router";

export default function Home(): JSX.Element {
	const router = useRouter();
	if (typeof window !== "undefined") {
		router.push("/books");
	}
}
