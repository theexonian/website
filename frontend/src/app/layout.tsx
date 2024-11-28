import Footer from '@/components/Footer';
import './globals.css';
import Navbar from '@/components/Navbar';
import 'animate.css';
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
	title: 'The Exonian | Phillips Exeter Academy',
	description:
		'The Exonian is the oldest continuously-running prepatory school newspaper in the country',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="overflow-x-hidden animate__animated animate__fadeIn">
				<Analytics/>
				<Navbar />
				{/* @TODO: needs a lot of optimization */}
				<div className="flex w-screen h-auto items-center justify-center">
					<main className="flex w-3/4 xl:w-5/6 lg:w-11/12 max-w-[1600px] h-auto min-h-screen">
						<div className="w-full flex flex-col flex-wrap gap-1">
							<hr className="w-full border-neutral-300" />
							<hr className="w-full border-neutral-300" />
							{children}
						</div>
					</main>
				</div>
				<Footer />
			</body>
		</html>
	);
}
