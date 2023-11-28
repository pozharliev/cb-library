import React, { useState } from "react";

import { type Props } from "payload/components/fields/Text";
import { Label, reduceFieldsToValues, useAllFormFields } from "payload/components/forms";

import AsyncCreatableSelect from "react-select/async-creatable";
import type { ActionMeta } from "react-select";

import type GoogleBookTypeWithValueAndLabel from "../../types/GoogleBook";
import { type GoogleBooksRequest, type GoogleBookType } from "../../types/GoogleBook";

import { BOOK_API_URL } from "../../config/main";

import "payload/dist/admin/components/elements/ReactSelect/index.scss";

export default function BookSearch(props: Props): JSX.Element {
	const { path, label, required } = props;

	const [fields, dispatchFields] = useAllFormFields();
	const formData = reduceFieldsToValues(fields, true);

	const [input, setInput] = useState("");
	const [selectedOption, setSelectedOption] = useState(
		formData.title === undefined ?
			null :
			{
				value: formData.title as string,
				label: formData.title as string,
			}
	);

	const formatLabel = (options: GoogleBookTypeWithValueAndLabel): string => {
		if (options.label === undefined || options.label === null) {
			return "";
		}
		return `${options.label}${options.authors?.length === undefined ? "" : ` от ${options.authors[0]}` ?? ""}`;
	};

	const chooseOption = (data: GoogleBookTypeWithValueAndLabel, event: ActionMeta<GoogleBookTypeWithValueAndLabel>): void => {
		switch (event.action) {
			case "select-option":
				dispatchFields({
					path: "author",
					type: "UPDATE",
					value: data.authors === undefined ? "" : data.authors[0] ?? "",
				});

				dispatchFields({
					path: "title",
					type: "UPDATE",
					value: data.title,
				});

				dispatchFields({
					path: "subtitle",
					type: "UPDATE",
					value: data.subtitle,
				});

				setSelectedOption(data);
				break;

			case "clear":
				setSelectedOption(null);
				break;

			case "create-option":
				setSelectedOption({
					label: data.label,
					value: data.value,
				});
		}
	};

	const searchBooks = (inputValue: string): Promise<GoogleBookTypeWithValueAndLabel[]> =>
		fetch(BOOK_API_URL + `?q=${inputValue}`)
			.then(data =>
				data.json().then((books: GoogleBooksRequest) =>
					books.items
						.map(value => {
							return {
								...value.volumeInfo,
								id: value.id,
							};
						})
						.map((book: GoogleBookType) => {
							return {
								...book,
								value: book.title,
								label: book.title,
							};
						})
				)
			)
			.catch(e => {
				console.error(e);
				return [];
			});

	return (
		<div style={{ marginBottom: "3rem" }}>
			<Label htmlFor={path} label={label} required={required} />
			<AsyncCreatableSelect
				className="react-select"
				classNamePrefix="rs"
				styles={{
					singleValue: base => {
						return {
							...base,
							color: "rgb(235, 235, 235)",
						};
					},
				}}
				value={selectedOption}
				inputValue={input}
				onInputChange={setInput}
				createOptionPosition="first"
				isClearable={true}
				isSearchable={true}
				cacheOptions={true}
				loadOptions={searchBooks}
				onChange={chooseOption}
				formatOptionLabel={formatLabel}
			/>
		</div>
	);
}
