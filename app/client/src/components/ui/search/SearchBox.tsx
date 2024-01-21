import { useForm } from "@mantine/form";
import { Box, Button, Flex, rem, TextInput, Title } from "@mantine/core";
import { type FormEvent } from "react";
import { useSearchBox, type UseSearchBoxProps } from "react-instantsearch-core";

export default function SearchBox(props: UseSearchBoxProps): JSX.Element {
	const { refine } = useSearchBox(props);

	const form = useForm({
		initialValues: {
			search: "",
		},
	});

	const onSubmit = (e: FormEvent): void => {
		e.preventDefault();

		refine(form.values.search);
	};

	return (
		<Box component="form" onSubmit={onSubmit} py={rem(8)}>
			<TextInput
				size="sm"
				placeholder="All Books..."
				{...form.getInputProps("search")}
			/>
		</Box>
	);
};
