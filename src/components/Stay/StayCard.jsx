// PLUGINS
import classNames from "clsx";

export default function StayCard({ className, photo, superHost, type, beds, rating, title }) {
	const _className = classNames("w-[395px]", className);

	return (
		<div className={_className}>
			<div className="rounded-3xl overflow-hidden">
				<img
					alt={title}
					className="w-full max-w-full h-60 md:h-[270px] object-cover transform hover:scale-105 transition-transform ease-in duration-[300ms]"
					src={photo}
				/>
			</div>

			<div className="mt-4 text-xs text-[#4F4F4F] flex items-center gap-x-3">
				{superHost && (
					<div className="w-[100px] h-7 border border-[#4F4F4F] rounded-xl">
						<p className="uppercase  text-center font-bold leading-[28px]">Super host</p>
					</div>
				)}

				{type && (
					<p className="text-xs text-[#828282]">
						{type} {beds && <span>. {`${beds} ${beds === 0 || beds > 1 ? "beds" : "bed"}`}</span>}
					</p>
				)}

				{rating && (
					<div className="flex items-center gap-x-1 ml-auto">
						<i className="material-icons w-6 text-[#EB5757] text-opacity-70">star</i>
						<span>{rating}</span>
					</div>
				)}
			</div>

			{title && <h3 className="mt-[18px]">{title}</h3>}
		</div>
	);
}
