import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
import "./main.css";

const element = document.getElementById("root");

if (!element) throw new Error("No root element found");

const root = ReactDOM.createRoot(element);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
