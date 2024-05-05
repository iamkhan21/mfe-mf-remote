import type { Story, StoryDefault } from "@ladle/react";
import CountryList from "./country-list";

export default {
    title: "Country List",
} satisfies StoryDefault;

export const DefaultCountryList: Story = CountryList;

DefaultCountryList.storyName = "Country List";

DefaultCountryList.args = {
};
