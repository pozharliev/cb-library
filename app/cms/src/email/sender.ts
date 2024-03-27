import payload from "payload";
import fs from "fs/promises";
import * as handlebars from "handlebars";

type Template = "notice" | "statusChange";

type EmailArgs = {
	to: string;
	userFullName: string;
};

type NoticeEmailArgs = {
	bookName: string;
};

type StatusChangeEmailArgs = {
	stateFrom: string;
	stateTo: string;
	requestId: number;
};

const SUBJECTS = {
	"notice": "Notice about taken book that is overdue",
	"statusChange": "Status change on your recent book request",
};

type SendEmailArgs = EmailArgs & (NoticeEmailArgs | StatusChangeEmailArgs);
export const sendEmail = async (template: Template, args: SendEmailArgs): Promise<void> => {
	try {
		const rawTemplate = await fs.readFile(__dirname + `/src/${template}.hbs`, "utf8");
		const dataTemplate = handlebars.compile(rawTemplate);
		const output = dataTemplate({
			...args,
		});

		if (process.env.NODE_ENV !== "development") {
			await payload.sendEmail({
				from: "abpozharliev19@codingburgas.bg",
				to: args.to,
				html: output,
				subject: SUBJECTS[template],
			}).then(console.log);
		}
	} catch (e) {
		payload.logger.error(e, "Error loading handlebars template");
	}

};
