import { type Book, type BookRequest } from "payload/generated-types";

import { PendingState } from "@app/components/ui/request/states/PendingState";
import { ApprovedState } from "@app/components/ui/request/states/ApprovedState";
import { CancelledState } from "@app/components/ui/request/states/CancelledState";
import { DeclinedState } from "@app/components/ui/request/states/DeclinedState";
import { StaleState } from "@app/components/ui/request/states/StaleState";
import { useState } from "react";
import { Flex, Image, rem, Title } from "@mantine/core";
import { getImage } from "@app/utils/image";
import { capitalize } from "@app/utils/capitalize";

export default function StateFactory({ data }: { data: BookRequest }): JSX.Element {
	const book = data?.book as Book | undefined;

	if (book == null || data == null) {
		// TODO
		return <h1> Bad Request </h1>;
	}

	const state = () => {
		switch (data?.state) {
			case "pending":
				return <PendingState data={data} book={book} />;
				break;
			case "approved":
				return <ApprovedState data={data} book={book} />;
				break;
			case "stale":
				return <StaleState data={data} book={book} />;
				break;
			case "declined":
				return <DeclinedState data={data} book={book} />;
				break;
			case "cancelled":
				return <CancelledState data={data} book={book} />;
				break;
		}
	};

	return (
		<Flex direction="column" gap={rem(26)}>
			<Flex direction="row" align="center" gap={rem(8)}>
				<Title fw="500"> Request #{data.id} for </Title>
				<Title> {book.title} </Title>
				<Title fw="500"> by </Title>
				<Title> {book.author} </Title>
			</Flex>

			<Flex gap={rem(32)} align="center">
				<Image
					alt={book.title}
					radius="sm"
					src={getImage(book)}
					fallbackSrc={"https://placehold.co/450x650"}
					w={rem(450)}
				/>

				<Flex gap={rem(16)} direction="column">
					<Flex gap={rem(8)} align="center">
						<Title order={2} fw="500">Current status of the request is: </Title>
						<Title order={2}> {capitalize(data?.state)} </Title>
					</Flex>
					<Flex align="center" gap={rem(8)}>
						<Title order={3} fw="500"> The request was created on: </Title>
						<Title order={3}> {new Date(data.createdAt).toDateString()} </Title>
					</Flex>
					{state()}
				</Flex>
			</Flex>
		</Flex>
	);
}
