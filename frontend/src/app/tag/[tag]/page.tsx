import PreviewCenter from '@/components/PreviewCenter';
import Preview from '@/components/Preview';
import RowPreview from '@/components/RowPreview';
import { getArticlesByTag } from '@/actions/getArticlesByTag';

export default async function Page({ params }: { params: { tag: string } }) {
	const { tag } = params;

	const articles = await getArticlesByTag(tag);

	// console.log(articles[0].authors);

	return (
		<>
			<div className="py-8">
				<h1 className="text-7xl xl:text-5xl md:text-3xl font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
					{tag.charAt(0).toUpperCase() + tag.slice(1)}
				</h1>
				<hr className="border-red-600 w-1/2 border-[1px]" />
			</div>
			<div className="grid grid-cols-4 md:grid-cols-1">
				<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
					{articles[0] && <PreviewCenter article={articles[0]} />}
				</div>
				<div className="col-span-1 md:col-span-2 px-4 2xl:px-8">
					<Preview
						title={'Why Monkeys are Clearly More Monkey Than They Appear'}
						tag={'Life'}
						description={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.'
						}
						date={new Date()}
						author={['Byran Huang']}
						image={'/Small.png'}
					/>
				</div>
				<div className="col-span-1 md:col-span-2 px-4 2xl:px-8">
					<Preview
						title={'Why Monkeys are Clearly More Monkey Than They Appear'}
						tag={'Life'}
						description={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.'
						}
						date={new Date()}
						author={['Byran Huang']}
						image={'/Small.png'}
					/>
				</div>
			</div>
			<div className="py-7 md:py-2"></div>
			<div className="grid grid-cols-4 md:grid-cols-1">
				<div className="col-span-1 md:col-span-2 px-4 2xl:px-8">
					<Preview
						title={'Why Monkeys are Clearly More Monkey Than They Appear'}
						tag={'Life'}
						description={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.'
						}
						date={new Date()}
						author={['Byran Huang']}
						image={'/Small.png'}
					/>
				</div>
				<div className="col-span-1 md:col-span-2 px-4 2xl:px-8">
					<Preview
						title={'Why Monkeys are Clearly More Monkey Than They Appear'}
						tag={'Life'}
						description={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.'
						}
						date={new Date()}
						author={['Byran Huang']}
						image={'/Small.png'}
					/>
				</div>
				<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
					{articles[6] && <PreviewCenter article={articles[6]} />}
				</div>
			</div>
			<div className="py-7 md:py-2"></div>
			<div className="w-3/4 flex flex-col justify-center font-serif py-10 px-3">
				<RowPreview />
				<RowPreview />
				<RowPreview />
				<RowPreview />
				<RowPreview />
			</div>
		</>
	);
}
