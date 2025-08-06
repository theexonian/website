"use client";

import Image from "next/image";
import "animate.css";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { getIssues } from '@/actions/getIssues';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Navbar() {
	const [latestIssuePdfUrl, setLatestIssuePdfUrl] = useState<string>('');
	const { isSignedIn } = useUser();
	const router = useRouter();

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

	return (
		<>
			<div className="h-[300px] w-full pt-24">
				<div className="flex flex-row md:flex-col w-full items-start justify-between md:px-10 px-32 py-4 border-t-border border-t">
					<div className="flex flex-col justify-start">
						<Link href="https://theexonian.net">
							<div className="flex flex-row items-center justify-start text-muted-foreground py-3 max-w-[250px]">
								<Image
									src={"/Exonian-logo.png"}
									width="0"
									height="0"
									sizes="25vw"
									className="w-full h-auto dark:brightness-0 dark:invert"
									alt={"Logo of The Exonian"}
								/>
							</div>
						</Link>
						<p className="font-serif text-muted-foreground text-xs">
							<i>
								The oldest continuously-running preparatory
								school newspaper in America.
							</i>
						</p>
						<p className="font-serif text-muted-foreground text-xs">
							<i>Established 1878.</i>
						</p>
						<p className="font-serif text-muted-foreground text-xs py-3">
							<i>Website created by the 16th, 15th, & 14th Web Boards, and launched in 2025 by the <Link href="/webboard" className="hover:text-foreground duration-200 underline">16th Web Board</Link>.</i>
						</p>
					</div>
					<div className="flex flex-row md:self-end justify-start gap-8 text-right font-serif text-xs py-8 text-muted-foreground">
						<div className="flex flex-col space-y-2">
							<Link href="">
								<span className="hover:text-foreground duration-200">Home</span>
							</Link>
							<Link href="/about">
								<span className="hover:text-foreground duration-200">About</span>
							</Link>
							<Link href="/webboard">
								<span className="hover:text-foreground duration-200">Web Board</span>
							</Link>
							<Link href="/masthead">
								<span className="hover:text-foreground duration-200">Masthead</span>
							</Link>
						</div>				
						<div className="flex flex-col space-y-2">
							<Link href="/tag/news">
								<span className="hover:text-foreground duration-200">News</span>
							</Link>
							<Link href="/tag/life">
								<span className="hover:text-foreground duration-200">Life</span>
							</Link>
							<Link href="/tag/oped">
								<span className="hover:text-foreground duration-200">Opinions</span>
							</Link>
							<Link href="/tag/sports">
								<span className="hover:text-foreground duration-200">Sports</span>
							</Link>
							<Link href="/tag/humor">
								<span className="hover:text-foreground duration-200">Humor</span>
							</Link>
						</div>
						<div className="flex flex-col space-y-2">
							<Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>
								<span className="hover:text-foreground duration-200">Latest Issue</span>
							</Link>
							<Link href="/pdf-exonian-archive">
								<span className="hover:text-foreground duration-200">Web Archive</span>
							</Link>
							<Link href="https://archive.theexonian.com">
								<span className="hover:text-foreground duration-200">Historical Archives</span>
							</Link>
							<Link href="https://crossword.theexonian.net">
								<span className="hover:text-foreground duration-200">Crossword</span>
							</Link>
						</div>
						<div className="flex flex-col space-y-2">
							<Link href="/the-exonian-charter">
								<span className="hover:text-foreground duration-200">Exonian Charter</span>
							</Link>
							<Link href="/privacy-and-content-use">
								<span className="hover:text-foreground duration-200">Media Policy</span>
							</Link>
							<Link href="https://secure.touchnet.com/C25385_ustores/web/store_main.jsp?STOREID=2">
								<span className="hover:text-foreground duration-200">Subscribe</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
