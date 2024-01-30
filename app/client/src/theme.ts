import { createTheme, Flex, rem } from "@mantine/core";

export default createTheme({
	primaryColor: "gray",
	colors: {
		gray: [
			"#f8f9fa",
			"#f1f3f5",
			"#e9ecef",
			"#dee2e6",
			"#ced4da",
			"#adb5bd",
			"#868e96",
			"#495057",
			"#343a40",
			"#212529",
		],
	},
	fontSizes: {
		xs: rem(14),
		sm: rem(16),
		md: rem(19),
		lg: rem(22),
		xl: rem(26),
	},
	autoContrast: true,
	primaryShade: 1,
	fontFamily: "Roboto, sans-serif",
	scale: 1.25,
	defaultRadius: "sm",
});
