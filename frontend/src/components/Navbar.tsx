"use client";

import "animate.css";
import Image from "next/image";
import { FaArchive, FaInstagram, FaSearch } from "react-icons/fa";
import { RiArchive2Line, RiYoutubeLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { getIssues } from '@/actions/getIssues';
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
	const [latestIssuePdfUrl, setLatestIssuePdfUrl] = useState<string>('');

	useEffect(() => {
		async function fetchLatestIssue() {
			try {
				const issues = await getIssues();
				if (issues && issues.length > 0) {
					// Issues are sorted by publishDate:desc, so first one is the latest
					setLatestIssuePdfUrl(issues[0].pdf.url);
				}
			} catch (error) {
				console.error('Failed to fetch latest issue:', error);
			}
		}
		
		fetchLatestIssue();
	}, []);

	const handleLatestIssueClick = (e: React.MouseEvent) => {
		// Allow access in development mode or if signed in
		const isDev = process.env.NODE_ENV === 'development';
		if (!isSignedIn && !isDev) {
			e.preventDefault();
			router.push('/sign-in');
		}
		// If signed in or in dev mode, the link will work normally
	};

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
	// function appendSuffix(number: number): string {
	// 	const suffixes = ["th", "st", "nd", "rd"];
	// 	const remainder = number % 100;
	// 	const suffix =
	// 		suffixes[(remainder - 20) % 10] ||
	// 		suffixes[remainder] ||
	// 		suffixes[0];
	// 	return number + suffix;
	// }
	var dateString =
		weekNames[currentDate.getDay()] +
		", " +
		monthNames[currentDate.getMonth()] +
		" " +
		currentDate.getDate() +
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
					<Link href="/masthead" className="hover:text-red-400">
						Masthead
					</Link>{" "}
					|{" "}
					<Link href="/about" className="hover:text-red-400">
						About
					</Link>{" "}
					|{" "}
					<Link href="/webboard" className="hover:text-red-400">
						Web Board
					</Link>{" "}
					|{" "}
					<Link href="/the-exonian-charter" className="hover:text-red-400">
						Exonian Charter
					</Link>{" "}
					|{" "}
					<Link href="/privacy-and-content-use" className="hover:text-red-400">
						Media Policy
					</Link>{" "}
					|{" "}
					<Link
						href="https://secure.touchnet.com/C25385_ustores/web/store_main.jsp?STOREID=2"
						className="hover:text-red-400"
					>
						Subscribe
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
									<MenubarItem>
										<Link href="/">Home</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href="/tag/news">News</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href="/tag/life">Life</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href="/tag/oped">Opinions</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href="/tag/sports">Sports</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href="/tag/humor">Humor</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href="https://crossword.theexonian.net">Crossword</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href="/pdf-exonian-archive">Archive</Link>
									</MenubarItem>
									<MenubarItem>
										<Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>Latest Issue</Link>
									</MenubarItem>
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
							href="https://www.youtube.com/@TheExonian"
							target="_blank"
							rel="noopener noreferrer"
						>
							<RiYoutubeLine className="text-lg" />
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
				<ul className="flex flex-row md:hidden text-xs gap-8 py-2 text-neutral-800">
    				<li className="hover:text-neutral-500 duration-200">
   					     <Link href="/">Home</Link>
 				   </li>
 				   <li className="hover:text-neutral-500 duration-200">
   					     <Link href="/tag/news">News</Link>
  				  </li>
				    <li className="hover:text-neutral-500 duration-200">
  					      <Link href="/tag/life">Life</Link>
 				   </li>
  				  <li className="hover:text-neutral-500 duration-200">
   					     <Link href="/tag/oped">Opinions</Link>
  				  </li>
  				  <li className="hover:text-neutral-500 duration-200">
      				  <Link href="/tag/sports">Sports</Link>
  				  </li>
   				 <li className="hover:text-neutral-500 duration-200">
   				     <Link href="/tag/humor">Humor</Link>
  				  </li>
  				  <li className="hover:text-neutral-500 duration-200">
  				      <Link href="https://crossword.theexonian.net">Crossword</Link>
  				  </li>
  				  <li className="hover:text-neutral-500 duration-200">
  				      <Link href="/pdf-exonian-archive">Archive</Link>
  				  </li>
  				  <li className="hover:text-neutral-500 duration-200">
   				     <Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>Latest Issue</Link>
   				 </li>
				</ul>
			</div>
		</>
	);
}
