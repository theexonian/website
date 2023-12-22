import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import RowPreviewWithImage from "@/components/RowPreviewWithImage";
import FancyBigTitle from "@/components/FancyBigTitle";

export default function Page() {
	return (
		<>
			<FancyBigTitle title="Masthead" lowerText="of the 146th Board of The Exonian"/>
			<Image
				src={"/Masthead.png"}
				width="0"
				height="0"
				sizes="100vw"
				className="w-full h-auto"
				alt={"Logo of The Exonian"}
			/>
			<div className="prose font-serif py-24">
				<h1>How We Operate</h1>
				<hr className="w-3/4 border-neutral-500" />
				<p>
					The Exonian is comprised of three boards, an Executive
					Board, an Upper Board and a Lower Board. These three boards
					exist for all three branches of The Exonian. The Executive
					Board of The Exonian includes students from Editorial Board,
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
					aspects of The Exonian’s web presence. They are in charge of
					all longterm projects and appearance of the website.
				</p>

				<p>
					The leadership of The Exonian transitions every year to the
					grade below the current board, typically in the winter term.
				</p>

				<p>
					The Exonian welcomes Letters to the Editor sent to the care
					of rhpark@exeter.edu. The Exonian reserves the right to
					print Letters to the Editor in a timely fashion and to edit
					them for content and clarity.
				</p>
			</div>
		</>
	);
}
