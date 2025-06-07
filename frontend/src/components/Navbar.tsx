"use client";

import "animate.css";
import Image from "next/image";
import { FaArchive, FaInstagram, FaSearch } from "react-icons/fa";
import { RiArchive2Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { useUser } from '@clerk/nextjs';
import SignInButton from '@/components/SignIn';
export default function Navbar() {
	const currentDate = new Date();
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const weekNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	function appendSuffix(number: number): string {
		const suffixes = ["th", "st", "nd", "rd"];
		const remainder = number % 100;
		const suffix =
			suffixes[(remainder - 20) % 10] ||
			suffixes[remainder] ||
			suffixes[0];
		return number + suffix;
	}
	var dateString =
		weekNames[currentDate.getDay()] +
		", " +
		monthNames[currentDate.getMonth()] +
		" " +
		appendSuffix(currentDate.getDate()) +
		", " +
		currentDate.getFullYear();

	const router = useRouter();
	const {isSignedIn} = useUser();

	return (
		<>
			<div className="w-screen h-auto items-center min-h-[35px] bg-gradient-to-r from-[#000000] to-[#000000] text-white flex justify-between px-14 md:px-6 py-1 text-xs md:text-[11px] font-bold">
				<p>
					<Link
						href="https://www.exeter.edu"
						className="hover:text-red-400"
					>
						Phillips Exeter Academy
					</Link>
				</p>
				<p>
					<Link
						href="https://secure.touchnet.com/C25385_ustores/web/store_main.jsp?STOREID=2"
						className="hover:text-red-400"
					>
						Subscribe
					</Link>{" "}
					|{" "}
					<Link href="/masthead" className="hover:text-red-400">
						Masthead
					</Link>{" "}
					|{" "}
					<Link href="/about" className="hover:text-red-400">
						About
					</Link>{" "}
					|{" "}
					<SignInButton />
				</p>
			</div>
			<div className="flex justify-center items-center flex-col w-full h-auto">
				<div className="w-1/4 min-w-[250px] pt-3 pb-3 md:pb-1 hover:contrast-50 duration-300 flex items-center justify-center">
					{/* TODO: Optimize responsive scaling of the the logo */}
					<Link href="/">
						<Image
							src={"/Exonian-logo.png"}
							width="0"
							height="0"
							sizes="25vw"
							className="w-full min-w-[250px] h-auto"
							alt={"Logo of The Exonian"}
						/>
					</Link>
				</div>
				<div className="flex items-center text-xs py-1 text-neutral-600 gap-2">
					<div className="hidden md:flex">
						<Menubar>
							<MenubarMenu>
								<MenubarTrigger>
									<div className="text-[16px]">
										<FiMenu />
									</div>
								</MenubarTrigger>
								<MenubarContent>
									<MenubarItem>Home</MenubarItem>
									<MenubarItem>News</MenubarItem>
									<MenubarItem>Life</MenubarItem>
									<MenubarItem>Opinions</MenubarItem>
									<MenubarItem>Sports</MenubarItem>
									<MenubarItem>Humor</MenubarItem>
									<MenubarItem>Crossword</MenubarItem>
									<MenubarItem>Archive</MenubarItem>
									<MenubarItem>Latest Issue</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					</div>
					{dateString + " "}
					<div className="flex items-center pl-2 gap-3 text-neutral-700">
						<Link
							href="https://www.instagram.com/theexonian/"
							target="_blank"
						>
							<FaInstagram className="text-lg" />
						</Link>
						<Link
							href="https://archive.theexonian.com"
							target="_blank"
						>
							<RiArchive2Line className="text-lg" />
						</Link>
						<div className="flex flex-row items-center gap-3 py-[0.9px] w-24 focus-within:gap-0 px-2 border rounded-md border-neutral-300 focus-within:border-red-600/50 duration-300 group">
							<FaSearch className="text-xs group-focus-within:text-[0px] group-focus-within:-translate-x-full group-focus-within:opacity-0 duration-300" />{" "}
							<input
								type="text"
								placeholder="Search"
								className="text-neutral-500 outline-none w-12 group-focus-within:w-full duration-300"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										const input = e.target as HTMLInputElement;
										const query = input.value;
										router.push(`/search?=${query}`);
										input.value = "";
									}
								}}
							/>
						</div>
					</div>
				</div>
				<ul
					className={
						"flex flex-row md:hidden text-xs gap-8 py-2 text-neutral-800"
					}
				>
					<Link href="/">
						<li className="hover:text-neutral-500 duration-200">
							Home
						</li>
					</Link>
					<Link href="/tag/news">
						<li className="hover:text-neutral-500 duration-200">
							News
						</li>
					</Link>
					<Link href="/tag/life">
						<li className="hover:text-neutral-500 duration-200">
							Life
						</li>
					</Link>
					<Link href="/tag/oped">
						<li className="hover:text-neutral-500 duration-200">
							Opinions
						</li>
					</Link>
					<Link href="/tag/sports">
						<li className="hover:text-neutral-500 duration-200">
							Sports
						</li>
					</Link>
					<Link href="/tag/humor">
						<li className="hover:text-neutral-500 duration-200">
							Humor
						</li>
					</Link>
					<Link href="https://crossword.theexonian.net">
						<li className="hover:text-neutral-500 duration-200">
							Crossword
						</li>
					</Link>
					<Link href="/pdf-exonian-archive">
						<li className="hover:text-neutral-500 duration-200">
							Archive
						</li>
					</Link>
					<Link href="">
						<li className="hover:text-neutral-500 duration-200">
							Latest Issue
						</li>
					</Link>
				</ul>
			</div>
		</>
	);
}
