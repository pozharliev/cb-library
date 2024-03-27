import payload from "payload";
import { CronJob } from "cron";

const convertPendingRequestsToStale = async () => {
	payload.logger.info("Converting pending requests to stale");


	// TODO: Need global var for stale requests
	await payload
		.update({
			collection: "book-requests",
			where: {
				state: {
					equals: "pending",
				},
				createdAt: {
					less_than: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
				},
			},
			data: {
				state: "stale",
			},
		});
};

export default CronJob.from({
	cronTime: process.env.NODE_ENV === "development" ? "* * * * *" : "0 7 * * *",
	onTick: convertPendingRequestsToStale,
	timeZone: "Europe/Sofia",
});
