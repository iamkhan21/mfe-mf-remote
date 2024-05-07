import { useCountries } from "../../entities/country/model";
import CountryList from "./country-list";
import { render, screen, userEvent } from "../../test/test-utils";
import { beforeEach, describe, it, type Mock, vi } from "vitest";
import type { CountryBase } from "../../entities/country/domain";

vi.mock("../../entities/country/model", () => ({
	useCountries: vi.fn(),
}));

const mockedUseCountries = useCountries as Mock<
	[],
	Partial<ReturnType<typeof useCountries>>
>;

const MOCKED_COUNTRIES: Array<CountryBase> = [
	{
		name: {
			common: "Common name 1",
			official: "Official name 1",
			nativeName: {
				lng: {
					official: "Official native name 1",
					common: "Common native name 1",
				},
			},
		},
		cca2: "CCA21",
		region: "Region name 1",
		subregion: "Subregion name 1",
	},
	{
		name: {
			common: "Common name 2",
			official: "Official name 2",
			nativeName: {
				lng: {
					official: "Official native name 2",
					common: "Common native name 2",
				},
			},
		},
		cca2: "CCA22",
		region: "Region name 2",
		subregion: "Subregion name 2",
	},
	{
		name: {
			common: "Common name 3",
			official: "Official name 3",
			nativeName: {
				lng: {
					official: "Official native name 3",
					common: "Common native name 3",
				},
			},
		},
		cca2: "CCA23",
		region: "Region name 3",
		subregion: "Subregion name 3",
	},
];

describe("<CountryList />", () => {
	function setup(handleCountryClick = vi.fn()) {
		const user = userEvent.setup();

		render(<CountryList onCountryClick={handleCountryClick} />);

		return {
			clickCountry: (country: string) =>
				user.click(screen.getByText(new RegExp(country, "i"))),
		};
	}

	beforeEach(() => {
		mockedUseCountries.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			isError: false,
		});
	});

	it("should show skeletons when loading", () => {
		setup();

		expect(screen.getAllByTestId("row-skeleton")).toHaveLength(5);
	});

	it("should render card with error message in case of error", () => {
		const errorMessage = "Test Error message";

		mockedUseCountries.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: new Error(errorMessage),
			isError: true,
		});

		setup();

		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it('should render card with "Data not found" message in case of no data', () => {
		mockedUseCountries.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: undefined,
			isError: false,
		});

		setup();

		expect(screen.getByText(/data not found/i)).toBeInTheDocument();
	});

	it("should render table with countries", () => {
		mockedUseCountries.mockReturnValue({
			data: MOCKED_COUNTRIES,
			isLoading: false,
			error: undefined,
			isError: false,
		});

		setup();

		for (const country of MOCKED_COUNTRIES) {
			expect(
				screen.getByText(new RegExp(country.name.official, "i")),
			).toBeInTheDocument();
			expect(
				screen.getByText(new RegExp(country.name.common, "i")),
			).toBeInTheDocument();
			expect(
				screen.getByText(new RegExp(country.cca2, "i")),
			).toBeInTheDocument();
			expect(
				screen.getByText(new RegExp(country.region, "i")),
			).toBeInTheDocument();
			expect(
				screen.getByText(new RegExp(country.subregion, "i")),
			).toBeInTheDocument();
		}
	});

	it("should call onCountryClick handler when country is clicked", async () => {
		const handleCountryClick = vi.fn();

		mockedUseCountries.mockReturnValue({
			data: MOCKED_COUNTRIES,
			isLoading: false,
			error: undefined,
			isError: false,
		});

		const { clickCountry } = setup(handleCountryClick);

		for (const country of MOCKED_COUNTRIES) {
			await clickCountry(country.name.official);

			expect(handleCountryClick).toBeCalledWith(country.cca2);
		}
	});
});
