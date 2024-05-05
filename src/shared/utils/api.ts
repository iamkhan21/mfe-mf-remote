import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";

export const COUNTRIES_API = wretch("https://restcountries.com/v3.1")
	.addon(QueryStringAddon)
	.errorType("json")
	.resolve((r) => r.json());
