import { useCountries } from "../../entities/country/model";
import CountryList from "./country-list";
import { render, screen, userEvent } from "../../test/test-utils";
import { beforeEach, describe, it, type Mock, vi } from "vitest";
import MOCKED_COUNTRIES from "./countries.mock.json";

vi.mock("../../entities/country/model", () => ({
	useCountries: vi.fn(),
}));

const mockedUseCountries = useCountries as Mock<
	[],
	Partial<ReturnType<typeof useCountries>>
>;

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
