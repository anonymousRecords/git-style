"use client";

import { useState } from "react";

interface PreviewCardProps {
	username: string;
	loading?: boolean;
    theme?: string;
}

export default function PreviewCard({
	username,
	loading = false,
    theme = "hair",
}: PreviewCardProps) {
    const svgUrl = `/api/${username}?theme=${theme}`;
	const markdown = `![GitStyle](https://git-style.vercel.app${svgUrl})`;

	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(markdown);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	if (!username) return null;

	return (
		<div className="mt-6 space-y-4">
			{/* SVG Preview */}
			<div className="overflow-hidden p-2">
				{loading ? (
					<p className="text-center text-sm text-gray-400">
						Loading preview...
					</p>
				) : (
					<>
						<img
							src={svgUrl}
							alt={`${username}'s GitStyle`}
							className="w-full h-auto"
						/>
					</>
				)}
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
