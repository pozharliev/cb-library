import React, { Fragment } from "react";

import { AdminViewProps } from "payload/config";

import { Eyebrow, Gutter } from "payload/components/elements";

import BookRequests from "../components/BookRequests";
import TakenBooks from "../components/TakenBooks";

export default function DashboardView(props: AdminViewProps): React.ReactNode {
	return (
		<Fragment>
			<Gutter>
				<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<BookRequests />
					<TakenBooks />
				</div>
			</Gutter>
		</Fragment>
	);
}