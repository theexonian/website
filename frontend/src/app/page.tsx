import { getMainPageLayout } from '@/actions/getMainPageLayout';
import ArticlePreview from '@/components/ArticlePreview';
import ArticlePreview2 from '@/components/ArticlePreview2-Test';
import ArticlePreviewImgRight from '@/components/ArticlePreviewImgRight';
import HorizontalArticleSection from '@/components/HorizontalArticleSection';
// import IssuePreview from '@/components/ArticlePreview';
import Image from "next/image";
import InstagramEmbedWrapper from '@/components/InstagramEmbedWrapper';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import { FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa';
// import { getIssues } from '@/actions/getIssues';

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default async function Home() {
	// const mainPageLayout = await getMainPageLayout();
	// const recentMainPageLayout = mainPageLayout[0].layout; // Get the full layout JSON for this issue
	// const layout = recentMainPageLayout ? recentMainPageLayout.layout : null; // get the actual layout component
	return (
		<div className="p-6 w-full">

			<div className="grid grid-cols-9 lg:grid-cols-9 divide-x-[1px] md:divide-x-0 gap-4">
				<div className="col-span-9 md:order-1 md:px-0" >
					<div className="grid grid-cols-7 md:grid-cols-1 divide-x-[1px] md:divide-x-0 gap-4">
						<div className="col-span-4 md:col-span-1 md:px-0 md:order-1">
							{ /* Left Column */ }
							<div className="flex flex-col pr-3">
								<ArticlePreviewImgRight z={3} thumbnailRatio="4/3" section="life" titleSize='2'/>
								<ArticlePreviewImgRight z={4} thumbnailRatio="4/3" section="life" titleSize='2'/>
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="news" titleSize='2'/>
								<ArticlePreviewImgRight z={3} thumbnailRatio="4/3" section="news" titleSize='2'/>
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="oped" titleSize='2'/>
							</div>
						</div>
						<div className="col-span-3 md:order-2 pl-4">
							{ /* Middle Column */ }
							<div className='px-3 pt-3 pb-1'>
								<div className="text-2xl flex font-serif pb-2 border-b-[1px] w-full border-[rgb(230,230,230)] leading-none">
									Editor's Picks
								</div>
								{/* <div className="text-2xl px-3 text-red-700 font-bold font-sans border-b-[1px] w-full border-[rgb(230,230,230)]">
									Editor's Picks
								</div> */}
							</div>
							<div className="flex flex-col">
								<ArticlePreview z={1} section="news" thumbnailRatio='16/9'/>
								<ArticlePreview z={1} section="sports" thumbnailRatio='16/9'/>
								<ArticlePreview z={1} section="humor" thumbnailRatio='16/9'/>
							</div>
						</div>	
					</div>
					<div className="w-full ml-3 mr-9 my-3 py-5">
						<SpotifyEmbed theme="1" link="https://open.spotify.com/episode/7jEciCwwK31k1zcLcIsGnU?si=bc5dfa1a57464ac6" height="155"/>
					</div>
					<div className="grid grid-cols-7 divide-x md:divide-x-0 gap-4">
						<div className="col-span-4 md:px-0 md:order-1">
							{ /* Left Column */ }
							<div className="flex flex-col">
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="humor" titleSize='2'/>
								<ArticlePreviewImgRight z={3} thumbnailRatio="4/3" section="humor" titleSize='2'/>
								<ArticlePreviewImgRight z={4} thumbnailRatio="4/3" section="news" titleSize='2'/>
							</div>
						</div>
						<div className="col-span-3 md:order-2 pl-4">
							{ /* Middle Column */ }
							<div className="flex flex-col">
								<ArticlePreview z={1} section="oped" titleSize='2' thumbnailRatio='16/9'/>
								<ArticlePreview z={1} section="life" thumbnailRatio='16/9'/>
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
	  