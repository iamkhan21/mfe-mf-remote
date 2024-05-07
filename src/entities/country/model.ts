import { queryOptions, useQuery } from "@tanstack/react-query";
import { COUNTRIES_API } from "../../shared/utils/api";
import type { CountryBase, CountryFull } from "./domain";

/* All countries query */

/**
 * Get all countries query options
 */
export function getCountriesQueryOptions() {
	return queryOptions<CountryBase[]>({
		queryKey: ["countries"],
		queryFn: ({ signal }) =>
			COUNTRIES_API.query({
				fields: ["name", "cca2", "region", "subregion"],
			})
				.options({ signal })
				.get("/all") as Promise<CountryBase[]>,
	});
}

/**
 * Get all countries query
 */
export function useCountries() {
	return useQuery(getCountriesQueryOptions());
}

/* Country query */

/**
 * Get country query options
 */
export function getCountryQueryOptions(countryCCA2: string) {
	return queryOptions<CountryFull>({
		queryKey: ["countries", countryCCA2],
		queryFn: ({ signal }) =>
			COUNTRIES_API.query({
				fields: [
					"name",
					"capital",
					"currencies",
					"languages",
					"cca2",
					"region",
					"subregion",
					"maps",
				],
			})
				.options({ signal })
				.get(`/alpha/${countryCCA2}`) as Promise<CountryFull>,
	});
}

/**
 * Get country by cca2 query
 */
export function useCountry(countryCCA2: string) {
	return useQuery(getCountryQueryOptions(countryCCA2));
}
