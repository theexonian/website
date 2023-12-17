import Image from "next/image";

export default function PreviewNoDesc() {
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
