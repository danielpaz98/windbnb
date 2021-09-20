import { Fragment, useState } from "react";
// PLUGINS
import classNames from "clsx";
import { Transition } from "@headlessui/react";
// COMPONENTS
import Overlay from "~/components/Overlay";
import InputLocation from "./InputLocation";
import InputGuest from "./InputGuest";
// HOOKS
import { useSearcherContext } from "~/hooks";
// SERVICES
import { getStays } from "~/services";
// DATA
import categoriesGuest from "~/data/categories.json";

export default function FilterDrawer({ className }) {
	const _className = classNames("filter-drawer", className);
	const locations = getStays().map(({ city }) => city);

	const [showDrawer, setShowDrawer] = useState(false);
	const [transitionDrawer, setTransitionDrawer] = useState(true);
	const { search, updateSearch } = useSearcherContext();
	const [value, setValue] = useState(search); // initial value: Helsinki, Finland
	const totalGuests = Object.values(search.maxGuests).reduce((prev, curr) => prev + curr, 0);

	const toggleShowDrawer = ({ transition = true } = {}) => {
		setTransitionDrawer(true);
		setShowDrawer((currState) => !currState);
		if (!transition) setTransitionDrawer(false);
	};

	const handleUpdateSearch = (newSearch) => {
		setValue((currSearch) => ({ ...currSearch, ...newSearch }));
	};

	const searchStays = (e) => {
		e.preventDefault();
		updateSearch(value);
		toggleShowDrawer({ transition: false });
	};

	return (
		<div className={_className}>
			{/* SEARCH BUTTON */}
			<Transition
				as={Fragment}
				enter="transition-opacity duration-[400ms]"
				enterFrom="opacity-0"
				leave="transition-opacity duration-[400ms]"
				leaveTo="opacity-0"
				show={!showDrawer}
			>
				<div className="group shadow rounded-2xl">
					<div className="font-mulish text-sm flex justify-between items-center divide-x divide-[#F2F2F2] space-4">
						<p className="p-4 duration-300">{search.location}</p>
						<p className="p-4 duration-300 text-[#BDBDBD]">{totalGuests ? `${totalGuests} guests` : "Add guests"}</p>

						<button type="button" onClick={toggleShowDrawer}>
							<i className="material-icons p-4 text-[#EB5757] text-opacity-90">search</i>
						</button>
					</div>
				</div>
			</Transition>

			{/* DRAWER */}
			<Transition
				as={Fragment}
				enter={transitionDrawer ? "transition-transform ease-in-out duration-[400ms]" : ""}
				enterFrom="transform scale-0"
				leave={transitionDrawer ? "transition-transform duration-[400ms]" : ""}
				leaveTo="transform scale-0"
				show={showDrawer}
			>
				<form
					autoComplete="off"
					className="flex flex-col fixed top-0 left-0 z-50 shadow p-3 pb-6 w-full min-h-[85vh] bg-white md:min-h-[50vh] md:justify-start"
					onSubmit={searchStays}
				>
					<button className="self-end" type="button" onClick={toggleShowDrawer}>
						<i className="material-icons">close</i>
					</button>

					<div className="flex flex-wrap w-full max-w-[1248px] ml-auto mr-auto mt-1 md:mt-12 shadow divide-y md:divide-y-0 md:divide-x rounded-2xl font-mulish text-sm">
						<InputLocation
							required
							locations={locations}
							value={search.location}
							onChange={(value) => handleUpdateSearch({ location: value })}
						/>

						<InputGuest
							categories={categoriesGuest}
							value={search.maxGuests}
							onChange={(value) => handleUpdateSearch({ maxGuests: value })}
						/>

						{/* DESKTOP BUTTON */}
						<div className="flex-1 hidden md:flex items-center justify-center rounded-r-2xl duration-300 focus-within:!border focus-within:border-[#333333]">
							<button
								className="flex items-center gap-2 rounded-2xl py-3 px-6 bg-[#EB5757] bg-opacity-90	text-white focus:bg-[#EB5757] hover:bg-[#EB5757] transition duration-300"
								type="submit"
							>
								<i className="material-icons">search</i>
								<span>Search</span>
							</button>
						</div>
					</div>

					{/* MOBILE BUTTON */}
					<div className="flex items-center justify-center w-full mt-auto rounded-r-2xl duration-300 md:hidden">
						<button
							className="flex items-center gap-2 rounded-2xl py-3 px-6 bg-[#EB5757] bg-opacity-90	 text-white focus:bg-[#EB5757] hover:bg-[#EB5757] transition duration-300"
							type="submit"
						>
							<i className="material-icons">search</i>
							<span>Search</span>
						</button>
					</div>
				</form>
			</Transition>

			{/* OVERLAY */}
			<Overlay show={showDrawer} onClick={toggleShowDrawer} />
		</div>
	);
}
