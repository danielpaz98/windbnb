import { Fragment } from "react";
// PLUGINS
import classNames from "clsx";
import { Transition } from "@headlessui/react";

export default function Overlay({ className, show, onClick = () => {} }) {
	const _className = classNames("fixed w-full min-h-[100vh] z-40 opacity-50 top-0 left-0 bg-[#4f4f4f]", className);

	return (
		<Transition
			as={Fragment}
			enter="transition-opacity duration-200"
			enterFrom="opacity-0"
			leave="transition-opacity duration-300"
			leaveTo="opacity-0"
			show={show}
		>
			<div className={_className} onClick={onClick} />
		</Transition>
	);
}
