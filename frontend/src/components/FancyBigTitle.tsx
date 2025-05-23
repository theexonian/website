export default function FancyBigTitle({
	title,
	lowerText,
}: {
	title: string;
	lowerText?: string;
}) {
	if (!lowerText) {
		return (
			<div className="font-serif py-5">
			<h1 className="text-6xl md:text-3xl font-semibold -my-2">{title}</h1>
			</div>
		);
	} else {
		return (
			<div className="font-serif py-5">
				<h1 className="text-6xl md:text-3xl font-semibold -my-2">{title}</h1>
				<div className="py-1"></div>
				<h1><i>{lowerText}</i></h1>
			</div>
		);
	}
}
