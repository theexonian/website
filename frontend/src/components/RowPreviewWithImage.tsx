import Image from 'next/image';
import { Article } from '../../types/APIResponse';

export default function RowPreviewWithImage({ article }: { article: Article }) {
	return (
		<div className="w-full flex items-center py-3 border-neutral-300 border-b gap-4">
			<div className="w-2/5">
				<Image
					src={'/Small.png'}
					width="0"
					height="0"
					sizes="25vw"
					className="w-full h-auto"
					alt={'Logo of The Exonian'}
				/>
			</div>
			<div className="flex flex-col flex-wrap">
				<div className="w-full pr-3">
					<h3 className="font-bold font-sans bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
						Life
					</h3>
					<h1 className="font-serif font-medium text-xl">{article.title}</h1>
				</div>
				<div className="py-2">
					<p className="text-xs text-[#4E4E4E]">{article.content}</p>
				</div>
				<div className="font-sans">
					<p className="text-xs text-[#6C6C6C]">By: Byran Huang</p>
					<p className="text-xs text-[#6C6C6C]">10/12/23</p>
				</div>
			</div>
		</div>
	);
}
