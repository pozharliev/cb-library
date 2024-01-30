export type APIError = {
	errors: Array<{
		message: string;
	}>;
};

export type DefaultError<E> = {
	error: E;
	status: number;
};
