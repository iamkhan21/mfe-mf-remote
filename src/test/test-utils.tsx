import type React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";
import { withProviders } from "../app/providers";

afterEach(() => {
	cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
	return render(ui, {
		// wrap provider(s) here if needed
		wrapper: ({ children }) => {
			const Component = withProviders(() => children);
			return <Component />;
		},
		...options,
	});
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
