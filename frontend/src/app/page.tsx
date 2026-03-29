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
					<div className="grid grid-cols-7 md:grid-cols-1 divide-x-[1px] md:divide-x-0 gap-4 md:gap-0">
						<div className="col-span-4 md:px-0 md:col-span-1 md:order-1">
							{ /* Left Column */ }
							<div className="flex flex-col md:gap-6">
								<ArticlePreviewImgRight z={1} thumbnailRatio="4/3" section="life" titleSize='3'/>
								<ArticlePreviewImgRight z={3} thumbnailRatio="16/9" section="life" titleSize='2'/>
								<ArticlePreviewImgRight z={1} thumbnailRatio="4/3" section="news" titleSize='2'/>
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="news" titleSize='2'/>
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="oped" titleSize='2'/>
							</div>
						</div>
						<div className="col-span-3 md:order-2 pl-4 md:pl-0">
							{ /* Middle Column */ }
							<div className='md:border-t md:mt-4 md:mb-4'>
								<div className="text-2xl flex font-serif p-3 border-b-[1px] md:border-none w-full border-[rgb(230,230,230)] leading-none">
									Editor's Picks
								</div>
							</div>
							<div className="flex flex-col md:gap-6">
								<ArticlePreview z={4} section="news" thumbnailRatio='16/9'/>
								<ArticlePreview z={3} section="sports" thumbnailRatio='16/9'/>
								<ArticlePreview z={1} section="humor" thumbnailRatio='16/9'/>
							</div>
						</div>	
					</div>
					<div className="w-full py-6 md:px-3 flex justify-center">
						<div className="rounded-lg w-full">
							<SpotifyEmbed theme="1" link="https://open.spotify.com/episode/7bCm0x4CvqdSDIDPcJxYCN?si=N0VHoMS1T0ypn96-qKRTQA" height="155"/>
						</div>
					</div>

					<div className="grid grid-cols-7 md:grid-cols-1 divide-x md:divide-x-0 gap-4 md:gap-0">
						<div className="col-span-4 md:col-span-1 md:px-0 md:order-1">
							{ /* Left Column */ }
							<div className="flex flex-col md:gap-6">
								<ArticlePreviewImgRight z={2} thumbnailRatio="4/3" section="humor" titleSize='2'/>
								<ArticlePreviewImgRight z={3} thumbnailRatio="4/3" section="humor" titleSize='2'/>
								<ArticlePreviewImgRight z={4} thumbnailRatio="4/3" section="news" titleSize='2'/>
								{ /* Design Suggestions Request */ } 

								<div className=" mt-3 mb-3 rounded-lg bg-[rgb(246,246,246)] pl-5 pr-6 pt-5 pb-2 mr-5">
									<div className="text-xl font-bold flex font-serif md:border-none w-full border-[rgb(230,230,230)] leading-none mb-2">
										Have Suggestions For Our Website?
										<a href="mailto:theexonianwb@gmail.com" className="ml-auto font-sans text-sm text-red-700 font-bold hover:underline text-right mr-2">
											Contact Us
										</a>
									</div>
									<div className="flex flex-col md:gap-6">
										<p className="text-sm font-serif text-foreground mb-3">We’re always looking to improve the design of our website and would love to hear your suggestions! If you have any ideas or feedback, please don’t hesitate to reach out.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-3 md:order-2 pl-4 md:pl-0 md:gap-6">
							{ /* Middle Column */ }
							<div className="flex flex-col">
								<ArticlePreview z={6} section="oped" titleSize='2' thumbnailRatio='16/9'/>
								<ArticlePreview z={2} section="life" thumbnailRatio='16/9'/>
							</div>
						</div>	
					</div>
				</div>
			</div>
			
			{/* Horizontal Article Sections */}
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
	);
}
	  