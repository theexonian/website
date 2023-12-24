"use client"
import Image from "next/image";
import "animate.css";
import MediaQuery from 'react-responsive'

export default function Navbar() {
	return (
		<>
			<div className="h-[316px] w-full pt-24">
				<div className="flex w-full items-start justify-between px-8 py-12 lg:px-40 border-t-neutral-400 border">
					<div className="flex flex-col justify-start">
						<a href="https://vercel.com/?utm_source=exeter-computing-club&utm_campaign=oss">
							<div className="flex flex-row items-center justify-start text-neutral-300 py-3 max-w-[400px]">
								<Image
									src={"/Exonian-logo.png"}
									width="0"
									height="0"
									sizes="25vw"
									className="w-full h-auto"
									alt={"Logo of The Exonian"}
								/>
							</div>
						</a>
						<p className="font-serif text-neutral-700 text-sm">
							<i>
								The oldest continuously-running preparatory
								school newspaper in America.
							</i>
						</p>
						<p className="font-serif text-neutral-700 text-sm">
							<i>Established 1878.</i>
						</p>
						<p className="font-serif text-neutral-700 text-sm py-3">
							<i>Website created by the 146th Web Board led by Byran Huang &apos;25 and Eric Li &apos;25</i>.
						</p>
                        {/* @TODO: add socials here */}
					</div>
					<MediaQuery minWidth={768}>
					<div className="flex flex-col justify-start gap-2 text-right">
						<ul className="text-sm gap-8 py-2 text-neutral-700">
							<a href="">
								<li className="hover:text-neutral-500 duration-200">Home</li>
							</a>
							<a href="/news">
								<li className="hover:text-neutral-500 duration-200">News</li>
							</a>
							<a href="">
								<li className="hover:text-neutral-500 duration-200">Life</li>
							</a>
							<a href="">
								<li className="hover:text-neutral-500 duration-200">Opinions</li>
							</a>
							<a href="">
								<li className="hover:text-neutral-500 duration-200">Sports</li>
							</a>
							<a href="">
								<li className="hover:text-neutral-500 duration-200">Humor</li>
							</a>
							<a href="https://crossword.theexonian.net">
								<li className="hover:text-neutral-500 duration-200">Crossword</li>
							</a>
							<a href="">
								<li className="hover:text-neutral-500 duration-200">Archive</li>
							</a>
							<a href="">
								<li className="hover:text-neutral-500 duration-200">Latest Issue</li>
							</a>
						</ul>
					</div>
					</MediaQuery>
				</div>
			</div>
		</>
	);
}
