import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Git Style - Your commits, your style",
	description:
		"Turn your GitHub contributions into beautiful visuals. Style your commits your way.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`min-h-screen bg-white ${inter.variable}`}>
				<div className="flex justify-center">
					<div className="w-full max-w-[540px] min-h-screen px-5 sm:px-8">
						<main className="pb-16">{children}</main>

						<footer className="py-8 border-t border-neutral-100">
							<p className="text-xs text-neutral-400 text-center">
								<Link href="https://github.com/https://github.com/anonymousRecords/git-style">
									Made by anonymousRecords @GitHub
								</Link>
							</p>
						</footer>
					</div>
				</div>
			</body>
		</html>
	);
}
