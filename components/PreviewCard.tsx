"use client";

import Image from "next/image";
import { useState } from "react";

interface PreviewCardProps {
	username: string;
}

export default function PreviewCard({
	username,
}: PreviewCardProps) {
	const animationUrl = `/api/${username}/animation?theme=plant&quality=low`;

	const markdown = `![GitStyle](https://git-style.vercel.app${animationUrl})`;

	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(markdown);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	if (!username) return null;

	return (
		<div className="mt-6 space-y-4">
			{/* Preview */}
			<div className="overflow-hidden p-2">
				<Image
					src={animationUrl}
					alt={`${username}'s GitStyle`}
					className="w-full h-auto"
					width={500}
					height={500}
					unoptimized
				/>
			</div>

			{/* Markdown code block */}
			<div className="p-2">
				<pre className="text-sm bg-white rounded px-2 py-1 overflow-x-auto">
					<code>{markdown}</code>
				</pre>
				<div className="flex justify-end">
					<button
						type="button"
						className="mt-2 text-sm px-3 py-1 rounded bg-black text-white"
						onClick={handleCopy}
					>
						{copied ? "Copied" : "Copy"}
					</button>
				</div>
			</div>
		</div>
	);
}
