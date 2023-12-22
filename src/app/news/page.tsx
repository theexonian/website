import Image from "next/image";
import PreviewSeniorOfTheWeek from "@/components/PreviewSeniorOfTheWeek";
import PreviewNoDesc from "@/components/PreviewNoDesc";
import PreviewWithDesc from "@/components/PreviewWithDesc";
import PreviewCenter from "@/components/PreviewCenter";
import PreviewWithImage from "@/components/PreviewWithImage";
import RowPreviewWithImage from "@/components/RowPreviewWithImage";

export default function Page() {
	return (
		<>
			<div className="py-8">
				<h1 className="text-7xl font-bold bg-gradient-to-r from-[#B40A0A] to-[#f71e1e] inline-block text-transparent bg-clip-text">
					News
				</h1>
				<hr className="border-red-600 w-1/2 border-[1px]" />
			</div>
			<div className="grid grid-cols-4">
				<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
					<PreviewCenter />
				</div>
				<div className="col-span-1 px-4 2xl:px-8">
					<PreviewSeniorOfTheWeek />
					<PreviewWithImage />
				</div>
				<div className="col-span-1 px-4 2xl:px-8">
					<PreviewNoDesc />
					<PreviewWithImage />
				</div>
			</div>
			<div className="py-10"></div>
			<div className="grid grid-cols-4">
				<div className="col-span-1 px-4 2xl:px-8">
					<PreviewSeniorOfTheWeek />
					<PreviewWithImage />
				</div>
				<div className="col-span-1 px-4 2xl:px-8">
					<PreviewNoDesc />
					<PreviewWithImage />
				</div>
				<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
					<PreviewCenter />
				</div>
			</div>
			<div className="py-10"></div>
			<div className="w-3/4 flex flex-col justify-center font-serif py-10 px-3">
				<RowPreviewWithImage />
				<RowPreviewWithImage />
				<RowPreviewWithImage />
				<RowPreviewWithImage />
				<RowPreviewWithImage />
			</div>
		</>
	);
}
