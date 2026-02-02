"use client";

import Image from "next/image";
import { useState } from "react";
import type { FlowerType } from "@/lib/themes/types";

interface PreviewCardProps {
	username: string;
	flowerType?: FlowerType;
	flowerColor?: string;
}

export default function PreviewCard({
	username,
	flowerType = "default",
	flowerColor,
}: PreviewCardProps) {
	const colorParam = flowerColor
		? `&color=${encodeURIComponent(flowerColor)}`
		: "";
	const animationUrl = `/api/${username}/animation?theme=plant&quality=low&flower=${flowerType}${colorParam}`;
	const markdown = `![GitStyle](https://git-style.vercel.app${animationUrl})`;

	const [copied, setCopied] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(markdown);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleRetry = () => {
		setHasError(false);
		setIsLoading(true);
	};

	if (!username) return null;

	return (
		<div className="space-y-5">
			<div
				className="relative overflow-hidden rounded-2xl bg-white p-3 transition-all duration-300"
				style={{
					boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
				}}
			>
				{isLoading && !hasError && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl z-10">
						<div className="flex flex-col items-center gap-3">
							<div className="w-8 h-8 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
							<p className="text-sm text-gray-400">Generating...</p>
						</div>
					</div>
				)}
				{hasError && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl z-10">
						<div className="flex flex-col items-center gap-3 text-center px-4">
							<div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
								<svg
									role="img"
									aria-label="Check"
									className="w-5 h-5 text-red-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<p className="text-sm text-gray-500">Could not load the image</p>
							<button
								type="button"
								onClick={handleRetry}
								className="text-sm text-pink-600 hover:text-pink-700 font-medium"
							>
								Try again
							</button>
						</div>
					</div>
				)}
				<Image
					src={animationUrl}
					alt={`${username}'s GitStyle`}
					className={`w-full h-auto rounded-xl transition-opacity duration-300 ${isLoading || hasError ? "opacity-0" : "opacity-100"}`}
					width={500}
					height={500}
					unoptimized
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false);
						setHasError(true);
					}}
				/>
			</div>

			<div
				className="rounded-2xl overflow-hidden transition-all duration-300"
				style={{
					background: "linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",
					border: "1px solid rgba(0,0,0,0.04)",
				}}
			>
				<div className="px-4 py-3 flex items-center justify-between border-b border-black/5">
					<span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
						Markdown
					</span>
					<button
						type="button"
						onClick={handleCopy}
						aria-label={
							copied
								? "Markdown code copied to clipboard"
								: "Copy markdown code to clipboard"
						}
						className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
						style={{
							background: copied ? "#10b981" : "#3d3a36",
							color: "white",
						}}
					>
						{copied ? (
							<>
								<svg
									className="w-3.5 h-3.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2.5}
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span>Copied</span>
							</>
						) : (
							<>
								<svg
									className="w-3.5 h-3.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
								<span>Copy</span>
							</>
						)}
					</button>
				</div>
				<div className="p-4">
					<pre className="text-sm text-gray-600 overflow-x-auto whitespace-pre-wrap break-all">
						<code>{markdown}</code>
					</pre>
				</div>
			</div>

			<p className="text-center text-xs text-gray-400">
				Paste this into your GitHub README.md
			</p>
		</div>
	);
}
