import React, { Fragment } from "react";

import { AdminViewProps } from "payload/config";

import { Eyebrow, Gutter } from "payload/components/elements";

import BookRequests from "../components/BookRequests";

export default function DashboardView(props: AdminViewProps): React.ReactNode {
	return (
		<Fragment>
			<Gutter>
				<BookRequests />
			</Gutter>
		</Fragment>
	);
}