import ArticlePreview from '@/components/ArticlePreview';
import HorizontalArticleSection from '@/components/HorizontalArticleSection';
// import IssuePreview from '@/components/ArticlePreview';
import Image from "next/image";
// import { getIssues } from '@/actions/getIssues';

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default function Home() {
	// const issues = await getIssues();
	// console.log(issues)

	return (
		<div>
			<div className="grid grid-cols-8 md:grid-cols-1">
				<div className="col-span-5 px-5 md:px-0 md:order-2 border-r border-[EFEFEF] md:border-none ">
					<div className="flex flex-col divide-y divide-border">
						<ArticlePreview z={1} section="news" titleSize='3'/>
						<ArticlePreview z={2} section="life" titleSize='2'/>
						<ArticlePreview z={3} section="life"/>
						<ArticlePreview z={4} section="life"/>
						<ArticlePreview z={5} section="life"/>
						<ArticlePreview z={3} section="oped"/>
						<ArticlePreview z={4} section="oped"/>
					</div>
				</div>
				<div className="col-span-3 px-5 md:px-2 md:order-3">
					<div className="text-2xl m-2 font-serif mb-2 border-b-2 border-[#f2f2f2] pb-1">
						Editor's Picks
					</div>
					<div className="flex flex-col divide-y divide-border">
						<ArticlePreview z={1} section="oped" titleSize='2'/>
						<ArticlePreview z={2} section="oped" titleSize='2'/>
						<ArticlePreview z={1} section="sports"/>
						<ArticlePreview z={2} section="sports"/>
						<ArticlePreview z={3} section="sports"/>
						<ArticlePreview z={4} section="sports"/>
						<ArticlePreview z={3} section="humor"/>
						<ArticlePreview z={4} section="humor"/>
					</div>
				</div>
			</div>
			
			{/* Horizontal Article Sections */}
			<div className="mt-8">
				<HorizontalArticleSection 
					sectionTitle="News" 
					sectionSlug="news" 
					limit={5}
				/>
				<HorizontalArticleSection 
					sectionTitle="Life" 
					sectionSlug="life" 
					limit={5}
				/>
				<HorizontalArticleSection 
					sectionTitle="Opinions" 
					sectionSlug="oped" 
					limit={5}
				/>
				<HorizontalArticleSection 
					sectionTitle="Sports" 
					sectionSlug="sports" 
					limit={5}
				/>
				<HorizontalArticleSection 
					sectionTitle="Humor" 
					sectionSlug="humor" 
					limit={5}
				/>
			</div>
		</div>
	);
}
