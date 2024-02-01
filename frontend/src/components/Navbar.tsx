import Image from "next/image";
import PathAnimation from "@/components/PathAnimation";
import { FaFacebook, FaFacebookF, FaInstagram, FaSearch } from "react-icons/fa";
import "animate.css";


export default function Navbar() {
	const currentDate = new Date();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	function appendSuffix(number: number): string {
		const suffixes = ["th", "st", "nd", "rd"];
		const remainder = number % 100;
		const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
		return number + suffix;
	}
	var dateString = weekNames[currentDate.getDay()] + ", " + monthNames[currentDate.getMonth()] + " " + appendSuffix(currentDate.getDate()) + ", " + currentDate.getFullYear();

	return (
		<>
			<div className="w-screen h-auto items-center min-h-[35px] bg-gradient-to-r from-[#000000] to-[#000000] text-white flex justify-between px-14 md:px-6 py-1 text-xs font-bold md:font-light">
				<p>
					<a href="https://www.exeter.edu" className="hover:text-red-400">Phillips Exeter Academy</a>
				</p>
				<p>
					<a href="https://fs30.formsite.com/exeter/TESub_Prod/index.html" className="hover:text-red-400">
						Subscribe
					</a>{" "}
					| <a href="/masthead" className="hover:text-red-400">Masthead</a> |{" "}
					<a href="/about" className="hover:text-red-400">About</a>
				</p>
			</div>
			<div className="flex justify-center items-center flex-col w-full h-auto">
				{/* <PathAnimation animated={true}/> */}
				<div className="w-1/4 pt-3 pb-3 md:pb-1 hover:contrast-50 duration-300">
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
				<div className="flex items-center text-sm md:text-xs py-1 text-neutral-600 gap-2">
					<svg className="hidden md:flex pr-2" viewBox="0 0 100 50" width="40" height="40">
						<rect width="60" height="5"></rect>
						<rect y="20" width="60" height="5"></rect>
						<rect y="40" width="60" height="5"></rect>
						{/* TODO: Byran embed hamburger menu code */}
					</svg>
					{
						dateString + " "
					}
					<div className="flex items-center pl-2 gap-3 text-neutral-600">
						<FaInstagram className="text-lg" />
						<FaFacebookF className="text-md" />
						<div className="flex flex-row items-center gap-3 py-[0.9px] px-2 border rounded-md border-neutral-300">
							<FaSearch className="text-xs" /> <span className="text-neutral-500">Search</span>
						</div>
					</div>
				</div>
				<ul className={"flex flex-row md:hidden text-sm gap-8 py-2 text-neutral-700"}>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">
							Home
						</li>
					</a>
					<a href="/news">
						<li className="hover:text-neutral-500 duration-200">
							News
						</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">
							Life
						</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">
							Opinions
						</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">
							Sports
						</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">
							Humor
						</li>
					</a>
					<a href="https://crossword.theexonian.net">
						<li className="hover:text-neutral-500 duration-200">
							Crossword
						</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">
							Archive
						</li>
					</a>
					<a href="">
						<li className="hover:text-neutral-500 duration-200">
							Latest Issue
						</li>
					</a>
				</ul>
			</div>
		</>
	);
}