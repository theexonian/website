import Link from "next/link";

export default function Celebration() {
	return (
		<div className="mt-6 mb-3 mr-3 px-3 py-3">
			<div className="flex items-center gap-5 sm:flex-col sm:items-start sm:gap-3">
				<div className="min-w-0 flex-1">
					<p className="mb-2 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-red-700">Senior Celebration</p>
					<h2 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-xl">Celebrate our graduating seniors</h2>
				</div>
				<Link href="/grad" className="shrink-0 font-sans text-sm font-bold text-red-700 transition-colors hover:text-foreground">View Gallery</Link>
			</div>
		</div>
	);
}
