import Image from "next/image";

export default function PreviewCenter() {
	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<div className="">
				<Image
					src={"/Main.png"}
					width="0"
					height="0"
					sizes="25vw"
					className="w-full h-auto"
					alt={"Logo of The Exonian"}
				/>
			</div>
			<div className="max-w-[600px]">
				<div className="flex justify-between">
					<div className="">
						<h1 className="font-serif font-medium text-3xl py-2">
							The Exonian Board Proposes Placing Submission Boxes On The New Website
						</h1>
					</div>
				</div>
				<div className="py-3">
					<p className="text-xs text-[#4E4E4E]">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. At erat pellentesque adipiscing commodo
						elit at. Accumsan in nisl nisi scelerisque eu ultrices
						vitae auctor eu.
					</p>
				</div>
				<div className="">
					<p className="text-xs text-[#6C6C6C]">By: Byran Huang</p>
					<p className="text-xs text-[#6C6C6C]">10/12/23</p>
				</div>
			</div>
		</div>
	);
}
