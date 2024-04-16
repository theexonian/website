interface PreviewProps {
	title: string;
	tag?: string;
	description?: string;
	date?: Date;
	author?: string[];
	slug: string;
}

export default function PreviewNoImage(props: PreviewProps) {
	const { title, tag, description, date, author, slug } = props;
	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<a href={`/articles/${slug}`}>
				<div className="flex justify-between">
					<div className="w-full pr-3">
						{tag && (
							<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
								{tag.charAt(0).toUpperCase() + tag.slice(1)}
							</h3>
						)}
						{
							<h1 className="font-serif font-medium text-xl lg:text-lg py-2 hover:text-neutral-600 duration-200">
								{title}
							</h1>
						}
					</div>
				</div>

				{description && (
					<div>
						<p className="text-xs text-[#4E4E4E] hidden sm:flex hover:text-neutral-500 duration-200">
							{description}
						</p>
						<p className="text-xs text-[#4E4E4E] xl:hidden hover:text-neutral-500 duration-200">
							{description}
						</p>
					</div>
				)}
				<div className="pt-2">
					{author && (
						<p className="text-xs text-[#6C6C6C] duration-200">
							By:&nbsp;
							{/* @TODO: implement map loop for every author match with profile */}
							{author.join(', ')}
						</p>
					)}
					{date && <p className="text-xs text-[#6C6C6C]">{date.toLocaleDateString()}</p>}
				</div>
			</a>
		</div>
	);
}
