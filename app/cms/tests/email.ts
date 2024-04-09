// tests to check if the email is sent

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

	it("should not send an email to the user if the request does not exist", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/send-email")
			.send({
				requestId: 2,
			})
			.expect(400);
	});

	it("should not send an email to the user if the request is not approved", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/send-email")
			.send({
				requestId: 3,
			})
			.expect(400);
	});

	it("should not send an email to the user if the request is not pending", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/send-email")
			.send({
				requestId: 4,
			})
			.expect(400);
	});

	it("should not send an email to the user if the request is not stale", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/send-email")
			.send({
				requestId: 5,
			})
			.expect(400);
	});

	it("should not send an email to the user if the request is not taken", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/send-email")
			.send({
				requestId: 6,
			})
			.expect(400);
	});

	it("should not send an email to the user if the request is not approved and taken", async () => {
		const {data} = await request(app)
			.post("/cms/book-requests/send-email")
			.send({
				requestId: 7,
			})
			.expect(400);
	});
});