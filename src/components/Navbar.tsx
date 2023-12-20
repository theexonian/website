import Image from "next/image";
import PathAnimation from '@/components/PathAnimation'
import 'animate.css';

export default function Navbar() {
	return (
		<>
			<div className="w-screen h-auto items-center min-h-[35px] bg-gradient-to-r from-[#000000] to-[#000000] text-white flex justify-between px-14 py-1 text-xs font-bold">
				<p>
					<a href="https://www.exeter.edu">Phillips Exeter Academy</a>
				</p>
				<p>
					<a href="https://fs30.formsite.com/exeter/TESub_Prod/index.html">Subscribe</a> | <a href="/masthead">Masthead</a> | <a href="/about">About</a>
				</p>
			</div>
			<div className="flex justify-center items-center flex-col w-full h-auto">
				{/* <PathAnimation animated={true}/> */}
				<div className="w-1/4 py-3 hover:contrast-50 duration-300">
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
				<div className="flex text-sm py-1 text-neutral-600">Sunday, Dec 17th, 2023</div>
				<ul className="flex flex-row text-sm gap-8 py-2 text-neutral-700">
					<a href="">
						<li className="hover:text-neutral-500 duration-200">Home</li>
					</a>
					<a href="/news">
						<li className="hover:text-neutral-500 duration-200">News</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">Life</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">Opinions</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">Sports</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">Humor</li>
					</a>
					<a href="https://crossword.theexonian.net">
						<li className="hover:text-neutral-500 duration-200">Crossword</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">Archive</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">Latest Issue</li>
					</a>
				</ul>
			</div>
		</>
	);
}
