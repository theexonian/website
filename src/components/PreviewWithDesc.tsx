import Image from "next/image";

export default function PreviewWithDesc() {
	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<a href="">
				<div className="flex justify-between">
					<div className="">
						<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
							Life
						</h3>
						<h1 className="font-serif font-medium text-xl py-2 hover:text-neutral-600 duration-200">
							Ah, I See That You Are Reading This
						</h1>
					</div>
				</div>
				<div className="py-3">
					<p className="text-xs text-[#4E4E4E] hover:text-neutral-500 duration-200">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. At erat pellentesque adipiscing commodo
						elit at. Accumsan in nisl nisi scelerisque eu ultrices
						vitae auctor eu.
					</p>
				</div>
			</a>
			<div className="">
				<p className="text-xs text-[#6C6C6C] duration-200">
					By:&nbsp;
					<a
						href=""
						className="hover:bg-gradient-to-r hover:from-[#B40A0A] hover:to-[#f71e1e] inline-block hover:text-transparent hover:bg-clip-text"
					>
						Byran Huang
					</a>
				</p>
				<p className="text-xs text-[#6C6C6C]">10/12/23</p>
			</div>
		</div>
	);
}
