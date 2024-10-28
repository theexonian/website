import ArticlePreview from '@/components/ArticlePreview';

export default function Home() {
	return (
		<div>
			<div className="grid grid-cols-4 md:grid-cols-1">
				<div className="col-span-1 px-8 lg:px-4 border-neutral-300 border-x md:border-none hidden md:block">
					<ArticlePreview z={4} />
					<ArticlePreview z={5} />
				</div>
				<div className="col-span-1 px-6 md:px-2">
					<ArticlePreview z={0} />
					<ArticlePreview z={1} />
					<ArticlePreview z={2} />
					<ArticlePreview z={3} />
				</div>
				<div className="col-span-2 px-8 lg:px-4 border-neutral-300 border-x md:border-none block md:hidden">
					<ArticlePreview z={4} />
					<ArticlePreview z={5} />
				</div>
				<div className="col-span-1 px-6 md:px-2">
					<ArticlePreview z={6} />
					<ArticlePreview z={7} />
					<ArticlePreview z={8} />
					<ArticlePreview z={9} />
				</div>
			</div>
		</div>
	);
}
