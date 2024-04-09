import { isAdmin } from "./src/auth/middleware";

// test for access control
describe("access control", () => {
	it("should return false if user is not logged in", async () => {
		const req = {user: null};

		const result = await isAdmin({req});
	});

	it("should return true if user is logged in", async () => {
		const req = {user: {id: 1}};

		const result = await isAdmin({req});
	});
});