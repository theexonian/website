import Image from "next/image";
import * as Constants from "@/components/Constants"
import FancyBigTitle from "@/components/FancyBigTitle";
import Link from "next/link";

export default function Page() {
	return (
		<>
			<FancyBigTitle title="Masthead" lowerText={"of the " + (Constants.BOARD_NUMBER) + " Board of The Exonian"}/>
			<Image
				src={"/Masthead.png"}
				width="0"
				height="0"
				sizes="100vw"
				className="w-full h-auto"
				alt={"Logo of The Exonian"}
			/>
			<div className="prose font-serif pt-20">
				<h2>How We Operate</h2>
				<hr className="w-3/4 border-neutral-500" />
				<p>
					<em>The Exonian</em> is comprised of three boards, an Executive
					Board, an Upper Board and a Lower Board. These three boards
					exist for all three branches of <em>The Exonian</em>. The Executive
					Board of <em>The Exonian</em> includes students from Editorial Board,
					Business Board and Web Board and is directed by the
					Editor-in-Chief.
				</p>

				<p>
					The Editorial Board’s Upper Board, listed above, is charged
					with producing all of the paper’s content. The Editorial
					Board assigns and edits articles, designs the paper and
					controls visuals, including photography and graphics. The
					Lower Board, comprised of Staff Writers, writes all of the
					content in the paper. Typically, staff writers are
					underclassmen, while the Upper Board is comprised of
					upperclassmen.
				</p>

				<p>
					The Business Board’s Upper Board, listed above, conducts all
					advertising, operations subscriptions, accounting and
					outreach. The Business Board’s Lower Board, comprised of
					associates, works within the aforementioned branches.
					Similarly to the Editorial Board, upperclassmen typically
					make up the Upper Board, whereas underclassmen typically
					make up the Lower Board.
				</p>

				<p>
					The Web Board’s Upper Board, listed above, controls all
					aspects of <em>The Exonian</em>’s web presence. They are in charge of
					all long-term projects and appearance of the website.
				</p>

				<p>
					The leadership of <em>The Exonian</em> transitions every year to the
					grade below the current board, typically in the winter term.
				</p>

				<p>
					<em>The Exonian</em> welcomes <em>Letters to the Editor</em> sent to the care
					of <Link href={"mailto:"+ (Constants.EIC_EMAIL)}>{Constants.EIC_EMAIL}</Link>. The Exonian reserves the right to
					print <em>Letters to the Editor</em> in a timely fashion and to edit
					them for content and clarity.
				</p>
			</div>
		</>
	);
}
