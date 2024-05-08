import {
	type QueryClient,
	queryOptions,
	useQuery,
} from "@tanstack/react-query";
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
export function getCountryQueryOptions(
	countryCCA2: string,
	queryClient: QueryClient,
) {
	return queryOptions<CountryBase, Error, CountryFull>({
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
		placeholderData: () =>
			queryClient
				.getQueryData(getCountriesQueryOptions().queryKey)
				?.find((country) => country.cca2 === countryCCA2),
	});
}

/**
 * Get country by cca2 query
 */
export function useCountry(countryCCA2: string, queryClient: QueryClient) {
	return useQuery(getCountryQueryOptions(countryCCA2, queryClient));
}
