import FancyBigTitle from "@/components/FancyBigTitle";
import * as Constants from "@/components/Constants"

export default function Page() {
	return (
		<>
			<div className="prose md:prose-sm font-serif">
				<FancyBigTitle title="Media and Content Use Policy" />
				<p>
					<em>
						To request permission to use any materials from&nbsp;
					</em>
					The Exonian
					<em>
						, please submit your inquiry to {Constants.EIC_NAME} {Constants.EIC_GRAD_YEAR} at&nbsp;
						<a href={"mailto:"+ (Constants.EIC_EMAIL)}>{Constants.EIC_EMAIL}</a>
					</em>
				</p>
				<p>
					<em>The Exonian&nbsp;</em>is a newspaper written and
					produced by students of Phillips Exeter Academy, with said
					students as the chief subjects and principal audience of the
					publication. The views and opinions expressed in&nbsp;
					<em>The Exonian</em>
					&nbsp;are solely those of the original authors and do not
					necessarily represent those of Phillips Exeter Academy, its
					administrators, or Trustees. Those in the Exeter community
					are encouraged to read and share&nbsp;<em>The Exonian</em>’s
					content, made available online. We also encourage staff
					of&nbsp;
					<em>The Exonian</em>&nbsp;to pursue further opportunities in
					journalism and media and to submit their written work to
					scholarships in journalism or internship opportunities.
				</p>
				<p>
					<em>The Exonian</em>&nbsp;publishes its weekly content in
					its entirety on theexonian.net, and digitized copies of all
					past and current issues of&nbsp;<em>The Exonian&nbsp;</em>
					are uploaded to our online archives. This content is made
					available online for convenience and accessibility, but we
					ask that our readers be reminded that the intended audience
					of&nbsp;<em>The Exonian</em>, as a high-school newspaper, is
					the immediate Phillips Exeter Academy community.
				</p>
				<p>
					Given that the principal authors and subjects of the
					newspaper are high school students—many of whom are minors—
					<em>The Exonian</em>, in conjunction the school, holds an
					important responsibility of ensuring the privacy and
					well-being of the students, both past and present. For this
					reason,&nbsp;
					<em>The Exonian&nbsp;</em>requires that any outside parties
					interested in using any content from&nbsp;
					<em>The Exonian</em>
					&nbsp;first obtain permission from the publication.
				</p>
				<p>
					<em>
						For individuals or media outlets seeking to use in any
						way (including but not limited to: referencing,
						redistributing, or republishing parts of) any work
						from&nbsp;
					</em>
					The Exonian
					<em>
						&nbsp;in print or online, including content from the
						digital archives, you may submit your inquiry by
						emailing {Constants.EIC_NAME} {Constants.EIC_GRAD_YEAR} at <a href={"mailto:"+ (Constants.EIC_EMAIL)}>{Constants.EIC_EMAIL}</a>
					</em>
					<br />
				</p>
				<p></p>
				<h2>
					<strong>User Privacy</strong>
				</h2>
				<p>
					<em>The Exonian</em>&nbsp; may collect aggregate and
					anonymous data for analytics purposes. Email addresses are
					collected when users sign up for
					<em>The Exonian</em>’s newsletter.
					<br />
					<em>The Exonian</em>'s website collects analytical data in
					correspondence to GDPR regulations.
				</p>
				<p>
					Read&nbsp;
					<a href="/the-exonian-charter/">
						<em>The Exonian</em>’s Charter
					</a>
					&nbsp;for more information on our newspaper’s standards and
					practices.
				</p>
			</div>
		</>
	);
}
