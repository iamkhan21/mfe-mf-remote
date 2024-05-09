import { msw, type Story } from "@ladle/react";
import CountryList from "./country-list";
import type React from "react";
import { COUNTRIES_API_URL } from "../../shared/utils/api";
import MOCKED_COUNTRIES_DATA from "./countries.mock.json";

export default {
	msw: [
		// Mock the countries API call
		msw.http.get(`${COUNTRIES_API_URL}/all`, async () => {
			await msw.delay(2000);
			return msw.HttpResponse.json(MOCKED_COUNTRIES_DATA);
		}),
	],
};

export const Example: Story<React.ComponentProps<typeof CountryList>> = () => (
	<CountryList onCountryClick={(code) => console.log(code)} />
);

Example.storyName = "Country List";
