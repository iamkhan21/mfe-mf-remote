import type { Story, StoryDefault } from "@ladle/react";
import CountryCard from "./country-card";
import type React from "react";

export default {
	title: "Country Card",
} satisfies StoryDefault;

export const DefaultCountryCard: Story<
	React.ComponentProps<typeof CountryCard>
> = CountryCard;

DefaultCountryCard.storyName = "Country Card";

DefaultCountryCard.args = {
	countryName: "BY",
};
