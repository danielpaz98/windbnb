const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{js,jsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			"1290px": "1290px",
			...defaultTheme.screens,
		},
		extend: {
			fontFamily: {
				mulish: "'Mulish', sans-serif",
			},
			keyframes: {
				fadeIn: {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-in",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
