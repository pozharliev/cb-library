import React, { useState } from "react";

import { type Props } from "payload/components/fields/Text";
import { Label, reduceFieldsToValues, useAllFormFields } from "payload/components/forms";

import AsyncCreatableSelect from "react-select/async-creatable";

import type GoogleBookTypeWithValueAndLabel from "../../types/GoogleBook";
import { type GoogleBooksRequest, type GoogleBookType } from "../../types/GoogleBook";

import "payload/dist/admin/components/elements/ReactSelect/index.scss";
import "./BookSearch.module.scss";

export default function BookSearch(props: Props): JSX.Element {
	const { path, label, required } = props;

	const [fields, dispatchFields] = useAllFormFields();
	const formData = reduceFieldsToValues(fields, true);

	const [input, setInput] = useState("");

	const option = (data: GoogleBookTypeWithValueAndLabel): JSX.Element => {
		return (
			<div className="custom-option">
				<img src={data.imageLinks?.smallThumbnail} height={100} />
				<h3>
					{data.title} | {data.subtitle}
				</h3>
			</div>
		);
	};

	const search = (inputValue: string): Promise<GoogleBookTypeWithValueAndLabel[]> =>
		fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}`)
			.then(data =>
				data.json().then((books: GoogleBooksRequest) =>
					books.items
						.map(value => value.volumeInfo)
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
		<div>
			<Label htmlFor={path} label={label} required={required} />
			<AsyncCreatableSelect
				className="react-select"
				classNamePrefix="rs"
				styles={{
					singleValue: base => {
						return {
							...base,
							color: "rgb(235, 235, 235)",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						};
					},
				}}
				inputValue={input}
				onInputChange={setInput}
				createOptionPosition="first"
				isClearable={true}
				isSearchable={true}
				cacheOptions={true}
				loadOptions={search}
				// onCreateOption={console.log}
				formatOptionLabel={option}
				// onChange={(val: GoogleBookTypeWithValueAndLabel) => {
				// 	setInput(val.title);
				// }}
				// formatCreateLabel={}
			/>
		</div>
	);
}
