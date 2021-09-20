// COMPONENTS
import FilterDrawer from "~/components/FilterDrawer";

export default function Navbar() {
	return (
		<>
			<div className="flex flex-wrap justify-between items-center gap-10 h-16 mb-[90px]">
				<img alt="Main Logo" src="/logo.svg" />

				<FilterDrawer className="ml-auto mr-auto sm:m-0" />
			</div>
		</>
	);
}
