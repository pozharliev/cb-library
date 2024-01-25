import type { GlobalConfig } from "payload/types";

import { isAdmin } from "../auth/middleware";

const Settings: GlobalConfig = {
	slug: "settings",
	fields: [
		{
			name: "maxDaysRent",
			label: "Max Days of Rent",
			type: "number",
		},
	],
	typescript: {
		interface: "Settings",
	},
	access: {
		read: isAdmin,
		update: isAdmin,
	},
};

export default Settings;
