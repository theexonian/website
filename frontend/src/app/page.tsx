import ArticlePreview from '@/components/ArticlePreview';

export default function Home() {
	return (
		<div className="flex w-screen h-auto items-center justify-center">
			<main className="flex w-11/12 max-w-[1600px] h-auto min-h-screen">
				<div className="w-full flex flex-col flex-wrap gap-1">
					<hr className="w-full border-neutral-300" />
					<hr className="w-full border-neutral-300" />
					<div className="grid grid-cols-4">
						<div className="col-span-1 px-4 2xl:px-8">
							<ArticlePreview z={0} />
							<ArticlePreview z={1} />
							<ArticlePreview z={2} />
							<ArticlePreview z={3} />
						</div>
						<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
							<ArticlePreview z={5} />
							<ArticlePreview z={6} />
						</div>
						<div className="col-span-1 px-4 2xl:px-8">
							<ArticlePreview z={7} />
							<ArticlePreview z={8} />
							<ArticlePreview z={9} />
							<ArticlePreview z={10} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
