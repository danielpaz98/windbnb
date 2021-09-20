// DATA
import data from "~/data/stays.json";
// PLUGINS
import groupBy from "just-group-by";

export function getStays({ search } = {}) {
	const groupedData = Object.entries(groupBy(data, ({ country, city }) => [`${city}, ${country}`])).map(
		([city, stays]) => ({ city, stays })
	);

	if (search?.location) {
		const totalGuests = Object.values(search?.maxGuests).reduce((prev, curr) => prev + curr, 0);

		const filteredData = groupedData
			.filter(({ city }) => city === search.location)
			.map(({ city, stays }) => ({
				city,
				stays: totalGuests ? stays.filter(({ maxGuests }) => totalGuests <= maxGuests) : stays,
			}));

		return filteredData;
	}

	return groupedData;
}
