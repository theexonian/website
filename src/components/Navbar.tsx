import Image from "next/image";

export default function Navbar() {
	return (
		<>
			<div className="w-screen h-auto bg-gradient-to-r from-[#8d2931] to-[#e0303f] text-white flex justify-between px-14 py-1 text-xs font-bold">
				<p>
					Phillips Exeter Academy
				</p>
				<p>
					About The Exonian
				</p>
			</div>
			<div className="flex justify-center items-center flex-col w-full h-auto">
				<div className="w-1/4 py-3">
					{/* TODO: Optimize responsive scaling of the the logo */}
					<Image
						src={"/Exonian-logo.png"}
						width="0"
						height="0"
						sizes="25vw"
						className="w-full h-auto"
						alt={"Logo of The Exonian"}
					/>
				</div>
				<div className="flex text-sm">Wednesday, July 5th, 2023</div>
				<ul className="flex flex-row font-medium gap-8 py-2">
					<li>Home</li>
					<li>News</li>
					<li>Life</li>
					<li>Opinions</li>
					<li>Sports</li>
					<li>Humor</li>
					<li>Crossword</li>
					<li>Archive</li>
				</ul>
			</div>
		</>
	);
}
