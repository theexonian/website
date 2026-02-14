import { getMainPageLayout } from '@/actions/getMainPageLayout';
import ArticlePreview from '@/components/ArticlePreview';
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
		<div>
			<div className="grid grid-cols-9 lg:grid-cols-7 divide-x-[1.5px] md:divide-x-0 gap-4">
				<div className="col-span-7 md:order-1 md:px-0 " >
					{ /* Left Two Columns */ }
					<div className="grid grid-cols-7 divide-x-[1.5px] md:divide-x-0 gap-4">
						<div className="col-span-4 md:px-0 md:order-1">
							{ /* Left Column */ }
							<div className="flex flex-col">
								<ArticlePreview z={1} thumbnailRatio="16/9" section="life" titleSize='3'/>
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="life" titleSize='2'/>
								<ArticlePreviewImgRight z={3} thumbnailRatio="16/9" section="life" titleSize='2'/>
							</div>
						</div>
						<div className="col-span-3 md:order-2 pl-4">
							{ /* Right Column */ }
							<div className='px-3 pt-3'>
								<div className="text-2xl flex font-serif pb-2 border-b-[1px] w-full border-[rgb(230,230,230)] leading-none">
									Editor's Picks
								</div>
							</div>
							<div className="flex flex-col">
								<ArticlePreview z={1} section="oped" titleSize='2'/>
								<ArticlePreview z={1} section="sports" thumbnailRatio='16/9'/>
								<ArticlePreview z={2} section="sports" thumbnailRatio='16/9'/>
							</div>
						</div>	
					</div>
					<div className="w-full my-3 py-5 border-y-[1.5px]">
						<SpotifyEmbed theme="1" link="https://open.spotify.com/episode/7jEciCwwK31k1zcLcIsGnU?si=bc5dfa1a57464ac6" height="155"/>
					</div>
					<div className="grid grid-cols-7 divide-x-[1.5px] md:divide-x-0 gap-4">
						<div className="col-span-4 md:px-0 md:order-1">
							{ /* Left Column */ }
							<div className="flex flex-col">
								<ArticlePreview z={1} thumbnailRatio="16/9" section="life" titleSize='3'/>
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="life" titleSize='2'/>
								<ArticlePreviewImgRight z={3} thumbnailRatio="16/9" section="life" titleSize='2'/>
							</div>
						</div>
						<div className="col-span-3 md:order-2 pl-4">
							{ /* Right Column */ }
							<div className="flex flex-col">
								<ArticlePreview z={1} section="oped" titleSize='2'/>
								<ArticlePreview z={1} section="sports" thumbnailRatio='16/9'/>
								<ArticlePreview z={2} section="sports" thumbnailRatio='16/9'/>
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
