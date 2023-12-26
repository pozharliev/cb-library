import React from "react";

import { BookRequest } from "payload/generated-types";

import useBookRequests from "../hooks/useBookRequests";

import "../styles/BookRequests.scss";
import { Button, DocumentDrawer, DocumentDrawerToggler } from "payload/components/elements";

function BookRequest({ request }: { request: BookRequest }): JSX.Element {
	const bookTitle = !request.book || typeof request.book === "number" ? "Книга" : request.book.title;

	const userTitle = !request.user || typeof request.user === "number" ? "Човек" : request.user.firstName;
	const userId = typeof request.user === "number" ? request.user : request.user != null ? request.user.id : null;

	return (
		<div className="request">
			<h4>
				{`Заявка за взимане на ${bookTitle} от `}
				<DocumentDrawerToggler collectionSlug="users" drawerSlug="users-drawer" id={String(userId)}>
					<h4> {userTitle} </h4>
				</DocumentDrawerToggler>
			</h4>

			<div className="actions">
				<Button buttonStyle="primary"> 123 </Button>
				<Button buttonStyle="secondary"> Decline </Button>
			</div>

			<DocumentDrawer collectionSlug="users" id={String(userId)} drawerSlug="users-drawer" />
		</div>
	);
}

export default function BookRequests(): JSX.Element {
	const [requests, handleBookChange] = useBookRequests();

	return (
		<div className="book-requests">
			<h1> Hello </h1>
			{
				requests.map(request =>
					<BookRequest key={request.id} request={request} />
				)
			}
		</div>
	);
}
