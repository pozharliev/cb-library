import payload from "payload";
import fs from "fs/promises";
import * as handlebars from "handlebars";

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

type EmailArgsByType = {
	notice: NoticeEmailArgs;
	statusChange: StatusChangeEmailArgs;
};


const SUBJECTS = {
	"notice": "Notice about taken book that is overdue",
	"statusChange": "Status change on your recent book request",
};

export const sendEmail = async<T extends keyof EmailArgsByType> (template: T, args: EmailArgs & EmailArgsByType[T]): Promise<void> => {
	try {
		const rawTemplate = await fs.readFile(__dirname + `/src/${template}.hbs`, "utf8");
		const dataTemplate = handlebars.compile(rawTemplate);
		const output = dataTemplate({
			...args,
		});

		await payload.sendEmail({
			from: "abpozharliev19@codingburgas.bg",
			to: args.to,
			html: output,
			subject: SUBJECTS[template],
		}).then(console.log);
	} catch (e) {
		payload.logger.error(e, "Error loading handlebars template");
	}

};
