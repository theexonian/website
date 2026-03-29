"use client";

import Image from "next/image";
import "animate.css";
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface FooterProps {
	latestIssuePdfUrl?: string;
}

export default function Navbar({ latestIssuePdfUrl = '' }: FooterProps) {
	const { isSignedIn } = useUser();
	const router = useRouter();

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

	return (
		<>
			<div className="w-full pt-4">
				<div className="flex flex-row md:flex-col w-full items-start justify-between p-6 border-t-border border-t">
					<div className="flex flex-col justify-start pr-5 md:w-[100%]">
						<Link href="https://theexonian.net">
							<div className="flex flex-row items-center justify-start text-muted-foreground pb-3 max-w-[175px]">
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
							<i>Est. 1878</i>
						</p>
						<p className="font-serif text-muted-foreground text-xs py-3">
							Website created by the 16th, 15th, & 14th Web Boards, and relaunched in 2026 by the <Link href="/webboard" className="hover:text-foreground duration-200 underline">17th Web Board</Link>.
						</p>
					</div>
					<div className="flex flex-row md:self-end justify-start gap-8 md:gap-6 font-serif text-xs py-8 text-muted-foreground md:w-[100%] md:pt-3">
						<div className="flex flex-col space-y-4">
							<Link href="">
								<span className="hover:text-foreground duration-200 font-sans">Home</span>
							</Link>
							<Link href="/about">
								<span className="hover:text-foreground duration-200 font-sans">About</span>
							</Link>
							<Link href="/webboard">
								<span className="hover:text-foreground duration-200 font-sans">Web Board</span>
							</Link>
							<Link href="/masthead">
								<span className="hover:text-foreground duration-200 font-sans">Masthead</span>
							</Link>
							<Link href="https://secure.touchnet.com/C25385_ustores/web/store_main.jsp?STOREID=2">
								<span className="text-red-700 hover:text-foreground duration-200 font-sans font-sans">Subscribe</span>
							</Link>
						</div>				
						<div className="flex flex-col space-y-4">
							<Link href="/news">
								<span className="hover:text-foreground duration-200 font-sans">News</span>
							</Link>
							<Link href="/life">
								<span className="hover:text-foreground duration-200 font-sans">Life</span>
							</Link>
							<Link href="/oped">
								<span className="hover:text-foreground duration-200 font-sans">Opinion</span>
							</Link>
							<Link href="/sports">
								<span className="hover:text-foreground duration-200 font-sans">Sports</span>
							</Link>
							<Link href="/humor">
								<span className="hover:text-foreground duration-200 font-sans">Humor</span>
							</Link>
						</div>
						<div className="flex flex-col space-y-4">
							<Link href={latestIssuePdfUrl} target="_blank" onClick={handleLatestIssueClick}>
								<span className="hover:text-foreground duration-200 font-sans">Latest Issue</span>
							</Link>
							<Link href="/pdf-exonian-archive">
								<span className="hover:text-foreground duration-200 font-sans">Web Archive</span>
							</Link>
							<Link href="https://archive.theexonian.com">
								<span className="hover:text-foreground duration-200 font-sans">Historical Archives</span>
							</Link>
							<Link href="https://crossword.theexonian.net">
								<span className="hover:text-foreground duration-200 font-sans">Crossword</span>
							</Link>
						</div>
						<div className="flex flex-col space-y-4">
							<Link href="/the-exonian-charter">
								<span className="hover:text-foreground duration-200 font-sans">Exonian Charter</span>
							</Link>
							<Link href="/privacy-and-content-use">
								<span className="hover:text-foreground duration-200 font-sans">Media Policy</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
