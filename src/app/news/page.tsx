import PreviewCenter from "@/components/PreviewCenter";
import Preview from "@/components/Preview";
import RowPreview from "@/components/RowPreview";

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
					<PreviewCenter title={"Is The Website Finally About To Be Done??"} image={"/Main.png"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Roxane Park", "Amy Lin", "Joonyoung Heo"]}  />
				</div>
				<div className="col-span-1 px-4 2xl:px-8">
					<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Byran Huang"]} image={"/Small.png"} />
				</div>
				<div className="col-span-1 px-4 2xl:px-8">
					<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Byran Huang"]} image={"/Small.png"} />
				</div>
			</div>
			<div className="py-10"></div>
			<div className="grid grid-cols-4">
				<div className="col-span-1 px-4 2xl:px-8">
					<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Byran Huang"]} image={"/Small.png"} />
				</div>
				<div className="col-span-1 px-4 2xl:px-8">
					<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Byran Huang"]} image={"/Small.png"} />
				</div>
				<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
					<PreviewCenter title={"Is The Website Finally About To Be Done??"} image={"/Main.png"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Roxane Park", "Amy Lin", "Joonyoung Heo"]}  />
				</div>
			</div>
			<div className="py-10"></div>
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
