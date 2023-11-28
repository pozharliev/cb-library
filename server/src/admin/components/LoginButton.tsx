import React from "react";
import Button from "payload/dist/admin/components/elements/Button";

export default function LoginButton(): JSX.Element {
	return (
		<div style={{ marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Button el="anchor" url="/oauth2/authorize">
				Sign in with Microsoft Account
			</Button>
		</div>
	);
}
