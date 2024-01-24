import booksCronJob from "./books";
import bookRequestCronJob from "./bookRequests";
import { CronJob } from "cron";

class CronJobs {
	private cronJobs: Array<CronJob> = [];

	constructor() {
		this.cronJobs.push(booksCronJob);
		this.cronJobs.push(bookRequestCronJob);
	}

	start() {
		for (const job of this.cronJobs) {
			job.start();
		}
	}
}

export default CronJobs;