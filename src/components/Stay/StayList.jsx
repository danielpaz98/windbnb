import { memo } from "react";
// PLUGINS
import classNames from "clsx";
// COMPONENTS
import StayCard from "./StayCard";
// CUSTOM HOOKS
import { usePagination } from "./hooks";

export default memo(function StayList({ items = [], itemsPerPage = 6 }) {
	const { data } = usePagination({ items, itemsPerPage });

	const stayListClass = classNames(
		"flex flex-wrap gap-x-8 gap-y-12",
		itemsPerPage <= 2 ? "justify-center" : "justify-center 1290px:justify-start"
	);

	return (
		<>
			{data.map(({ city, stays, totalStays, disabledBtnPrev, disabledBtnNext, methods }, index) => (
				<div key={city}>
					<div className="flex justify-between mt-16">
						<h1>Stays in {city}</h1>
						<p className="text-sm self-center">{`${totalStays} ${
							totalStays === 0 || totalStays > 1 ? "stays" : "stay"
						}`}</p>
					</div>

					<div className="flex justify-center my-5">
						{(!disabledBtnPrev || !disabledBtnNext) && (
							<div className="flex gap-4">
								<button
									className="flex bg-[#EB5757] text-white py-2 px-5 rounded-md disabled:opacity-50 disabled:pointer-events-none"
									disabled={disabledBtnPrev}
									title="Previous Page"
									type="text"
									onClick={methods.previousPage}
								>
									<i className="material-icons">navigate_before</i>
								</button>

								<button
									className="flex bg-[#EB5757] text-white py-2 px-5 rounded-md disabled:opacity-50 disabled:pointer-events-none"
									disabled={disabledBtnNext}
									title="Next Page"
									type="text"
									onClick={methods.nextPage}
								>
									<i className="material-icons">navigate_next</i>
								</button>
							</div>
						)}
					</div>

					<div className={stayListClass}>
						{stays.map(({ id, photo, superHost, type, beds, rating, title }) => (
							<StayCard
								key={id}
								beds={beds}
								className="animate-fadeIn"
								photo={photo}
								rating={rating}
								superHost={superHost}
								title={title}
								type={type}
							/>
						))}
					</div>
				</div>
			))}
		</>
	);
});
