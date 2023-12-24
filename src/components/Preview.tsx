import Image from "next/image";
import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'

interface PreviewProps {
	title: string;
	genre?: string;
	description?: string;
	date?: Date;
	author?: string[];
	image?: string;
	imageCenter: boolean;
}

export default function Preview(props: PreviewProps) {
	const { title, genre, description, date, author, image, imageCenter } = props;
	const isComputer = useMediaQuery({
		query: '(min-width: 1224px)'
	})
	const isTabletMobile = useMediaQuery({
		query: '(max-width: 1224px)'
	})
	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			{imageCenter ? (
				<>
					<div className="flex justify-between">
						<div className="w-full pr-3">
							{genre && (
								<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
									{genre}
								</h3>
							)}
							{isTabletMobile ? (
							<h1 className="font-serif font-small text-sm py-2 hover:text-neutral-300 duration-200">
								{title}
							</h1>) : (
							<h1 className="font-serif font-medium text-xl py-2 hover:text-neutral-600 duration-200">
								{title}
							</h1>)
							}
						</div>
					</div>
					{image && isComputer && (
						<div className="hover:brightness-110 duration-500 py-2">
							<Image
								src={image}
								width="0"
								height="0"
								sizes="25vw"
								className="w-full h-auto"
								alt={""}
							/>
						</div>
					)}
				</>
			) : (
				<>
					<div className="flex justify-between items-center pb-5">
						<div className="w-2/3 pr-3">
							{genre && (
								<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
									{genre}
								</h3>
							)}
							{isTabletMobile ? (
								<h1 className="font-serif font-small text-sm py-2 hover:text-neutral-300 duration-200">
									{title}
								</h1>) : (
								<h1 className="font-serif font-small text-xl py-2 hover:text-neutral-600 duration-200">
									{title}
								</h1>)
							}
						</div>
						{image && isComputer && (
							<div className="w-1/3 hover:brightness-110 duration-500">
								<Image
									src={image}
									width="0"
									height="0"
									sizes="25vw"
									className="w-full h-auto"
									alt={""}
								/>
							</div>
						)}
					</div>
				</>
			)}

			{description && (
				<div>
					<p className="text-xs text-[#4E4E4E] hover:text-neutral-500 duration-200">
						{description}
					</p>
				</div>
			)}
			<div className="pt-2">
				{author && (
					<p className="text-xs text-[#6C6C6C] duration-200">
						By:&nbsp;
						{/* @TODO: implement map loop for every author match with profile */}
						{author.join(", ")}
					</p>
				)}
				{date && (
					<p className="text-xs text-[#6C6C6C]">
						{date.toLocaleDateString()}
					</p>
				)}
			</div>
		</div>
	);
}
