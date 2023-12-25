import type { GlobalConfig } from "payload/types";

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
};

export default Settings;
