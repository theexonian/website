"use client";

import "animate.css";
import Image from "next/image";
import { FaArchive, FaInstagram, FaSearch } from "react-icons/fa";
import { RiArchive2Line, RiYoutubeLine } from "react-icons/ri";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
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
	const [isDesktop, setIsDesktop] = useState<boolean>(false);
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
		
		// Check if we're on desktop
		const checkIsDesktop = () => {
			setIsDesktop(window.innerWidth >= 768);
		};
		
		// Scroll detection for sticky logo
		const handleScroll = () => {
			// Show sticky logo when scrolled past the main logo area (approximately 200px)
			setShowStickyLogo(window.scrollY > 200);
		};

		// Initial check
		checkIsDesktop();
		
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', checkIsDesktop);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', checkIsDesktop);
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
			<div className="flex justify-center items-center flex-col w-full h-auto">
				<div className="w-1/4 min-w-[250px] pt-6 pb-3 md:pb-1 hover:contrast-50 duration-300 flex items-center justify-center">
					{/* TODO: Optimize responsive scaling of the the logo */}
					<Link href="/">
						<Image
							src={"/Exonian-logo.png"}
							width="0"
							height="0"
							sizes="25vw"
							className="h-[1.618rem] w-auto dark:brightness-0 dark:invert"
							alt={"Logo of The Exonian"}
						/>
					</Link>
				</div>
			</div>
			<div className="header flex justify-center items-center flex-col w-full h-auto sticky top-0 z-50 border-b border-border pt-4 relative">
				{/* Sticky Logo in top left corner - Only show on desktop */}
				{isDesktop && (
					<div className={`absolute left-6 top-1/2 transform -translate-y-1/2 transition-opacity duration-250 ${showStickyLogo ? 'opacity-100' : 'opacity-0'}`}>
						<Link href="/">
							<Image
								src={"/Exonian-logo.png"}
								width={240}
								height={80}
								className="h-8 w-auto dark:brightness-0 dark:invert"
								alt={"The Exonian Logo"}
								priority={true}
								quality={95}
							/>
						</Link>
					</div>
				)}
				
				<div className="flex items-center text-xs py-1 text-muted-foreground gap-2">
					<div className="hidden md:flex">
						<Menubar>
							<MenubarMenu>
								<MenubarTrigger>
									<div className="text-[16px]">
										<HiOutlineMenuAlt4 />
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
					</div>
					<div className="md:hidden">
						<SimpleThemeToggle />
					</div>
					{dateString + " "}
					<div className="flex items-center pl-3 gap-3 text-foreground">
						<div className="flex flex-row items-center gap-3 py-[1.382px] w-24 focus-within:gap-0 px-2 border rounded-md border-border focus-within:border-red-600/50 duration-300 group">
							<FiSearch size={13} className="text-xs group-focus-within:text-[0px] group-focus-within:-translate-x-full group-focus-within:opacity-0 duration-300" />{" "}
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
				</div>
				<ul className="flex flex-row md:hidden text-xs gap-8 py-2 pb-4 text-foreground">
    				<li className={`hover:text-muted-foreground duration-200 relative ${isActiveRoute('/') ? 'text-red-700' : ''}`}>
   					     <Link href="/">Home</Link>
						 {isActiveRoute('/') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						 )}
 				   </li>
 				   <li className={`hover:text-muted-foreground duration-200 relative ${isActiveRoute('/tag/news') ? 'text-red-700' : ''}`}>
   					     <Link href="/tag/news">News</Link>
						 {isActiveRoute('/tag/news') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						 )}
  				  </li>
				    <li className={`hover:text-muted-foreground duration-200 relative ${isActiveRoute('/tag/life') ? 'text-red-700' : ''}`}>
  					      <Link href="/tag/life">Life</Link>
						  {isActiveRoute('/tag/life') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						  )}
 				   </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative ${isActiveRoute('/tag/oped') ? 'text-red-700' : ''}`}>
   					     <Link href="/tag/oped">Opinions</Link>
						 {isActiveRoute('/tag/oped') && (
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
						 )}
  				  </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative ${isActiveRoute('/tag/sports') ? 'text-red-700' : ''}`}>
      				  <Link href="/tag/sports">Sports</Link>
					  {isActiveRoute('/tag/sports') && (
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
					  )}
  				  </li>
   				 <li className={`hover:text-muted-foreground duration-200 relative ${isActiveRoute('/tag/humor') ? 'text-red-700' : ''}`}>
   				     <Link href="/tag/humor">Humor</Link>
					 {isActiveRoute('/tag/humor') && (
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
					 )}
  				  </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative ${pathname === 'https://crossword.theexonian.net' ? 'text-red-700' : ''}`}>
  				      <Link href="https://crossword.theexonian.net">Crossword</Link>
  				  </li>
  				  <li className={`hover:text-muted-foreground duration-200 relative ${isActiveRoute('/pdf-exonian-archive') ? 'text-red-700' : ''}`}>
  				      <Link href="/pdf-exonian-archive">Archive</Link>
					  {isActiveRoute('/pdf-exonian-archive') && (
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red-700"></div>
					  )}
  				  </li>
  				  <li className="hover:text-muted-foreground duration-200">
   				     <Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>Latest Issue</Link>
   				 </li>

				</ul>
			</div>
		</>
	);
}
