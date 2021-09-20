import { Fragment, useState } from "react";
// COMPONENTS
import Input from "~/components/Input";
// PLUGINS
import useOnClickOutside from "react-cool-onclickoutside";
import { Transition } from "@headlessui/react";

export default function InputGuest({ defaultValue, value, required, categories = [], onChange = () => {} }) {
	const [showDropdown, setShowDropdown] = useState(false);
	const initialValues = categories.reduce((obj, { title }) => ({ ...obj, [title]: 0 }), {});
	const _values = Object.values(value).length ? value : initialValues;
	const [values, setValues] = useState(_values);

	const accumValue = Object.values(values).reduce((prev, curr) => prev + curr, 0);
	const dropdownRef = useOnClickOutside(() => setShowDropdown(false));

	const handleUpdateValue = (newValue) => {
		const updatedValues = { ...values, ...newValue };

		onChange(updatedValues);
		setValues(updatedValues);
	};

	const handleResetValue = () => {
		setValues(initialValues);
		onChange({});
	};

	return (
		<div ref={dropdownRef} className="relative !w-full !h-14 md:flex-1">
			<Input
				className="!w-[inherit] !h-[inherit] shadow-none !rounded-none !rounded-b-2xl md:!rounded-none"
				defaultValue={defaultValue}
				id="guests"
				label="Guests"
				placeholder="Add guests"
				required={required}
				value={accumValue > 0 ? `${accumValue} guests` : ""}
				onFocus={() => setShowDropdown(true)}
				onKeyPress={(e) => e.preventDefault()}
				onReset={handleResetValue}
			/>

			<Transition
				as={Fragment}
				enter="duration-[400ms]"
				enterFrom="max-h-0 p-0"
				enterTo="max-h-[240px] p-2"
				entered="max-h-[240px] p-2 overflow-y-auto"
				leave="duration-[400ms]"
				leaveFrom="max-h-[240px] p-2"
				leaveTo="max-h-0 p-0"
				show={showDropdown}
			>
				<div
					className={`flex flex-wrap gap-x-12 gap-y-4 absolute top-full w-full z-50 overflow-hidden rounded-b-2xl shadow bg-white ${
						categories.length > 1 ? "justify-around" : "justify-center"
					}`}
				>
					{categories.map(({ title, description }, index) => (
						<div key={index} className="text-center p-2">
							<h3 className="font-bold text-sm">{title}</h3>
							<p className="text-[#BDBDBD]">{description}</p>

							<div className="flex justify-center items-center gap-[14px] mt-3">
								<button
									className="flex justify-center items-center h-6 w-6 border border-gray-400 rounded text-sm disabled:opacity-50 disabled:pointer-events-none"
									disabled={values[title] === 0}
									type="button"
									onClick={() => handleUpdateValue({ [title]: values[title] - 1 })} // DECREMENT
								>
									<i className="material-icons text-gray-400 text-sm">remove</i>
								</button>

								<span className="font-bold">{values[title]}</span>

								<button
									className="flex justify-center items-center h-6 w-6 border border-gray-400 rounded text-sm"
									type="button"
									onClick={() => handleUpdateValue({ [title]: values[title] + 1 })} // INCREMENT
								>
									<i className="material-icons text-gray-400 text-sm">add</i>
								</button>
							</div>
						</div>
					))}
				</div>
			</Transition>
		</div>
	);
}
