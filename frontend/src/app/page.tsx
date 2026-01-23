import { getMainPageLayout } from '@/actions/getMainPageLayout';
import ArticlePreview from '@/components/ArticlePreview';
import ArticlePreviewImgRight from '@/components/ArticlePreviewImgRight';
import HorizontalArticleSection from '@/components/HorizontalArticleSection';
// import IssuePreview from '@/components/ArticlePreview';
import Image from "next/image";
// import { getIssues } from '@/actions/getIssues';

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default async function Home() {
	// const mainPageLayout = await getMainPageLayout();
	// const recentMainPageLayout = mainPageLayout[0].layout; // Get the full layout JSON for this issue
	// const layout = recentMainPageLayout ? recentMainPageLayout.layout : null; // get the actual layout component

	return (
		<div>
			<div className="grid grid-cols-11 md:grid-cols-1">
				<div className="col-span-3 px-6 md:px-2 md:order-2">
					 <ArticlePreview z={1} section="life" titleSize='2'/>
					<ArticlePreview z={2} section="life" titleSize='2'/>
					<ArticlePreview z={3} section="life" titleSize='2'/>
					<ArticlePreview z={4} section="news"/>
					<ArticlePreview z={5} section="news"/>
					<ArticlePreview z={4} section="oped"/>
					<ArticlePreview z={5} section="oped"/>
					
				</div>
				<div className="col-span-3 pl-10 pr-5 lg:pl-8 md:px-2 md:order-3 ">
					<div className="text-2xl flex font-serif mb-2 border-b-[1.5px] w-[12rem] border-[#8A6F66]">
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
