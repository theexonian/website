import Image from "next/image";
import PathAnimation from '@/components/PathAnimation'
import 'animate.css';

export default function Navbar() {
	return (
		<>
			<div className="w-screen h-auto items-center min-h-[35px] bg-gradient-to-r from-[#000000] to-[#000000] text-white flex justify-between px-14 py-1 text-xs font-bold">
				<p>
					Phillips Exeter Academy
				</p>
				<p>
					Subscribe | About
				</p>
			</div>
			<div className="flex justify-center items-center flex-col w-full h-auto">
				{/* <PathAnimation animated={true}/> */}
				<div className="w-1/4 py-3">
					{/* TODO: Optimize responsive scaling of the the logo */}
					<a href="/">
						<Image
							src={"/Exonian-logo.png"}
							width="0"
							height="0"
							sizes="25vw"
							className="w-full h-auto"
							alt={"Logo of The Exonian"}
						/>
					</a>
				</div>
				<div className="flex text-sm">Sunday, Dec 17th, 2023</div>
				<ul className="flex flex-row font-medium gap-8 py-2">
					<a href="">
						<li>Home</li>
					</a>
					<a href="">
						<li>News</li>
					</a>
					<a href="">
						<li>Life</li>
					</a>
					<a href="">
						<li>Opinions</li>
					</a>
					<a href="">
						<li>Sports</li>
					</a>
					<a href="">
						<li>Humor</li>
					</a>
					<a href="https://crossword.theexonian.net">
						<li>Crossword</li>
					</a>
					<a href="">
						<li>Archive</li>
					</a>
				</ul>
			</div>
		</>
	);
}
