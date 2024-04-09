import { request } from "express";

describe("BookRequest", () => {
	const user = {
		email: "ABPozharliev19@codingburgas.bg",
	};
	const book = {
		title: "The Great Gatsby"
	};

	it("should create a new book request", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests")
			.send({
				user: user.id,
				book: book.id,
				type: "take",
			})
			.expect(200);
		expect(data.request).toBeDefined();
	});
});

describe("BookRequest", () => {
	const user = {
		email: "ABPozharliev19@codingburgas.bg",
	};
	const book = {
		title: "The Great Gatsby"
	};

	it("should cancel a book request", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/cancel")
			.send({
				requestId: 1,
			})
			.expect(200);
	});

	it("should not cancel a book request if the user is not the owner of the request", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/cancel")
			.send({
				requestId: 1,
			})
			.expect(403);
	});
});

describe("BookRequest", () => {
	const user = {
		email: "ABPozharliev19@codingburgas.bg",
	};
	const book = {
		title: "The Great Gatsby"
	};

	it("should not approve a book request", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/approve")
			.send({
				requestId: 1,
			})
			.expect(400;
	});
});

describe("BookRequest", () => {
	const user = {
		email: "ABPozharliev19@codingburgas.bg",
	};

	it("should send an email to the user", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/send-email")
			.send({
				requestId: 1,
			})
			.expect(200);
	});
});