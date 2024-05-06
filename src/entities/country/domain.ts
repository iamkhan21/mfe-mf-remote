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

export type CountryBase = {
	name: CountryName;
	cca2: string;
};

export type CountryFull = CountryBase & {
	currencies: Record<string, CountryCurrency>;
	capital: Array<string>;
	languages: Record<string, string>;
};
