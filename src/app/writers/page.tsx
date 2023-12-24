import { MdOutlineEmail } from "react-icons/md";
import RowPreview from "@/components/RowPreview";

export default function Page() {
	return (
		<>
			<div className="w-full flex justify-center py-8">
				<div className="bg-clip-border bg-center bg-no-repeat rounded-full w-24 h-24 bg-[url('/Filler.png')]"></div>
			</div>
			<div className="w-full flex justify-center font-serif text-4xl font-semibold">
				<h1>Amy Lin</h1>
			</div>
			<div className="w-full flex justify-center font-sans text-md items-center text-neutral-600 font-light">
				<p>Director of Writing</p>
				<div className="p-2 font-xl">
					<MdOutlineEmail />
				</div>
			</div>
			<div className="w-full flex justify-center font-serif text-neutral-500 font-thin">
				<div className="w-1/2 text-center">
					<p>
						Esse culpa labore tempor minim culpa dolor. Exercitation
						tempor esse aliquip adipisicing dolor anim aliqua labore
						sint. Labore Lorem elit culpa ad ipsum velit consequat
						proident velit tempor velit ullamco commodo. Elit nulla
						enim in non proident. Incididunt aliqua ex aute laborum
						aute deserunt duis nostrud nostrud adipisicing sunt
						enim.
					</p>
				</div>
			</div>
			<div className="w-3/4 flex flex-col justify-center font-serif py-10">
				<hr className="border-black w-1/2" />
				<h1 className="text-2xl font-semibold">Latest Articles</h1>
				<RowPreview />
				<RowPreview />
				<RowPreview />
				<RowPreview />
				<RowPreview />
			</div>
		</>
	);
}
