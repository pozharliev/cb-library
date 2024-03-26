import React, { useEffect, useState } from "react";

import { Button, DocumentDrawer, DocumentDrawerToggler } from "payload/components/elements";
import { Book, User } from "payload/generated-types";


import "../styles/BookRequests.scss";
import { API_URL } from "../../config/main";

function Book({ book }: { book?: { book?: Book, createdAt?: Date, takenBy?: User, status?: "taken" | "inStore" } }): JSX.Element {
	const bookTitle = book?.book?.title;
	const bookId = book?.book?.id;
	const userTitle = book?.takenBy?.firstName;
	const userId = book?.takenBy?.id;

	return (
		<div className="request">
			<h4>
				{`Книга `}
				<DocumentDrawerToggler collectionSlug="books" drawerSlug="books-drawer" id={String(bookId)}>
					<h4> {bookTitle} </h4>
				</DocumentDrawerToggler>
				{` взета от  `}
				<DocumentDrawerToggler collectionSlug="users" drawerSlug="users-drawer" id={String(userId)}>
					<h4> {userTitle} </h4>
				</DocumentDrawerToggler>
			</h4>

			<div className="actions">
				<Button buttonStyle="primary"> Send Email </Button>
			</div>

			<DocumentDrawer collectionSlug="users" id={String(userId)} drawerSlug="users-drawer" />
			<DocumentDrawer collectionSlug="books" id={String(bookId)} drawerSlug="books-drawer" />
		</div>
	);
}

export default function TakenBooks(): JSX.Element {
	const [books, setBooks] = useState<Array<{ book: Book, createdAt: Date, takenBy: User, status: "taken" | "inStore" }>>();

	useEffect(() => {
		const URL_PREFIX = "/books/taken";
		const url = new URL(API_URL + URL_PREFIX);

		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(setBooks)
			.catch(console.error);
	}, []);

	return (
		<div className="container">
			{
				books?.map(book => <Book key={book.book.id} book={book} />)
			}
		</div>
	);
}
