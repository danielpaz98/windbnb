import { StrictMode } from "react";
import { render } from "react-dom";

import App from "./App";
import "./tailwind.css";

const app = document.getElementById("app");

render(
	<StrictMode>
		<App />
	</StrictMode>,
	app
);
