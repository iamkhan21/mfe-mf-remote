type CountryName = {
	common: string;
	official: string;
	nativeName: Record<
		string,
		{
			official: string;
			common: string;
		}
	>;
};

type CountryCurrency = {
	name: string;
	symbol: string;
};

export const MAP_TYPE = {
	googleMaps: "Google Maps",
	openStreetMaps: "Open Street Maps",
} as const;

export type CountryBase = {
	name: CountryName;
	cca2: string;
	region: string;
	subregion: string;
};

export type CountryFull = CountryBase & {
	currencies: Record<string, CountryCurrency>;
	capital: Array<string>;
	languages: Record<string, string>;
	maps: Record<keyof typeof MAP_TYPE, string>;
};
