import type React from "react";
import { Box, Card, Heading, Skeleton, Table, Text } from "@radix-ui/themes";
import { useCountries } from "../../entities/country/model";

type CountryListProps = {
	onCountryClick: (countryCCA2: string) => void;
};

const CountryList: React.FC<CountryListProps> = (props) => {
	const { data, isLoading, error, isError } = useCountries();

	return isError || (!isLoading && !data) ? (
		<Card>
			<Heading size="6">Error</Heading>
			<Text>{error?.message || "Data not found"}</Text>
		</Card>
	) : (
		<Box maxHeight="350px" overflowY="auto">
			<Table.Root variant="surface" layout="fixed">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Official name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Common name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>ISO code</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{isLoading ? (
						<>
							<TableRowSkeleton />
							<TableRowSkeleton />
							<TableRowSkeleton />
						</>
					) : (
						data?.map((country) => (
							<Table.Row
								key={country.cca2}
								onClick={() => props.onCountryClick(country.cca2)}
							>
								<Table.Cell>{country.name.official}</Table.Cell>
								<Table.Cell>{country.name.common}</Table.Cell>
								<Table.Cell>{country.cca2}</Table.Cell>
							</Table.Row>
						))
					)}
				</Table.Body>
			</Table.Root>
		</Box>
	);
};

export default CountryList;

const TableRowSkeleton = () => (
	<Table.Row>
		<Table.Cell>
			<Skeleton>Official country name</Skeleton>
		</Table.Cell>
		<Table.Cell>
			<Skeleton>Common country name</Skeleton>
		</Table.Cell>
		<Table.Cell>
			<Skeleton>Country ISO code</Skeleton>
		</Table.Cell>
	</Table.Row>
);
