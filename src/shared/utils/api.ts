import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";

export const COUNTRIES_API_URL = "https://restcountries.com/v3.1";

export const COUNTRIES_API = wretch(COUNTRIES_API_URL)
	.addon(QueryStringAddon)
	.errorType("json")
	.resolve((r) => r.json());
