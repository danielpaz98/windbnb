import path from "path";

import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), eslintPlugin()],
	esbuild: {
		jsxFactory: "_jsx",
		jsxFragment: "_jsxFragment",
		jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from 'react'`,
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
		},
	},
});
