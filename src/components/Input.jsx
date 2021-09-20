import { Fragment } from "react";
// PLUGINS
import classNames from "clsx";
import { Transition } from "@headlessui/react";

export default function Input({
	id = Math.random().toString(16).slice(-4),
	className,
	label = "Label",
	placeholder,
	defaultValue,
	value,
	required,
	onChange = () => {},
	onFocus = () => {},
	onBlur = () => {},
	onKeyPress = () => {},
	onReset,
}) {
	const inputClass = classNames("relative w-52 h-12 font-mulish text-sm shadow rounded-2xl", className);
	const labelClass = classNames(
		"absolute top-4 left-7 transform -translate-y-2/4 pointer-events-none font-extrabold text-[9px] uppercase peer-focus:top-4 duration-300",
		{
			"peer-placeholder-shown:top-2/4": !placeholder,
		}
	);

	const handleOnChange = (e) => onChange(e);
	const handleOnFocus = (e) => onFocus(e);
	const handleOnBlur = (e) => onBlur(e);
	const handleOnkeyPress = (e) => onKeyPress(e);
	const handleOnReset = () => onReset();

	return (
		<div className={inputClass}>
			{/* INPUT */}
			<input
				className="peer w-full h-full pt-4 px-7 rounded-[inherit] outline-none focus:border focus:border-[#333333] duration-300"
				defaultValue={defaultValue}
				id={id}
				placeholder=" "
				required={required}
				type="text"
				value={value}
				onBlur={handleOnBlur}
				onChange={handleOnChange}
				onFocus={handleOnFocus}
				onKeyPress={handleOnkeyPress}
			/>

			{/* RESET BUTTON */}
			{Boolean(onReset) && (
				<Transition
					as={Fragment}
					enter="transition-opacity duration-300"
					enterFrom="opacity-0"
					leave="transition-opacity duration-300"
					leaveTo="opacity-0"
					show={Boolean(value)}
				>
					<button className="absolute top-[26px] right-2" type="button" onClick={handleOnReset}>
						<i className="material-icons">clear</i>
					</button>
				</Transition>
			)}

			{/* LABEL */}
			{label && (
				<label className={labelClass} htmlFor={id}>
					{label}
				</label>
			)}

			{/* PLACEHOLDER */}
			{placeholder && (
				<label
					className="absolute top-[26px] left-[29px] pointer-events-none	text-[#BDBDBD] hidden peer-placeholder-shown:inline-block"
					htmlFor="input"
				>
					{placeholder}
				</label>
			)}
		</div>
	);
}
