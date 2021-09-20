import { useState } from "react";

export function usePagination({ items, itemsPerPage }) {
	const [currentPage, setCurrentPage] = useState(Array(items.length).fill(0));

	const data = items.map(({ city, stays }, index) => ({
		city,
		totalStays: stays.length,
		stays: stays.slice(currentPage[index], currentPage[index] + itemsPerPage),
		disabledBtnPrev: currentPage[index] === 0,
		disabledBtnNext: currentPage[index] + itemsPerPage >= stays.length,
		methods: {
			nextPage: () => setCurrentPage([...currentPage].fill(currentPage[index] + itemsPerPage, index, index + 1)),
			previousPage: () => setCurrentPage([...currentPage].fill(currentPage[index] - itemsPerPage, index, index + 1)),
		},
	}));

	return { data };
}
