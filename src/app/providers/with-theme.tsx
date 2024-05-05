import type React from "react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const withTheme =
	<TProps extends object>(
		Component: React.ComponentType<TProps>,
	): React.FC<TProps> =>
	(props) => {
		return (
			<Theme id="base">
				<Component {...props} />
			</Theme>
		);
	};

export default withTheme;
