import Link from "next/link";
import SlidingPhotoGallery from "@/components/SlidingPhotoGallery";

export default function Celebration() {
	return (
		<Link href="/grad" className="block">
			<div className="mt-6 mb-2 mr-3 rounded-xl px-4 pt-4 pb-2">
				<div className="flex items-center gap-7 sm:flex-col sm:items-start sm:gap-3">
					<div className="min-w-0 flex-1">
						<p className="font-bold text-red-700 inline-block text-xs leading-none uppercase">Class of 2026 Graduation</p>
						<h2 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-xl">Prom and Graduation Photo Gallery</h2>
						<p className="text-md text-muted-foreground">See exclusive picture highlights from graduation and prom. Check out the archives for the full graduation issue.</p>
					</div>
					<span className="rounded-xl px-3 py-[.5rem] shrink-0 font-sans text-sm font-bold bg-[#B43030] text-white transition-colors hover:text-[#E0E0E0]">Check it Out </span>
				</div>
				<div>
					<SlidingPhotoGallery slug="prom-grad-live" className="mt-5" maxLength={10} />
				</div>
			</div>
		</Link>
	);
}
