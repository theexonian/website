"use client";

import "animate.css";
import Image from "next/image";
import { FaArchive, FaInstagram, FaSearch } from "react-icons/fa";
import { RiArchive2Line, RiYoutubeLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'
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
	const [showStickyLogo, setShowStickyLogo] = useState<boolean>(false);
	const [currentArticleTag, setCurrentArticleTag] = useState<string>('');
	const router = useRouter();
	const pathname = usePathname();
	const { isSignedIn } = useUser();

	// Helper function to check if a route is active
	const isActiveRoute = (route: string) => {
		if (route === '/') return pathname === '/';
		
		// Handle article pages - check if we're on an article page and match the tag
		if (pathname.startsWith('/articles/') && currentArticleTag) {
			// Map article tags to navigation routes
			const tagToRouteMap: { [key: string]: string } = {
				'news': '/tag/news',
				'sports': '/tag/sports', 
				'life': '/tag/life',
				'oped': '/tag/oped',
				'humor': '/tag/humor'
			};
			
			const expectedRoute = tagToRouteMap[currentArticleTag.toLowerCase()];
			return expectedRoute === route;
		}
		
		return pathname.startsWith(route);
	};

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
		
		// Fetch current article tag if we're on an article page
		async function fetchCurrentArticleTag() {
			if (pathname.startsWith('/articles/')) {
				try {
					const slug = pathname.split('/articles/')[1];
					if (slug) {
						// Import the getArticleById function dynamically to avoid circular dependencies
						const { getArticleById } = await import('@/actions/getArticleById');
						const article = await getArticleById(slug);
						if (article && article.tag) {
							setCurrentArticleTag(article.tag);
						}
					}
				} catch (error) {
					console.error('Failed to fetch current article:', error);
				}
			} else {
				// Clear the article tag when not on an article page
				setCurrentArticleTag('');
			}
		}
		
		fetchLatestIssue();
		fetchCurrentArticleTag();
		
		// Scroll detection for sticky logo
		const handleScroll = () => {
			// Show sticky logo when scrolled past the main logo area (approximately 200px)
			setShowStickyLogo(window.scrollY > 200);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [pathname]);

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
			</div>
			<div className="flex justify-center items-center flex-col w-full h-auto sticky top-0 bg-white z-50 border-b border-neutral-200 pt-4 relative">
				{/* Sticky Logo in top left corner - Hidden on mobile */}
				<div className={`absolute left-6 md:left-6 top-1/2 transform -translate-y-1/2 transition-opacity duration-250 hidden md:block ${showStickyLogo ? 'opacity-100' : 'opacity-0'}`}>
					<Link href="/">
						<Image
							src={"/Exonian-logo.png"}
							width={200}
							height={67}
							className="h-8 w-auto"
							alt={"The Exonian Logo"}
							priority={true}
							quality={100}
						/>
					</Link>
				</div>
				
				<div className="flex items-center text-xs py-1 text-neutral-600 gap-2">
					<div className="md:hidden">
						{/* Simple mobile menu button */}
						<button 
							onClick={() => {
								const menu = document.getElementById('mobile-menu');
								if (menu) {
									menu.classList.toggle('hidden');
								}
							}}
							className="text-[16px] p-2 hover:bg-gray-100 rounded"
						>
							<FiMenu />
						</button>
						{/* Mobile dropdown menu */}
						<div id="mobile-menu" className="hidden absolute top-full left-0 w-full bg-white border-t border-neutral-200 shadow-lg z-50">
							<div className="flex flex-col py-2">
								<Link href="/" className="px-4 py-3 hover:bg-gray-50 text-sm">Home</Link>
								<Link href="/tag/news" className="px-4 py-3 hover:bg-gray-50 text-sm">News</Link>
								<Link href="/tag/life" className="px-4 py-3 hover:bg-gray-50 text-sm">Life</Link>
								<Link href="/tag/oped" className="px-4 py-3 hover:bg-gray-50 text-sm">Opinions</Link>
								<Link href="/tag/sports" className="px-4 py-3 hover:bg-gray-50 text-sm">Sports</Link>
								<Link href="/tag/humor" className="px-4 py-3 hover:bg-gray-50 text-sm">Humor</Link>
								<Link href="https://crossword.theexonian.net" className="px-4 py-3 hover:bg-gray-50 text-sm">Crossword</Link>
								<Link href="/pdf-exonian-archive" className="px-4 py-3 hover:bg-gray-50 text-sm">Archive</Link>
								<Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick} className="px-4 py-3 hover:bg-gray-50 text-sm">Latest Issue</Link>
							</div>
						</div>
					</div>
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
						<Link
							href="https://github.com/theexonian/website"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaGithub className="text-lg" />
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
				<ul className="flex flex-row md:hidden text-xs gap-8 py-2 pb-4 text-neutral-800">
    				<li className={`hover:text-neutral-500 duration-200 relative ${isActiveRoute('/') ? 'text-red-700' : ''}`}>
   					     <Link href="/">Home</Link>
						 {isActiveRoute('/') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						 )}
 				   </li>
 				   <li className={`hover:text-neutral-500 duration-200 relative ${isActiveRoute('/tag/news') ? 'text-red-700' : ''}`}>
   					     <Link href="/tag/news">News</Link>
						 {isActiveRoute('/tag/news') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						 )}
  				  </li>
				    <li className={`hover:text-neutral-500 duration-200 relative ${isActiveRoute('/tag/life') ? 'text-red-700' : ''}`}>
  					      <Link href="/tag/life">Life</Link>
						  {isActiveRoute('/tag/life') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						  )}
 				   </li>
  				  <li className={`hover:text-neutral-500 duration-200 relative ${isActiveRoute('/tag/oped') ? 'text-red-700' : ''}`}>
   					     <Link href="/tag/oped">Opinions</Link>
						 {isActiveRoute('/tag/oped') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						 )}
  				  </li>
  				  <li className={`hover:text-neutral-500 duration-200 relative ${isActiveRoute('/tag/sports') ? 'text-red-700' : ''}`}>
      				  <Link href="/tag/sports">Sports</Link>
					  {isActiveRoute('/tag/sports') && (
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
					  )}
  				  </li>
   				 <li className={`hover:text-neutral-500 duration-200 relative ${isActiveRoute('/tag/humor') ? 'text-red-700' : ''}`}>
   				     <Link href="/tag/humor">Humor</Link>
					 {isActiveRoute('/tag/humor') && (
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
					 )}
  				  </li>
  				  <li className={`hover:text-neutral-500 duration-200 relative ${pathname === 'https://crossword.theexonian.net' ? 'text-red-700' : ''}`}>
  				      <Link href="https://crossword.theexonian.net">Crossword</Link>
  				  </li>
  				  <li className={`hover:text-neutral-500 duration-200 relative ${isActiveRoute('/pdf-exonian-archive') ? 'text-red-700' : ''}`}>
  				      <Link href="/pdf-exonian-archive">Archive</Link>
					  {isActiveRoute('/pdf-exonian-archive') && (
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
					  )}
  				  </li>
  				  <li className="hover:text-neutral-500 duration-200">
   				     <Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>Latest Issue</Link>
   				 </li>

				</ul>
			</div>
		</>
	);
}
