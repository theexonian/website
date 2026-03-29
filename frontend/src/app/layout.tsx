import Footer from '@/components/Footer';
import './globals.css';
import Navbar from '@/components/Navbar';
import 'animate.css';
import { Analytics } from "@vercel/analytics/react"
import NewsletterPopup from '@/components/NewsletterPopup';
import { ClerkProvider } from "@clerk/nextjs";
import { LinkedInEmbed } from 'react-social-media-embed';
import { getIssues } from '@/actions/getIssues';

export const metadata = {
	title: 'The Exonian | Phillips Exeter Academy',
	description:
		'The Exonian is the oldest continuously-running prepatory school newspaper in the country',
};

export const viewport = {
	themeColor: '#fdfdfd',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const issues = await getIssues();
	const latestIssuePdfUrl = issues?.[0]?.pdf?.url ?? '';

	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<html lang="en">
				<body className="font-sans overflow-x-hidden animate__animated animate__fadeIn">
					<Analytics/>
					<Navbar latestIssuePdfUrl={latestIssuePdfUrl} />
					{/* @TODO: up for optimization */}
					<div className="flex w-screen h-auto items-center justify-center">
						<main className="flex !w-full md:w-full lg:w-11/12 xl:w-5/6 max-w-[1300px] h-auto min-h-screen">
							<div className="w-full flex flex-col flex-wrap gap-1">
								{children}
							</div>
						</main>
					</div>
					<NewsletterPopup />
					<Footer latestIssuePdfUrl={latestIssuePdfUrl} />
				</body>
			</html>
		</ClerkProvider>
	);
}
