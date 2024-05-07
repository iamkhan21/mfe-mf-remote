import type { Story, StoryDefault } from "@ladle/react";
import CountryList from "./country-list";
import type React from "react";

export default {
	title: "Country List",
} satisfies StoryDefault;

export const DefaultCountryList: Story<
	React.ComponentProps<typeof CountryList>
> = CountryList;

DefaultCountryList.storyName = "Country List";

DefaultCountryList.args = {
	onCountryClick: (code) => {
		console.log(code);
	},
};
