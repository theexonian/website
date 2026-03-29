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

			<div className="grid grid-cols-9 lg:grid-cols-7 divide-x-[1px] md:divide-x-0 gap-4">
				<div className="col-span-7 md:order-1 md:px-0" >
					{ /* Left Two Columns */ }
					<div className="border-b-[1px] w-full border-[rgb(230,230,230)] pb-3 mb-4 pr-3">
						<ArticlePreviewImgRight z={2} thumbnailRatio="16/9" section="life" titleSize='4' imageRatio={30}/>
						
					</div>
					
					<div className="grid grid-cols-7 divide-x-[1px] md:divide-x-0 gap-4">
						<div className="col-span-4 md:px-0 md:order-1">
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
					<div className="grid grid-cols-7 divide-x-2 divide-x-[1px] md:divide-x-0 gap-4">
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
				<div className="col-span-2 md:order-2 md:px-0"> { /* bg-[#f8f8f8] */ }
					{ /* Right Column */ }
					<div className="pl-3 pt-3 font-serif ">
						{/* <div className="px-3 py-3"> Placeholder: it looks better with some content here. This column disappears when the window width isnt high enough. The following things are just ideas. </div> */}
						{/* <div className="h-40"></div> */}

						<div className="px-2 pb-3 mb-1 ">
							<div className="flex items-center gap-2 text-[18px] text-foreground">
								<a
									href="https://www.instagram.com/theexonian/"
									target="_blank"
									rel="noreferrer"
									aria-label="The Exonian on Instagram"
									className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(230,230,230)] hover:bg-[#f4f4f4] transition-colors"
								>
									<FaInstagram />
								</a>
								<a
									href="https://www.youtube.com/@theexonian"
									target="_blank"
									rel="noreferrer"
									aria-label="The Exonian on YouTube"
									className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(230,230,230)] hover:bg-[#f4f4f4] transition-colors"
								>
									<FaYoutube />
								</a>
								<a
									href="https://open.spotify.com/show/7jEciCwwK31k1zcLcIsGnU"
									target="_blank"
									rel="noreferrer"
									aria-label="The Exonian on Spotify"
									className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(230,230,230)] hover:bg-[#f4f4f4] transition-colors"
								>
									<FaSpotify />
								</a>
							</div>
						</div>
						<div className="text-xl px-3 text-red-700 font-bold font-sans">Opinion</div>						
						<ArticlePreviewImgRight z={1} section="oped" titleSize='0' showSection={false} showDescription={false} showThumbnail={false}/>
						<ArticlePreviewImgRight z={2} section="oped" titleSize='0' showSection={false} showDescription={false} showThumbnail={false}/>
						<ArticlePreviewImgRight z={3} section="oped" titleSize='0' showSection={false} showDescription={false} showThumbnail={false}/>
						<ArticlePreviewImgRight z={4} section="oped" titleSize='0' showSection={false} showDescription={false} showThumbnail={false}/>
						<ArticlePreviewImgRight z={5} section="oped" titleSize='0' showSection={false} showDescription={false} showThumbnail={false}/>
						<ArticlePreviewImgRight z={6} section="oped" titleSize='0' showSection={false} showDescription={false} showThumbnail={false}/>
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
	  