import type React from "react";
import {
	Card,
	Flex,
	Grid,
	Heading,
	Separator,
	Skeleton,
	Text,
} from "@radix-ui/themes";
import { useCountry } from "../../entities/country/model";

type CountryCardProps = {
	countryName: string;
};

const CountryCard: React.FC<CountryCardProps> = ({ countryName }) => {
	const { isLoading, data, isError, error } = useCountry(countryName);

	return isError || (!isLoading && !data) ? (
		<Card>
			<Heading size="6">Error</Heading>
			<Text>{error?.message || "Data not found"}</Text>
		</Card>
	) : (
		<Card>
			<Skeleton loading={isLoading}>
				<Heading size="6">{data?.name.common}</Heading>
			</Skeleton>
			<Separator my="2" size="4" />
			<Grid columns="auto 1fr" gapY="2" gapX="4">
				{/* Official name */}
				<Text size="4">Official:</Text>
				<Skeleton loading={isLoading}>
					<Heading size="4">
						{data?.name.official} ({data?.cca2})
					</Heading>
				</Skeleton>
				{/* Capital */}
				<Text size="4">Capital:</Text>
				<Skeleton loading={isLoading}>
					<Heading size="4">{data?.capital?.join(", ")}</Heading>
				</Skeleton>
				{/* Languages */}
				<Text size="4">Languages:</Text>
				<Skeleton loading={isLoading}>
					<Heading size="4">
						{Object.values(data?.languages || {}).join(", ")}
					</Heading>
				</Skeleton>
				{/* Currencies */}
				<Text size="4">Currencies:</Text>
				<Skeleton loading={isLoading}>
					<Heading size="4">
						{Object.entries(data?.currencies || {})
							.map(([currency, value]) => `${value.name} (${currency})`)
							.join(", ")}
					</Heading>
				</Skeleton>
			</Grid>
		</Card>
	);
};

export default CountryCard;
