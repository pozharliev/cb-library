/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: config => {
		config.watchOptions = {
			poll: 500,
			aggregateTimeout: 100,
			ignored: ["node_modules"],
		};
		return config;
	},
};

module.exports = nextConfig;
