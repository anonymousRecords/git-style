"use client";

import Chip from "@/components/common/chip";
import Input from "@/components/common/input";
import PreviewCard from "@/components/preview-card";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Home() {
	const [username, setUsername] = useState("");
	const [theme, setTheme] = useState("hair");
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		if (!username) return;
		setLoading(true);
		setSubmitted(true);
		setTimeout(() => setLoading(false), 500);
	};

	return (
		<div className="px-3 mt-[48px] mb-[66px]">
			{/* Tags */}
			<div className="flex flex-wrap gap-1">
				{TAGS.map((tag) => (
					<Chip
						key={tag.label}
						label={tag.label}
						active={theme === tag.label}
						onClick={() => setTheme(tag.label)}
					/>
				))}
			</div>
			{/* Input */}
			<div className="pt-8">
				<Input
					type="text"
					placeholder="Enter your GitHub username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					name="username"
					label="GitHub username"
				/>
				<div className="flex justify-center">
					<button
						className="w-12 h-12 rounded-full px-3 py-2 bg-black text-white font-medium"
						type="button"
						onClick={handleSubmit}
					>
						<ChevronDownIcon className="w-6 h-6" />
					</button>
				</div>
			</div>
			{/* Preview */}
			{submitted && (
				<PreviewCard username={username} loading={loading} theme={theme} />
			)}
		</div>
	);
}

const TAGS = [{ label: "hair" }, { label: "fire" }];
