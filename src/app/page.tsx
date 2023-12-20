import Image from "next/image";
import PreviewSeniorOfTheWeek from "@/components/PreviewSeniorOfTheWeek";
import PreviewNoDesc from "@/components/PreviewNoDesc";
import PreviewWithDesc from "@/components/PreviewWithDesc";
import PreviewCenter from "@/components/PreviewCenter";
import PreviewWithImage from "@/components/PreviewWithImage";

export default function Home() {
	return (
		<div className="grid grid-cols-4">
			<div className="col-span-1 px-4 2xl:px-8">
				<PreviewSeniorOfTheWeek />
				<PreviewWithImage />
				<PreviewNoDesc />
				<PreviewWithImage />
			</div>
			<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
				<PreviewCenter />
				<PreviewCenter />
			</div>
			<div className="col-span-1 px-4 2xl:px-8">
				<PreviewNoDesc />
				<PreviewWithImage />
				<PreviewSeniorOfTheWeek />
				<PreviewWithImage />
				<PreviewWithDesc />
			</div>
		</div>
	);
}
