"use client";

import "animate.css";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { RiArchive2Line, RiYoutubeLine, RiSpotifyLine } from "react-icons/ri";
import { TbMenu } from "react-icons/tb";
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
import SimpleThemeToggle from '@/components/SimpleThemeToggle';
export default function Navbar() {
	const [latestIssuePdfUrl, setLatestIssuePdfUrl] = useState<string>('');
	const [showStickyLogo, setShowStickyLogo] = useState<boolean>(false);
	const [currentArticleTag, setCurrentArticleTag] = useState<string>('');
	const [clientDate, setClientDate] = useState<Date | null>(null);
	const [mounted, setMounted] = useState<boolean>(false);
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
				'news': '/news',
				'sports': '/sports', 
				'life': '/life',
				'oped': '/oped',
				'humor': '/humor'
			};
			
			const expectedRoute = tagToRouteMap[currentArticleTag.toLowerCase()];
			return expectedRoute === route;
		}
		
		return pathname.startsWith(route);
	};

	useEffect(() => {
		setMounted(true);
		setClientDate(new Date());

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
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
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
	const weekday = clientDate ? weekNames[clientDate.getDay()] : "";
	const dateString = clientDate
		? monthNames[clientDate.getMonth()] +
			" " +
			clientDate.getDate() +
			", " +
			clientDate.getFullYear()
		: "";
	const mobileDate = clientDate
		? clientDate.getMonth() + 1 + "/" + clientDate.getDate()
		: "";

	return (
		<>
			<div className="flex justify-start sticky items-center md:items-start flex-col w-full h-auto top-0 bg-background backdrop-blur-[36px] z-50 border-b border-border pt-0 relative">
				{/* Sticky Logo in top left corner - Only show on desktop */}

				<div className="flex justify-center items-center sticky top-0 flex-col w-full h-auto">
				
					<div className="flex flex-row w-full">
						{/* Left side: Date */}
						<div className="flex-1 p-6 text-muted-foreground text-sm" suppressHydrationWarning>
							<span className="hidden md:inline">{dateString ? dateString + " " : ""}</span>
							<span className="md:hidden">{mobileDate}</span>
						</div>

						{/* Center: Logo */}
						<div className="w-[17rem] hover:contrast-50 duration-300 flex justify-center items-center">
							<Link href="/">
								<Image
								src={"/Exonian-logo.png"}
								width="0"
								height="0"
								sizes="25vw"
								className="h-full max-h-[2rem] w-auto dark:brightness-0 dark:invert min-w-[172px]"
								alt={"Logo of The Exonian"}
								/>
							</Link>
						</div>

						{/* Right side: Spacer */}
						<div className="flex-1 p-6 flex items-center justify-end text-xs py-1 text-muted-foreground">
							<div className="flex items-center pl-2 gap-1 text-foreground md:hidden">
								<div className="hover:bg-[#f2f2f2] ml-[3px] flex flex-row items-center gap-1 py-[5px] w-24 focus-within:gap-0 px-[5px] border rounded-lg border-border duration-300 group">
									<FiSearch className="text-xs group-focus-within:text-[0px] group-focus-within:-translate-x-full group-focus-within:opacity-0 duration-300 w-[1.2em] h-[1.2em]" />{" "}
									<input
										type="text"
										placeholder="Search"
										className="text-muted-foreground outline-none w-12 group-focus-within:w-full duration-300 bg-transparent"
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
							<div className="md:hidden pl-2">
								<SimpleThemeToggle />
							</div>
							<div className="md:flex md:items-center md:text-xs md:py-1 md:text-muted-foreground md:gap-2">
								<div className="hidden md:flex">
									{mounted && (
										<Menubar>
											<MenubarMenu>
												<MenubarTrigger>
													<div className="text-[16px] leading-none">
														<TbMenu />
													</div>
												</MenubarTrigger>
												<MenubarContent>
													<MenubarItem>
														<Link href="/">Home</Link>
													</MenubarItem>
													<MenubarItem>
														<Link href="/news">News</Link>
													</MenubarItem>
													<MenubarItem>
														<Link href="/life">Life</Link>
													</MenubarItem>
													<MenubarItem>
														<Link href="/oped">Opinions</Link>
													</MenubarItem>
													<MenubarItem>
														<Link href="/sports">Sports</Link>
													</MenubarItem>
													<MenubarItem>
														<Link href="/humor">Humor</Link>
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
													<MenubarSeparator />
													<MenubarItem asChild>
														<div className="flex items-center gap-2 px-2 py-1">
															<span className="text-sm">Theme</span>
															<SimpleThemeToggle />
														</div>
													</MenubarItem>
												</MenubarContent>
											</MenubarMenu>
										</Menubar>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<ul className="flex flex-row md:flex-col md:h-[100vh] text-xs gap-8 pt-2 pb-3 text-foreground">
    				<li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/') ? 'text-red-700' : ''}`}>
   					     <Link href="/">Home</Link>
						 {isActiveRoute('/') && (
							<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
						 )}
 				   </li>
 				   <li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/news') ? 'text-red-700' : ''}`}>
   					     <Link href="/news">News</Link>
						 {isActiveRoute('/news') && (
							<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
						 )}
  				  </li>
				    <li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/life') ? 'text-red-700' : ''}`}>
  					      <Link href="/life">Life</Link>
						  {isActiveRoute('/life') && (
							<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
						  )}
 				   </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/oped') ? 'text-red-700' : ''}`}>
   					     <Link href="/oped">Opinions</Link>
						 {isActiveRoute('/oped') && (
							<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
						 )}
  				  </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/sports') ? 'text-red-700' : ''}`}>
      				  <Link href="/sports">Sports</Link>
					  {isActiveRoute('/sports') && (
						<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
					  )}
  				  </li>
   				 <li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/humor') ? 'text-red-700' : ''}`}>
   				     <Link href="/humor">Humor</Link>
					 {isActiveRoute('/humor') && (
						<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
					 )}
  				  </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${pathname === 'https://crossword.theexonian.net' ? 'text-red-700' : ''}`}>
  				      <Link href="https://crossword.theexonian.net">Crossword</Link>
  				  </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/pdf-exonian-archive') ? 'text-red-700' : ''}`}>
  				      <Link href="/pdf-exonian-archive">Archive</Link>
					  {isActiveRoute('/pdf-exonian-archive') && (
						<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
					  )}
  				  </li>
  				  <li className="hover:text-muted-foreground duration-200 md:px-6">
   				     <Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>Latest Issue</Link>
   				 </li>
				</ul>
			</div>
		</>
	);
}
