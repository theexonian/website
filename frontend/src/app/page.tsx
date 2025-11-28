import ArticlePreview from '@/components/ArticlePreview';
import ArticlePreviewImgRight from '@/components/ArticlePreviewImgRight';
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
				<div className="col-span-5 px-5 md:px-0 md:order-2 ">
					<div className="flex flex-col">
						<ArticlePreviewImgRight z={1} thumbnailRatio="16/9" section="news" titleSize='3'/>
						<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="life" titleSize='2'/>
						<ArticlePreviewImgRight z={3} thumbnailRatio="16/9" section="life" titleSize='2'/>
						<ArticlePreviewImgRight z={4} thumbnailRatio="16/9" section="life" titleSize='2'/>
						<ArticlePreviewImgRight z={5} thumbnailRatio="4/3" section="life" titleSize='2'/>
						<ArticlePreview z={2} section="oped" titleSize='2'/>
						<ArticlePreviewImgRight z={3} thumbnailRatio="16/9" section="oped"/>
						<ArticlePreviewImgRight z={4} thumbnailRatio="16/9" section="oped"/>
					</div>
				</div>
				<div className="col-span-3 pr-5 md:px-2 md:order-3">
					<div className="text-2xl flex font-serif mb-2 border-b-2 w-[12rem] border-[#bfa0a4]">
						Editor's Picks
					</div>
					<div className="flex flex-col">
						<ArticlePreview z={1} section="oped" titleSize='2'/>
						<ArticlePreview z={1} section="sports" thumbnailRatio='16/9'/>
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
