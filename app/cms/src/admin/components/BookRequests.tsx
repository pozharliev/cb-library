import React from "react";

import { Button, DocumentDrawer, DocumentDrawerToggler } from "payload/components/elements";
import { BookRequest } from "payload/generated-types";

import useBookRequests from "../hooks/useBookRequests";
import { ActionHandler } from "../types/BookRequest";

import "../styles/BookRequests.scss";

function BookRequest({ request, handleAccept, handleDecline }: { request: BookRequest, handleAccept: () => void, handleDecline: () => void }): JSX.Element {
	const bookTitle = !request.book || typeof request.book === "number" ? "Книга" : request.book.title;
	const userTitle = !request.user || typeof request.user === "number" ? "Човек" : request.user.firstName;
	const userId = typeof request.user === "number" ? request.user : request.user != null ? request.user.id : null;
	const typeRequest = request.type === "take" ? "взимане" : "връщане"

	return (
		<div className="request">
			<h4>
				{`Заявка за ${typeRequest} на ${bookTitle} от `}
				<DocumentDrawerToggler collectionSlug="users" drawerSlug="users-drawer" id={String(userId)}>
					<h4> {userTitle} </h4>
				</DocumentDrawerToggler>
			</h4>

			<div className="actions">
				<Button buttonStyle="primary" onClick={() => handleAccept()}> Accept </Button>
				<Button buttonStyle="secondary" onClick={() => handleDecline()}> Decline </Button>
			</div>

			<DocumentDrawer collectionSlug="users" id={String(userId)} drawerSlug="users-drawer" />
		</div>
	);
}

export default function BookRequests(): JSX.Element {
	const [requests, handleBookChange] = useBookRequests();

	return (
		<div className="container">
			{
				requests.map(request => {

					return <BookRequest
						key={request.id}
						request={request}
						handleAccept={() => handleBookChange(request.id, "approve")}
						handleDecline={() => handleBookChange(request.id, "decline")}
					/>;
				})
			}
		</div>
	);
}
