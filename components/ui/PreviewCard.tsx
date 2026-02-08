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
		<div className="space-y-4">
			<div className="relative overflow-hidden rounded-xl border border-neutral-100 bg-white p-2">
				{isLoading && !hasError && (
					<div className="absolute inset-0 flex items-center justify-center bg-neutral-50 rounded-xl z-10">
						<div className="flex flex-col items-center gap-2">
							<div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
							<p className="text-xs text-neutral-400">Generating...</p>
						</div>
					</div>
				)}
				{hasError && (
					<div className="absolute inset-0 flex items-center justify-center bg-neutral-50 rounded-xl z-10">
						<div className="flex flex-col items-center gap-2 text-center px-4">
							<p className="text-sm text-neutral-500">Could not load image</p>
							<button
								type="button"
								onClick={handleRetry}
								className="text-sm text-neutral-900 hover:underline"
							>
								Try again
							</button>
						</div>
					</div>
				)}
				<Image
					src={animationUrl}
					alt={`${username}'s GitStyle`}
					className={`w-full h-auto rounded-lg transition-opacity duration-200 ${isLoading || hasError ? "opacity-0" : "opacity-100"}`}
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

			<div className="rounded-lg border border-neutral-100 overflow-hidden">
				<div className="px-3 py-2 flex items-center justify-between border-b border-neutral-100 bg-neutral-50">
					<span className="text-[11px] font-medium text-neutral-500">
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
						className={`text-xs font-medium px-2 py-1 rounded transition-colors duration-150 ${
							copied
								? "bg-green-500 text-white"
								: "bg-neutral-900 text-white hover:bg-neutral-800"
						}`}
					>
						{copied ? "Copied" : "Copy"}
					</button>
				</div>
				<div className="p-3 bg-white">
					<pre className="text-xs text-neutral-600 overflow-x-auto whitespace-pre-wrap break-all font-mono">
						<code>{markdown}</code>
					</pre>
				</div>
			</div>

			<p className="text-center text-[11px] text-neutral-400">
				Paste this into your GitHub README.md
			</p>
		</div>
	);
}
