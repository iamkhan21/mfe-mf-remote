import type { Story } from "@ladle/react";
import { msw } from "@ladle/react";
import CountryCard from "./country-card";
import type React from "react";
import { COUNTRIES_API_URL } from "../../shared/utils/api";
import MOCKED_COUNTRY_DATA from "./country.mock.json";

export default {
	msw: [
		// Mock the country API call
		msw.http.get(`${COUNTRIES_API_URL}/alpha/CCA21`, async () => {
			await msw.delay(2000);
			return msw.HttpResponse.json(MOCKED_COUNTRY_DATA);
		}),
	],
};

export const Example: Story<React.ComponentProps<typeof CountryCard>> = () => (
	<CountryCard countryIsoCode="CCA21" />
);

Example.storyName = "Country Card";
