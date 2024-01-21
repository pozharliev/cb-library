import { Pagination as MantinePagination } from "@mantine/core";
import { usePagination, type UsePaginationProps } from "react-instantsearch";

export default function Pagination(props: UsePaginationProps): JSX.Element {
	const {
		nbPages,
		refine,
	} = usePagination({
		...props,
	});

	return (
		<MantinePagination total={nbPages} onChange={(v) => refine(v - 1)} />
	);
}
