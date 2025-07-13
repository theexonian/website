"use client";

import Image from "next/image";
import "animate.css";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { getIssues } from '@/actions/getIssues';

export default function Navbar() {
	const [latestIssuePdfUrl, setLatestIssuePdfUrl] = useState<string>('');

	useEffect(() => {
		async function fetchLatestIssue() {
			try {
				const issues = await getIssues();
				if (issues && issues.length > 0) {
					// Issues are already sorted by slug:desc, so first one is the latest
					setLatestIssuePdfUrl(issues[0].pdf.url);
				}
			} catch (error) {
				console.error('Failed to fetch latest issue:', error);
			}
		}
		
		fetchLatestIssue();
	}, []);

	return (
		<>
			<div className="h-[250px] w-full pt-24">
				<div className="flex flex-row md:flex-col w-full items-start justify-between md:px-10 px-32 py-2 border-t-neutral-400 border-t">
					<div className="flex flex-col justify-start">
						<Link href="https://theexonian.net">
							<div className="flex flex-row items-center justify-start text-neutral-300 py-3 max-w-[250px]">
								<Image
									src={"/Exonian-logo.png"}
									width="0"
									height="0"
									sizes="25vw"
									className="w-full h-auto"
									alt={"Logo of The Exonian"}
								/>
							</div>
						</Link>
						<p className="font-serif text-neutral-700 text-xs">
							<i>
								The oldest continuously-running preparatory
								school newspaper in America.
							</i>
						</p>
						<p className="font-serif text-neutral-700 text-xs">
							<i>Established 1878.</i>
						</p>
						<p className="font-serif text-neutral-500 text-xs py-3">
							<i>Created by the 16th, 15th, & 14th Web Boards. Launched by the 16th Web Board.</i>
						</p>
					</div>
					<div className="flex flex-row md:self-end justify-start gap-8 text-right font-serif text-xs py-8 text-neutral-600">
						<div className="flex flex-col">
							<Link href="">
								<span className="hover:text-neutral-500 duration-200">Home</span>
							</Link>
							<Link href="/news">
								<span className="hover:text-neutral-500 duration-200">News</span>
							</Link>
							<Link href="">
								<span className="hover:text-neutral-500 duration-200">Life</span>
							</Link>
							<Link href="">
								<span className="hover:text-neutral-500 duration-200">Opinions</span>
							</Link>
							<Link href="">
								<span className="hover:text-neutral-500 duration-200">Sports</span>
							</Link>
						</div>
						<div className="flex flex-col">
							<Link href="/tag/humor">
								<span className="hover:text-neutral-500 duration-200">Humor</span>
							</Link>
							<Link href="https://crossword.theexonian.net">
								<span className="hover:text-neutral-500 duration-200">Crossword</span>
							</Link>
							<Link href="/pdf-exonian-archive">
								<span className="hover:text-neutral-500 duration-200">Archive</span>
							</Link>
							<Link href={latestIssuePdfUrl} target="_blank">
								<span className="hover:text-neutral-500 duration-200">Latest Issue</span>
							</Link>
							<Link href="https://archive.theexonian.com">
								<span className="hover:text-neutral-500 duration-200">Historical Archive</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
