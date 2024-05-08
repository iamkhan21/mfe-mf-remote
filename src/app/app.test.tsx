import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "../test/test-utils";
import App from "./app";

describe("<App />", () => {
	function setup() {
		render(<App />);
	}

	it("should render without error", () => {
		setup();

		expect(screen.getByText(/USPM/i)).toBeInTheDocument();
		expect(
			screen.getByText(/remote module for country data/i),
		).toBeInTheDocument();
	});
});
