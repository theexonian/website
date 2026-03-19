import { getMainPageLayout } from '@/actions/getMainPageLayout';
import ArticlePreview from '@/components/ArticlePreview';
import ArticlePreview2 from '@/components/ArticlePreview2-Test';
import ArticlePreviewImgRight from '@/components/ArticlePreviewImgRight';
import HorizontalArticleSection from '@/components/HorizontalArticleSection';
// import IssuePreview from '@/components/ArticlePreview';
import Image from "next/image";
import InstagramEmbedWrapper from '@/components/InstagramEmbedWrapper';
import SpotifyEmbed from '@/components/SpotifyEmbed';
// import { getIssues } from '@/actions/getIssues';

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default async function Home() {
	// const mainPageLayout = await getMainPageLayout();
	// const recentMainPageLayout = mainPageLayout[0].layout; // Get the full layout JSON for this issue
	// const layout = recentMainPageLayout ? recentMainPageLayout.layout : null; // get the actual layout component
	return (
		<div className="p-6 w-full">
			{/* Outer Grid: Force 1 col on md and below */}
			<div className="grid grid-cols-8 md:grid-cols-1 divide-x-[1px] md:divide-x-0 gap-4 sm:gap-6">

				{/* Main Wrapper */}
				<div className="col-span-8 md:col-span-1">

					{/* Top Section Inner Grid */}
					<div className="grid grid-cols-8 md:grid-cols-1 divide-x-[1px] md:divide-x-0 gap-4 sm:gap-6">
						{/* Left Column */}
						<div className="col-span-5 md:col-span-1">
							<div className="flex flex-col sm:gap-6">
								<ArticlePreview z={1} thumbnailRatio="16/9" section="life" titleSize='3' />
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="life" titleSize='2' />
								<ArticlePreviewImgRight z={3} thumbnailRatio="16/9" section="life" titleSize='2' />
							</div>
						</div>

						{/* Right Column */}
						<div className="col-span-3 md:col-span-1 pl-4 md:pl-0">
							<div className="p-3 sm:px-0 sm:pb-6 sm:pt-4 sm:border-t-[1px] border-[rgb(230,230,230)]">
								<div className="text-2xl flex font-serif pb-3 border-b-[1px] w-full border-[rgb(230,230,230)] leading-none">
									Editor's Picks
								</div>
								{/* <div className="text-2xl px-3 text-red-700 font-bold font-sans border-b-[1px] w-full border-[rgb(230,230,230)]">
									Editor's Picks
								</div> */}
							</div>
							<div className="flex flex-col sm:gap-6">
								<ArticlePreview z={1} section="oped" titleSize='2' />
								<ArticlePreview z={1} section="sports" thumbnailRatio='16/9' />
								<ArticlePreview z={2} section="sports" thumbnailRatio='16/9' />
							</div>
						</div>
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
					sectionTitle="Opinion" 
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
	  