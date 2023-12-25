import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
	plugins: [remix({
		ignoredRouteFiles: ["**/.*"],
		appDirectory: "./client/app",
		// assetsBuildDirectory: "public/build",
		publicPath: "./client/public",
		// serverBuildPath: "build/index.js",
	})],
});