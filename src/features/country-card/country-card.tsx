import type React from "react";
import {
	Card,
	Flex,
	Grid,
	Heading,
	Link,
	Separator,
	Skeleton,
	Text,
} from "@radix-ui/themes";
import { useCountry } from "../../entities/country/model";
import { MAP_TYPE } from "../../entities/country/domain";

type CountryCardProps = {
	countryIsoCode: string;
};

const CountryCard: React.FC<CountryCardProps> = ({ countryIsoCode }) => {
	const { isLoading, data, isError, error } = useCountry(countryIsoCode);

	return isError || (!isLoading && !data) ? (
		<Card>
			<Heading size="6">Error</Heading>
			<Text>{error?.message || "Data not found"}</Text>
		</Card>
	) : (
		<Card>
			<Skeleton loading={isLoading} data-testid="common-name-skeleton">
				<Heading as="h3" size="6">
					{data?.name.common}
				</Heading>
			</Skeleton>
			<Separator my="2" size="4" />
			<Grid columns="auto 1fr" gapY="2" gapX="4">
				{/* Official name */}
				<Text size="4">Official:</Text>
				<Skeleton loading={isLoading} data-testid="official-skeleton">
					<Text size="4" weight="bold">
						{data?.name.official} ({data?.cca2})
					</Text>
				</Skeleton>
				{/* Capital */}
				<Text size="4">Capital:</Text>
				<Skeleton loading={isLoading} data-testid="capital-skeleton">
					<Text size="4" weight="bold">
						{data?.capital?.join(", ")}
					</Text>
				</Skeleton>
				{/* Languages */}
				<Text size="4">Languages:</Text>
				<Skeleton loading={isLoading} data-testid="languages-skeleton">
					<Text size="4" weight="bold">
						{Object.values(data?.languages || {}).join(", ")}
					</Text>
				</Skeleton>
				{/* Currencies */}
				<Text size="4">Currencies:</Text>
				<Skeleton loading={isLoading} data-testid="currencies-skeleton">
					<Text size="4" weight="bold">
						{Object.entries(data?.currencies || {})
							.map(([currency, value]) => `${value.name} (${currency})`)
							.join(", ")}
					</Text>
				</Skeleton>
				{/* Region */}
				<Text size="4">Region:</Text>
				<Skeleton loading={isLoading} data-testid="region-skeleton">
					<Text size="4" weight="bold">
						{data?.region}, {data?.subregion}
					</Text>
				</Skeleton>
				{/* Maps */}
				<Text size="4">Maps:</Text>
				<Skeleton loading={isLoading} data-testid="maps-skeleton">
					<Flex gap="4">
						{Object.entries(data?.maps || {}).map(([key, value]) => (
							<Link href={value} key={key} target="_blank">
								{
									// @ts-ignore
									MAP_TYPE[key]
								}
							</Link>
						))}
					</Flex>
				</Skeleton>
			</Grid>
		</Card>
	);
};

export default CountryCard;
