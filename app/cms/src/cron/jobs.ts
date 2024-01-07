import booksCronJob from "./books";

// TODO
class CronJobs {
	constructor() {
		booksCronJob.start();
	}
}

export default CronJobs;