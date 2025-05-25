import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Git Style - Your commits, your style",
	description: "Turn your GitHub contributions into expressive visuals. Hair? Fire? Flowers? Style your commits your way.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex justify-center bg-gray-100">
				<div className="w-full max-w-[600px] min-h-screen bg-white shadow-md relative">
					<Header />
					{children}
				</div>
			</body>
		</html>
	);
}
