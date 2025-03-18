"use client";

import { useEffect, useState } from "react";
import FancyBigTitle from "@/components/FancyBigTitle";
import Link from "next/link";
import Image from "next/image";
import { getIssues } from "@/actions/getIssues";
import { Issue } from "../../../types/APIResponse";

function numberEnding(num:number){
	if (num > 3 && num < 21) return 'th'; // Handle special case for 11th, 12th, 13th, etc.
	switch (num % 10) {
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		default: return 'th';
	}
}

export default function Page() {
	const [issues, setIssues] = useState<Issue[]>([]);

	useEffect(() => {
		async function fetchIssues() {
		  try {
			const issuesData = await getIssues();
			setIssues(issuesData);
		  } catch (error) {
			console.error("Error fetching issues:", error); // Log any errors
		  }
		}
	
		fetchIssues();
	  }, []);

	  const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	  });
	
	  useEffect(() => {
		function handleResize() {
		  setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		  });
		}
	
		window.addEventListener("resize", handleResize);
		handleResize();
	
		return () => window.removeEventListener("resize", handleResize);
	  }, []);
	
	  // Groups issues by board e.g.: {1: [issue1, issue2], 2: [issue3, issue4]}

	  const groupedIssues = issues.reduce((acc, issue) => {
		const { board } = issue;
		if (!acc[board]) {
		  acc[board] = [];
		}
		acc[board].push(issue);
		return acc;
	  }, {} as Record<number, Issue[]>);

	return (
		<>
			<div className="font-serif">
				<FancyBigTitle title="PDF Exonian Archives" />
				<p>
					Click on a date or photo below to access the PDF of any
					issue published after September 2013. If you would like to
					view the archives beginning with our first issue, please
					visit the library archive website at{" "}
					<Link href="https://archive.theexonian.com">
						archive.theexonian.com
					</Link>
					.
				</p>
			</div>

			<div className="">
				{Object.keys(groupedIssues).map((board) => (
					<div key={board} className="font-serif pt-3">
						<h4 className="text-2xl">
							<strong>
								{`The ${board}${numberEnding(Number(board))} Exonian Board`}
							</strong>
						</h4>
						<div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 py-5">
						{groupedIssues[board].map((issue, index) => (
							<p key={index}>
								<Link href={issue.pdf.url} target="_blank">
									<div className="inline-block overflow-hidden h-[30rem] min-h-[4vh] relative border-y-0 min-w-full">
										<Image 
											src={issue.thumbnail.url} 
											alt={`Thumbnail for ${issue.publishDate}`} 
											fill
    										style={{ objectFit: "cover", objectPosition: "top" }}
											className=""
										/>
										<div className={"bg-[#f0e0e0cb] bottom-3 right-5 text-right absolute pr-3 pt-1 text-xl grid grid-cols-10" + (windowSize.width < 768 ? "" : " pl-5")}>
											<span className="inline-block col-span-7 m-0">
												ISSUE #
												<br />
												<p className="text-sm mb-2 overflow-visible max-h-5">
												{new Date(issue.publishDate).toLocaleDateString("en-US", {
													year: "numeric",
													month: windowSize.width < 768 ? "short" : "long",
													day: "numeric",
												})}
												</p>
											</span>
											<span className="inline-block ml-1 col-span-3 min-h-full text-5xl m-0 align-text-top font-semibold font-[Abel]">
												{issue.slug.slice(3, 5)}
											</span>
										</div>
									</div>
									
								</Link>
							</p>
						))} </div>
					</div>
				))}
			</div>

			<div className="prose font-serif">
				<p>
					<em>The Exonian</em>&nbsp;transitioned to a newer website
					design on April 25, 2013. Any issues before the April 18,
					2013 issue are not available on this website; they are
					instead archived along with one of the previous website
					designs.
				</p>
				{/* @TODO: this website just points back to the SquareSpace */}
				<p>
					You can access this website at&nbsp;
					<Link href="http://old.theexonian.net/">
						old.theexonian.net{" "}
					</Link>
					to view any content before the dates listed above.
				</p>
			</div>
		</>
	);
}
