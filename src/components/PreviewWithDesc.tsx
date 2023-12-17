import Image from "next/image";

export default function PreviewWithDesc() {
	return (
        <div className="w-full p-3 border-neutral-300 border-b">
			<div className="flex justify-between">
				<div className="">
					<h3 className="font-bold">Life</h3>
					<h1 className="font-serif font-medium text-xl py-2">
						Ah, I See That You Are Reading This
					</h1>
				</div>
			</div>
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
