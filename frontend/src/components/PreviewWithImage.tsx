import Image from "next/image";

export default function PreviewWithImage() {
	return (
		<div className="w-full p-3 border-neutral-300 border-b">
			<div className="flex justify-between">
				<div className="w-full pr-3">
					<h3 className="font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">Life</h3>
					<h1 className="font-serif font-medium text-xl py-2">
						Why Monkeys are Clearly More Monkey Than They Appear
					</h1>
				</div>
			</div>
			<Image
				src={"/Small.png"}
				width="0"
				height="0"
				sizes="25vw"
				className="w-full h-auto"
				alt={"Logo of The Exonian"}
			/>
            <div className="py-3">
                <p className="text-xs text-[#4E4E4E]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. At erat pellentesque adipiscing commodo
                    elit at. Accumsan in nisl nisi scelerisque eu ultrices
                    vitae auctor eu.
                </p>
            </div>
            <div className="">
                <p className="text-xs text-[#6C6C6C]">
                    By: Byran Huang
                </p>
                <p className="text-xs text-[#6C6C6C]">
                    10/12/23
                </p>
            </div>
		</div>
	);
}
