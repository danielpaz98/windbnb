import { createContext, useState } from "react";

const SearcherContext = createContext({});

export function SearcherContextProvider({ children }) {
	const [search, setSearch] = useState({ location: "Helsinki, Finland", maxGuests: {} });

	return <SearcherContext.Provider value={{ search, setSearch }}>{children}</SearcherContext.Provider>;
}

export default SearcherContext;
