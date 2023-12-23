import Image from "next/image";
import PreviewCenter from "@/components/PreviewCenter";
import Preview from "@/components/Preview";

export default function Home() {
	return (
		<div className="grid grid-cols-4">
			<div className="col-span-1 px-4 2xl:px-8">
				<Preview imageCenter={false} title={"Senior of the Week: Eric Li"}  description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."}  genre={"Life"} date={new Date()} author={["Byran Huang"]} image={"/Filler.png"} />
				<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"}date={new Date()} author={["Byran Huang"]} image={"/Second.png"} />
				<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Byran Huang"]} image={"/Small.png"} />
			</div>
			<div className="col-span-2 px-4 2xl:px-8 border-neutral-300 border-x">
				<PreviewCenter title={"Ah, I See That You Are Reading This"} image={"/Main.png"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Roxane Park", "Amy Lin", "Joonyoung Heo"]}  />
				<PreviewCenter title={"Is The Website Finally About To Be Done??"} image={"/Main.png"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Roxane Park", "Amy Lin", "Joonyoung Heo"]}  />
			</div>
			<div className="col-span-1 px-4 2xl:px-8">
				<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Byran Huang"]} image={"/Small.png"} />
				<Preview imageCenter={false} title={"Faculty of the Week: Roxane Park"}  description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."}  genre={"Life"} date={new Date()} author={["Byran Huang"]} image={"/Filler.png"} />
				<Preview imageCenter={true} title={"Why Monkeys are Clearly More Monkey Than They Appear"} genre={"Life"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu."} date={new Date()} author={["Byran Huang"]} image={"/Small.png"} />
			</div>
		</div>
	);
}
