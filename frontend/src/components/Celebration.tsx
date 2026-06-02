import Link from "next/link";

export default function Celebration() {
	return (
		<Link href="https://secure.touchnet.com/C25385_ustores/web/product_detail.jsp?PRODUCTID=566" target="_blank" className="block">
			<div className="mt-6 mb-2 mr-3 rounded-xl px-4 pt-4 pb-2">
				<div className="flex items-center gap-5 sm:flex-col sm:items-start sm:gap-3">
					<div className="min-w-0 flex-1">
						<p className="mb-1 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-red-700">Class of 2026 Graduation</p>
						<h2 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-xl">Pre-Order our Graduation Issue</h2>
						<p className="text-md text-muted-foreground">Get featured coverage from the full year, all senior of the year pieces, and more. $30 per copy.</p>
					</div>
					<span className="rounded-xl px-3 py-[.5rem] shrink-0 font-sans text-sm font-bold bg-[#B43030] text-white transition-colors hover:text-[#E0E0E0]">Reserve a Copy </span>
				</div>
			</div>
		</Link>
	);
}
