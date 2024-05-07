import React from "react";
import { useCountry } from "../../entities/country/model";
import { describe, expect, beforeEach, it, type Mock, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CountryCard from "./country-card";
import { type CountryFull, MAP_TYPE } from "../../entities/country/domain"; // Mock of useCountry query

// Mock of useCountry query
vi.mock("../../entities/country/model", () => ({
	useCountry: vi.fn(),
}));

const mockedUseCountry = useCountry as Mock<
	[string],
	Partial<ReturnType<typeof useCountry>>
>;

const MOCKED_COUNTRY_DATA: CountryFull = {
	name: {
		common: "Common name",
		official: "Official name",
		nativeName: {
			lng: {
				official: "Official native name",
				common: "Common native name",
			},
		},
	},
	cca2: "CCA2",
	currencies: {
		smb: {
			name: "Currency name",
			symbol: "Currency symbol",
		},
	},
	capital: ["Capital name"],
	languages: { l: "Language name" },
	region: "Region name",
	subregion: "Subregion name",
	maps: {
		googleMaps: "https://google.com",
		openStreetMaps: "https://openstreetmap.com",
	},
};

describe("<CountryCard />", () => {
	function setup(countryIsoCode = "BY") {
		render(<CountryCard countryIsoCode={countryIsoCode} />);
	}

	beforeEach(() => {
		mockedUseCountry.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			isError: false,
		});
	});

	it("should show loading skeletons", () => {
		setup();

		expect(screen.getByTestId("common-name-skeleton")).toBeInTheDocument();
		expect(screen.getByText(/official/i)).toBeInTheDocument();
		expect(screen.getByTestId("official-skeleton")).toBeInTheDocument();
		expect(screen.getByText(/capital/i)).toBeInTheDocument();
		expect(screen.getByTestId("capital-skeleton")).toBeInTheDocument();
		expect(screen.getByText(/languages/i)).toBeInTheDocument();
		expect(screen.getByTestId("languages-skeleton")).toBeInTheDocument();
		expect(screen.getByText(/currencies/i)).toBeInTheDocument();
		expect(screen.getByTestId("currencies-skeleton")).toBeInTheDocument();

		expect(screen.getByText(/maps/i)).toBeInTheDocument();
		expect(screen.getByTestId("maps-skeleton")).toBeInTheDocument();
		expect(screen.getByText(/region/i)).toBeInTheDocument();
		expect(screen.getByTestId("region-skeleton")).toBeInTheDocument();
	});

	it("should render without error", () => {
		mockedUseCountry.mockReturnValue({
			data: MOCKED_COUNTRY_DATA,
			isLoading: false,
			error: undefined,
			isError: false,
		});

		setup();

		expect(
			screen.getByText(new RegExp(MOCKED_COUNTRY_DATA.name.common, "i")),
		).toBeInTheDocument();
		expect(
			screen.getByText(new RegExp(MOCKED_COUNTRY_DATA.name.official, "i")),
		).toBeInTheDocument();
		expect(
			screen.getByText(new RegExp(MOCKED_COUNTRY_DATA.cca2, "i")),
		).toBeInTheDocument();

		for (const name of MOCKED_COUNTRY_DATA.capital) {
			expect(screen.getByText(new RegExp(name, "i"))).toBeInTheDocument();
		}

		for (const language of Object.values(MOCKED_COUNTRY_DATA.languages)) {
			expect(screen.getByText(new RegExp(language, "i"))).toBeInTheDocument();
		}

		for (const [symbol, { name }] of Object.entries(
			MOCKED_COUNTRY_DATA.currencies,
		)) {
			expect(screen.getByText(new RegExp(name, "i"))).toBeInTheDocument();
			expect(screen.getByText(new RegExp(symbol, "i"))).toBeInTheDocument();
		}

		expect(
			screen.getByText(new RegExp(MOCKED_COUNTRY_DATA.region, "i")),
		).toBeInTheDocument();
		expect(
			screen.getByText(new RegExp(MOCKED_COUNTRY_DATA.subregion, "i")),
		).toBeInTheDocument();

		for (const [key, value] of Object.entries(MOCKED_COUNTRY_DATA.maps)) {
			const link = screen.getByText(
				new RegExp(
					// @ts-ignore
					MAP_TYPE[key],
					"i",
				),
			);
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", value);
		}
	});

	it("should show error message in case of error", () => {
		const errorMessage = "Test Error message";

		mockedUseCountry.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: new Error(errorMessage),
			isError: true,
		});

		setup();

		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it('should show "Data not found" message in case of no data', () => {
		mockedUseCountry.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: undefined,
			isError: false,
		});

		setup();

		expect(screen.getByText(/data not found/i)).toBeInTheDocument();
	});
});
