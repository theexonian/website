import { getMainPageLayout } from '@/actions/getMainPageLayout';
import ArticlePreview from '@/components/ArticlePreview';
import HorizontalArticleSection from '@/components/HorizontalArticleSection';
// import IssuePreview from '@/components/ArticlePreview';
import Image from "next/image";
// import { getIssues } from '@/actions/getIssues';

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default async function Home() {
	const mainPageLayout = await getMainPageLayout();
	const recentMainPageLayout = mainPageLayout[0].layout; // Get the full layout JSON for this issue
	const layout = recentMainPageLayout ? recentMainPageLayout.layout : null; // get the actual layout component

	return (
		<div>
			<div className="grid grid-cols-11 md:grid-cols-1">
				<div className="col-span-3 px-6 md:px-2 md:order-2">
					{layout.cols.left.map((article, index) => (
						<ArticlePreview key={index} z={article.z} section={article.tag} titleSize={article.titleSize? article.titleSize : '1'}/>
					))}

					{/* <ArticlePreview z={1} section="life" titleSize='2'/>
					<ArticlePreview z={2} section="life" titleSize='2'/>
					<ArticlePreview z={3} section="life" titleSize='2'/>
					<ArticlePreview z={4} section="news"/>
					<ArticlePreview z={5} section="news"/>
					<ArticlePreview z={4} section="oped"/>
					<ArticlePreview z={5} section="oped"/> */}
					
				</div>
				<div className="col-span-5 px-8 lg:px-4 border-border border-x md:px-2 md:border-none md:order-1 md:col-span-1">
					{layout.cols.middle.map((article, index) => (
						<ArticlePreview key={index} z={article.z} section={article.tag} titleSize={article.titleSize? article.titleSize : '1'}/>
					))}
					{/* <ArticlePreview z={1} section="news" titleSize='3'/> */}
					{/* <ArticlePreview z={1} section="news" titleSize='4' thumbnailRatio="1/1" credit="Forrest Zeng / The Exonian" sectionOverride='GRAD'/> */}

					{/* <ArticlePreview z={2} section="news" titleSize='2'/>
					<ArticlePreview z={3} section="news" titleSize='2'/>
					<ArticlePreview z={1} section="sports" titleSize='2'/>
					<ArticlePreview z={1} section="humor" titleSize='2'/>
					<ArticlePreview z={2} section="humor" titleSize='2'/>
					<ArticlePreview z={4} section="news" titleSize='2' /> */}
				</div>
				<div className="col-span-3 px-6 md:px-2 md:order-3">
					{layout.cols.right.map((article, index) => (
						<ArticlePreview key={index} z={article.z} section={article.tag} titleSize={article.titleSize? article.titleSize : '1'}/>
					))}
					{/* <ArticlePreview z={1} section="oped" titleSize='2'/>
					<ArticlePreview z={2} section="oped" titleSize='2'/>
					<ArticlePreview z={2} section="sports" titleSize='2'/>
					<ArticlePreview z={3} section="oped"/>
					<ArticlePreview z={3} section="sports"/>
					<ArticlePreview z={4} section="sports"/>
					<ArticlePreview z={3} section="humor"/>
					<ArticlePreview z={4} section="humor"/>
					<ArticlePreview z={5} section="news" /> */}
				</div>
			</div>
			
			{/* Horizontal Article Sections */}
			<div className="mt-10">
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
