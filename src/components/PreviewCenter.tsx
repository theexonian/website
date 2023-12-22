import Image from "next/image";

interface PreviewCenterProps {
	title: String;
	image: String;
	description: String;
	date: Date;
	author: String[];
}

export default function PreviewCenter(props: PreviewCenterProps) {
	const { title, image, description, date, author } = props;

	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<div className="hover:brightness-110 duration-500">
				<Image
					src={image as string}
					width="0"
					height="0"
					sizes="100vw"
					className="w-full h-auto"
					alt={"Logo of The Exonian"}
				/>
			</div>
			<div className="max-w-[600px]">
				<a href="">
					<div className="flex justify-between">
						<div className="">
							<h1 className="font-serif font-medium text-3xl py-2 hover:text-neutral-600 duration-200">
								{title}
							</h1>
						</div>
					</div>
					<div className="py-3">
						<p className="text-xs text-[#4E4E4E] hover:text-neutral-500 duration-200">
							{description}
						</p>
					</div>
				</a>
				<div className="">
					<p className="text-xs text-[#6C6C6C] duration-200">
						By:&nbsp;
						{/* @TODO: implement map loop for every author match with profile */}
						{author ? author.join(", ") : "ERROR"}
					</p>
					<p className="text-xs text-[#6C6C6C]">{date ? date.toLocaleDateString() : "ERROR"}</p>
				</div>
			</div>
		</div>
	);
}