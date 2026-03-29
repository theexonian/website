import FancyBigTitle from "@/components/FancyBigTitle"
import * as Constants from "@/components/Constants"
import Link from "next/link";

export default function Page() {
	return (
		<div className="font-serif py-5 mx-auto px-6">
			<FancyBigTitle title="About" lowerText="The Exonian, Established 1878"/>
			<div className="max-w-[700px] prose prose-neutral dark:prose-invert md:prose-sm py-5">
				<h3>
					<i>
						The Exonian is the oldest continuously-running
						preparatory school newspaper in America.
					</i>
				</h3>
				<p>
					The paper is run by students at Phillips Exeter Academy in
					Exeter, New Hampshire, and published bi-weekly.
				</p>
				<p>
					The paper is comprised of three main boards — the Editorial
					board, the Web Board and the Business Board — directed by
					the Editor-in-Chief. The Editorial Board, comprised of
					section and layout editors, directs article production and
					print appearance. The Web Board updates this site
					(theexonian.net) weekly and manages long-term endeavors. The
					Business Board directs all finances and outreach of{" "}
					<i>The Exonian</i>, including subscriptions and social
					media.
				</p>
				<p>
					Since its inception, <i>The Exonian</i> has published news,
					commentary, and content pertaining to the Exeter community.
					Since 2010, it has published content online.
				</p>
				<h3>
					Contacting <i>The Exonian</i>
				</h3>
				<p>
					To subscribe to or advertise on <i>The Exonian</i>, contact{" "}
					<Link href="mailto:exonian@gmail.com">exonian@gmail.com</Link> or call{" "}
					<Link href="tel:6037774100">603-777-4100</Link>.
				</p>
				<p>
					A subscription to the paper costs $112.
				</p>
				<p>
					The Exonian welcomes <i>Letters to the Editor</i> sent to
					the care of <Link href={"mailto:"+ (Constants.EIC_EMAIL)}>{Constants.EIC_EMAIL}</Link>.
				</p>
				<p>
					The Exonian reserves the right to print{" "}
					<i>Letters to the Editor</i> in a timely fashion and to edit
					them for content and clarity.
				</p>

				<h1 className="mt-3 text-lg"><b>Other Pages</b></h1>
				<hr className="w-full mb-3"></hr>
				<div className="flex flex-col gap-3">
							<Link href="/webboard">
								<span className="hover:text-foreground duration-200 font-serif">Web Board</span>
							</Link>
							<Link href="/masthead">
								<span className="hover:text-foreground duration-200 font-serif">Masthead</span>
							</Link>
							<Link href="https://secure.touchnet.com/C25385_ustores/web/store_main.jsp?STOREID=2">
								<span className="hover:text-foreground duration-200 font-serif font-serif">Subscribe</span>
							</Link>
							<Link href="/pdf-exonian-archive">
								<span className="hover:text-foreground duration-200 font-serif">Web Archive</span>
							</Link>
							<Link href="https://archive.theexonian.com">
								<span className="hover:text-foreground duration-200 font-serif">Historical Archives</span>
							</Link>
							<Link href="/the-exonian-charter">
								<span className="hover:text-foreground duration-200 font-serif">Exonian Charter</span>
							</Link>
							<Link href="/privacy-and-content-use">
								<span className="hover:text-foreground duration-200 font-serif">Media Policy</span>
							</Link>
							</div>
			</div>
		</div>
	);
}
