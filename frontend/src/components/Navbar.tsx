"use client";

import "animate.css";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { RiArchive2Line, RiYoutubeLine, RiSpotifyLine } from "react-icons/ri";
import { TbMenu } from "react-icons/tb";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { useUser } from '@clerk/nextjs';
import SignInButton from '@/components/SignIn';
import SimpleThemeToggle from '@/components/SimpleThemeToggle';
interface NavbarProps {
	latestIssuePdfUrl?: string;
}

export default function Navbar({ latestIssuePdfUrl = '' }: NavbarProps) {
	const [showStickyLogo, setShowStickyLogo] = useState<boolean>(false);
	const [clientDate, setClientDate] = useState<Date | null>(null);
	const [mounted, setMounted] = useState<boolean>(false);
	const router = useRouter();
	const pathname = usePathname();
	const { isSignedIn } = useUser();

	// Helper function to check if a route is active
	const isActiveRoute = (route: string) => {
		if (route === '/') return pathname === '/';
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

		fetchLatestIssue();

		// Scroll detection for sticky logo
		const handleScroll = () => {
			// Show sticky logo when scrolled past the main logo area (approximately 200px)
			setShowStickyLogo(window.scrollY > 200);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleLatestIssueClick = (e: React.MouseEvent) => {
		if (!latestIssuePdfUrl) {
			e.preventDefault();
			return;
		}
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
			<div className="flex justify-start sticky items-center md:items-start flex-col w-full h-auto top-0 bg-[rgba(252,252,252,0.945)] dark:bg-[rgba(4,4,4,0.945)] backdrop-blur-[36px] z-50 border-b border-border pt-0 relative">
				{/* Sticky Logo in top left corner - Only show on desktop */}

				<div className="flex justify-center items-center sticky top-0 flex-col w-full h-auto">

					<div className="flex flex-row w-full">
						{/* Left side: Date */}
						<div className="flex-1 p-6 text-muted-foreground text-sm" suppressHydrationWarning>
							<span className="hidden md:inline">{mobileDate}</span>
							<span className="md:hidden">{dateString ? dateString + " " : ""}</span>
						</div>

						{/* Center: Logo */}
						<div className="w-[17rem] hover:contrast-50 duration-300 flex justify-center items-center">
							<Link href="/">
								<Image
									src={"/Exonian-logo.png"}
									width="0"
									height="0"
									sizes="25vw"
									className="h-full max-h-[4rem] w-auto dark:brightness-0 dark:invert min-w-[172px]"
									alt={"Logo of The Exonian"}
								/>
							</Link>
						</div>

						{/* Right side: Spacer */}
						<div className="flex-1 p-6 flex items-center justify-end text-xs py-1 text-foreground group-focus-within:text-muted-foreground">
							<div className="flex-1 flex justify-end">
								{mounted && (
									<div className="md:hidden hover:bg-[#f2f2f2] ml-[3px] flex flex-row items-center gap-2 py-[5px] px-[8px] rounded-lg border border-transparent focus-within:border-border duration-500 ease-in-out group w-24 focus-within:w-40 focus-within:gap-0">
										<FiSearch className="text-xs group-focus-within:text-[0px] group-focus-within:-translate-x-full duration-300 w-[1.2em] h-[1.2em]" />{" "}
										<input
											type="text"
											placeholder="Search"
											className="text-foreground outline-none w-12 group-focus-within:w-full duration-300 bg-transparent focus:ring-0"
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
								)}
							</div>
							<div className="md:hidden h-[26px] ml-2 gap-1 p-[5px] rounded-lg hover:bg-accent transition-colors duration-200">
								<SimpleThemeToggle />
							</div>
							<div className="md:hidden ml-2 p-[5px] rounded-lg hover:bg-accent transition-colors duration-200">
								<SignInButton />
							</div>
							<div className="md:flex md:items-center md:text-xs md:py-1 md:text-muted-foreground md:gap-2 mt-[-2px]">
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
													<MenubarItem asChild>
														<Link href="/">Home</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href="/news">News</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href="/life">Life</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href="/oped">Opinion</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href="/sports">Sports</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href="/humor">Humor</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href="https://crossword.theexonian.net">Crossword</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href="/pdf-exonian-archive">Archive</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>Latest Issue</Link>
													</MenubarItem>
													<MenubarItem asChild>
														<div className="flex items-center">
															<SimpleThemeToggle displayText={true} />
														</div>
													</MenubarItem>
													<MenubarItem asChild>
														<div className="flex items-center">
															<SignInButton />
														</div>
													</MenubarItem>
													<MenubarItem>
														<div className="flex justify-end">
															{mounted && (
																<div className=" hover:bg-[#f2f2f2] flex flex-row items-center gap-2 py-[5px] px-[8px] rounded-lg border border-transparent focus-within:border-border duration-500 ease-in-out focus-within:gap-0">
																	<FiSearch className="text-xs group-focus-within:text-[0px] group-focus-within:-translate-x-full duration-300 w-[1.2em] h-[1.2em]" />{" "}
																	<input
																		type="text"
																		placeholder="Search"
																		className="text-foreground outline-none w-12 group-focus-within:w-full duration-300 bg-transparent focus:ring-0"
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
															)}
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

				<ul className="flex flex-row md:hidden md:h-[100vh] text-xs gap-8 pt-[14px] pb-3 text-foreground">
					<li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/') ? 'text-red-700' : ''}`}>
						<Link href="/">Home</Link>
						{isActiveRoute('/') && (
							<div className="rounded-full absolute -bottom-[13px] left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-red-700 md:hidden"></div>
						)}
					</li>
					<li className={`hover:text-muted-foreground duration-200 relative md:px-6 ${isActiveRoute('/about') ? 'text-red-700' : ''}`}>
						<Link href="/about">About</Link>
						{isActiveRoute('/about') && (
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
						<Link href="/oped">Opinion</Link>
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
