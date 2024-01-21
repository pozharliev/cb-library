import ProtectedRoute from "@app/components/common/ProtectedRoute";

export default function Page(): JSX.Element {
	return (
		<ProtectedRoute>
			<h1> Hello </h1>
		</ProtectedRoute>
	);
}
