import ArticlePreview from '@/components/ArticlePreview';
import ProtectedLayout from '@/components/protected-layout';
export default function Home() {
	return (
		<div>
			<div className="grid grid-cols-4 md:grid-cols-1">
				<div className="col-span-1 px-6 md:px-2">
					<ArticlePreview z={1} section="life"/>
					<ArticlePreview z={2} section="life"/>
					<ArticlePreview z={3} section="life"/>
					<ArticlePreview z={4} section="life"/>
					<ArticlePreview z={5} section="life"/>
				</div>
				<div className="col-span-2 px-8 lg:px-4 border-neutral-300 border-x md:border-none block">
					<ArticlePreview z={1} section="news"/>
					<ArticlePreview z={2} section="news"/>
					<ArticlePreview z={3} section="news"/>
					<ArticlePreview z={2} section="humor"/>
					<ArticlePreview z={1} section="humor"/>
				</div>
				<div className="col-span-1 px-6 md:px-2">
					<ArticlePreview z={1} section="oped"/>
					<ArticlePreview z={2} section="oped"/>
					<ArticlePreview z={1} section="sports"/>
					<ArticlePreview z={2} section="sports"/>
					<ArticlePreview z={3} section="sports"/>
					<ArticlePreview z={4} section="sports"/>
				</div>
			</div>
		</div>
	);
}
