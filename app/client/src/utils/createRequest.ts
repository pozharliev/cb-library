import type { APIError, DefaultError } from "@app/types/error";


export const createRequest = (url: string, { arg }: Record<string, unknown>) => fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST}/${url}`, {
	credentials: "include",
	headers: {
		"Content-Type": "application/json",
	},
	method: "POST",
	body: JSON.stringify(arg),
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
	});
