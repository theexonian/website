import ArticlePreview from '@/components/ArticlePreview';
// import IssuePreview from '@/components/ArticlePreview';
import ProtectedLayout from '@/components/protected-layout';
import Image from "next/image";
// import { getIssues } from '@/actions/getIssues';

export default function Home() {
	// const issues = await getIssues();
	// console.log(issues)

	return (
		<div>
			<div className="grid grid-cols-4 md:grid-cols-1">
				<div className="col-span-1 px-6 md:px-2 md:order-2">
					<ArticlePreview z={1} section="life"/>
					<ArticlePreview z={2} section="life"/>
					<ArticlePreview z={3} section="life"/>
					<ArticlePreview z={4} section="life"/>
					<ArticlePreview z={5} section="life"/>
				</div>
				<div className="col-span-2 px-8 lg:px-4 border-neutral-300 border-x md:px-2 md:border-none md:order-1 md:col-span-1">
					<ArticlePreview z={1} section="news" titleSize='3' sectionOverride='GRAD'/>
					{/* <ArticlePreview z={1} section="news" titleSize='4' thumbnailRatio="1/1" credit="Forrest Zeng / The Exonian" sectionOverride='GRAD'/> */}

					<ArticlePreview z={2} section="news" titleSize='2'/>
					<ArticlePreview z={3} section="news" titleSize='2'/>
					<ArticlePreview z={2} section="humor"/>
					<ArticlePreview z={1} section="humor"/>
				</div>
				<div className="col-span-1 px-6 md:px-2 md:order-3">
					<ArticlePreview z={1} section="oped" titleSize='2'/>
					<ArticlePreview z={2} section="oped" titleSize='2'/>
					<ArticlePreview z={1} section="sports"/>
					<ArticlePreview z={2} section="sports"/>
					<ArticlePreview z={3} section="sports"/>
					<ArticlePreview z={4} section="sports"/>
				</div>
			</div>
		</div>
	);
}
