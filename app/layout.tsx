import type { Metadata } from "next";
import { Coiny, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";

const quicksand = Quicksand({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-quicksand",
});

const coiny = Coiny({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-coiny",
});

export const metadata: Metadata = {
	title: "Git Style - Your commits, your style",
	description:
		"Turn your GitHub contributions into expressive visuals. Hair? Fire? Flowers? Style your commits your way.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`flex justify-center bg-gray-100 ${quicksand.variable} ${coiny.variable}`}
			>
				<div className="w-full max-w-[600px] min-h-screen bg-white shadow-md relative">
					<Header />
					<div className="flex-1">{children}</div>
				</div>
			</body>
		</html>
	);
}
