import { Fragment, useState, useEffect } from "react";
// COMPONENTS
import Input from "~/components/Input";
// PLUGINS
import useOnClickOutside from "react-cool-onclickoutside";
import { Transition } from "@headlessui/react";

export default function InputLocations({ defaultValue, value, required, locations = [], onChange = () => {} }) {
	const [items, setItems] = useState(locations);
	const [showDropdown, setShowDropdown] = useState(false);
	const [inputValue, setInputValue] = useState(defaultValue || value);
	const [selectedValue, setSelectedValue] = useState(defaultValue || value);
	const [transitionDropdown, setTransitionDropdown] = useState(true);
	const dropdownRef = useOnClickOutside(() => setShowDropdown(false));

	const openDropdown = () => {
		setShowDropdown(true);
		setTransitionDropdown(true);
		setItems(locations);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		const updatedItems = locations.filter((item) => (value ? item.toLowerCase().includes(value.toLowerCase()) : item));

		setInputValue(value);
		setItems(updatedItems);
	};

	const handleSelectedValue = (selectedValue) => {
		onChange(selectedValue);
		setInputValue(selectedValue);
		setSelectedValue(selectedValue);
		setTransitionDropdown(false);
		setShowDropdown(false);
	};

	const handleResetValue = () => {
		setInputValue("");
		onChange("");
	};

	useEffect(() => {
		if (!inputValue) setSelectedValue("");
	}, [inputValue]);

	return (
		<div ref={dropdownRef} className="relative !w-full !h-14 md:flex-1">
			<Input
				className="!w-full !h-14 shadow-none !rounded-none !rounded-t-2xl md:flex-1 md:!rounded-none md:!rounded-l-2xl"
				defaultValue={defaultValue}
				id="location"
				label="Location"
				required={required}
				value={inputValue}
				onChange={handleInputChange}
				onFocus={openDropdown}
				onReset={handleResetValue}
			/>

			<Transition
				as={Fragment}
				enter={transitionDropdown ? `duration-[400ms]` : ""}
				enterFrom="max-h-0 py-0"
				enterTo="max-h-[240px] py-2"
				entered="max-h-[240px] py-2 overflow-y-auto"
				leave={transitionDropdown ? `duration-[400ms]` : ""}
				leaveFrom="max-h-[240px] py-2"
				leaveTo="max-h-0 py-0"
				show={showDropdown}
			>
				<div className="absolute top-full w-full z-50 text-[#4f4f4f] py-2 space-y-4 overflow-hidden rounded-b-2xl shadow bg-white">
					{items.length ? (
						items.map((item, index) => (
							<div
								key={index}
								className={`flex items-center cursor-pointer py-2 gap-1 rounded hover:bg-[#394753] hover:bg-opacity-75 ${
									selectedValue === item ? "bg-[#394753] text-white" : "hover:text-white"
								}`}
								onClick={() => handleSelectedValue(item)}
							>
								<i className="material-icons ml-4">place</i>
								<p>{item}</p>
							</div>
						))
					) : (
						<p className="text-center ml-6">No results found</p>
					)}
				</div>
			</Transition>
		</div>
	);
}
