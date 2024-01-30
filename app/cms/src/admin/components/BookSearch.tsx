import React, { useState } from "react";

import { type Props } from "payload/components/fields/Text";
import { Label, reduceFieldsToValues, useAllFormFields } from "payload/components/forms";

import AsyncCreatableSelect from "react-select/async-creatable";
import type { ActionMeta } from "react-select";

import { type GoogleBooksRequest, type GoogleBook } from "../types/GoogleBook";

import { BOOK_API_URL } from "../../config/main";

import "payload/dist/admin/components/elements/ReactSelect/index.scss";

type Option = {
	value: string;
	label: string;
};
type GoogleBookOption = GoogleBook & Option;

export default function BookSearch(props: Props): JSX.Element {
	const { path, label, required } = props;

	const [fields, dispatchFields] = useAllFormFields();
	const formData = reduceFieldsToValues(fields, true);

	const [input, setInput] = useState("");
	const [selectedOption, setSelectedOption] = useState<Option | null>(
		typeof formData.title === "string" ?
			{
				value: formData.title,
				label: formData.title,
			  } :
			null
	);

	const formatLabel = (options: GoogleBookOption): string => {
		if (!options.label) {
			return "";
		}

		const author = options.authors?.[0];

		return `${options.label}${author != null ? ` by ${author}` : ""}`;
	};

	const chooseOption = (data: GoogleBookOption, event: ActionMeta<GoogleBookOption>): void => {
		switch (event.action) {
			case "select-option":
				dispatchFields({
					path: "author",
					type: "UPDATE",
					value: data.authors?.[0] ?? "",
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

	const searchBooks = async (inputValue: string): Promise<GoogleBookOption[]> => {
		const url = new URL(BOOK_API_URL);
		url.searchParams.append("q", inputValue);

		try {
			const response = await fetch(url);
			const { items }: GoogleBooksRequest = await response.json();

			return items.map(({ volumeInfo }) => ({ ...volumeInfo, value: volumeInfo.title, label: volumeInfo.title }));
		} catch (e) {
			console.log(e);
			return [];
		}
	};

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
