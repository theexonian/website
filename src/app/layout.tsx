import "./globals.css";
import Navbar from "@/components/Navbar";
import 'animate.css';

export const metadata = {
	title: "The Exonian | Phillips Exeter Academy",
	description:
		"The Exonian is the oldest continuously-running prepatory school newspaper in the country",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="overflow-x-hidden animate__animated animate__fadeIn">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
