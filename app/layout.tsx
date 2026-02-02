import type { Metadata } from "next";
import { Coiny, Quicksand } from "next/font/google";
import "./globals.css";

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
				className={`min-h-screen ${quicksand.variable} ${coiny.variable}`}
				style={{
					background: `
						linear-gradient(180deg,
							#faf8f5 0%,
							#f8f5f0 50%,
							#f5f0ea 100%
						)
					`,
				}}
			>
				<div
					className="fixed inset-0 pointer-events-none opacity-[0.015]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
					}}
				/>

				<div className="relative flex justify-center">
					<div
						className="w-full max-w-[580px] min-h-screen relative"
						style={{
							background:
								"linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
							boxShadow: "0 0 60px rgba(0, 0, 0, 0.04)",
						}}
					>
						<main className="flex-1 pb-12">{children}</main>

						<footer className="py-6 text-center">
							<p className="text-xs text-gray-400 tracking-wide">Hanspoon</p>
						</footer>
					</div>
				</div>
			</body>
		</html>
	);
}
