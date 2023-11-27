import React, { useState, useEffect } from "react";

import { Label, reduceFieldsToValues, useAllFormFields } from "payload/components/forms";
import ReactSelect from "payload/dist/admin/components/elements/ReactSelect";

import { type Props } from "payload/components/fields/Text";
import type GoogleBookTypeWithValueAndLabel from "../../types/GoogleBook";
import { type GoogleBooksRequest } from "../../types/GoogleBook";
import { useDebouncedCallback } from "payload/dist/admin/hooks/useDebouncedCallback";
const Option = (props: unknown): JSX.Element => {
	return (
		<h1 ref={props.innerRef} {...props.innerProps}> {props.data.title} | {props.data.subtitle} </h1>
	);
};

export default function BookSearch(props: Props): JSX.Element {
	const {
		path,
		label,
		required,
	} = props;

	const [fields, dispatchFields] = useAllFormFields();
	const formData = reduceFieldsToValues(fields, true);

	const [input, setInput] = useState("");
	const [options, setOptions] = useState<GoogleBookTypeWithValueAndLabel[]>([]);
	const [selectedOption, setSelectedOption] = useState<GoogleBookTypeWithValueAndLabel | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const debouncedSearch = useDebouncedCallback(() => {
		setIsLoading(true);

		fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
			.then(data => data.json().then((books: GoogleBooksRequest) => {
				console.log(books);
				setOptions(books.items.map(value => value.volumeInfo).map(val => {
					return {
						...val,
						value: val.title,
						label: val.title,
					};
				}));
			}))
			.catch((e) => {
				console.error(e);
				// setOptions([]);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, 500);

	useEffect(() => {
		debouncedSearch();
	}, [input]);

	console.log(options);

	return (
		<div>
			<Label
				htmlFor={path}
				label={label}
				required={required}
			/>
			<ReactSelect
				options={options}
				value={selectedOption}
				isLoading={isLoading}
				components={{
					Option,
				}}
				onChange={(val: GoogleBookTypeWithValueAndLabel) => { setSelectedOption(val); }}
				onInputChange={(val: string) => { setInput(val); }}
			/>
		</div>
	);
};
