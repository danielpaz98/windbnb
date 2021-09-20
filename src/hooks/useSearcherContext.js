import { useContext } from "react";

// CONTEXTS
import SearcherContext from "~/contexts/SearcherContext";

export function useSearcherContext() {
	const { search, setSearch } = useContext(SearcherContext);

	const updateSearch = (newSearch) => setSearch(newSearch);

	return {
		search,
		updateSearch,
	};
}
