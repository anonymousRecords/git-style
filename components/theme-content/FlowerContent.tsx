"use client";

import { useState } from "react";
import { FlowerSelector } from "@/components/FlowerSelector";
import PreviewCard from "@/components/PreviewCard";
import { getThemeColors } from "@/components/ThemeTabs";
import { UserNameInput } from "@/components/UserInput";
import type { FlowerType } from "@/lib/animation/types";

export function FlowerContent() {
	const [username, setUsername] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [flowerType, setFlowerType] = useState<FlowerType>("default");
	const [flowerColor, setFlowerColor] = useState("#fbbf24");

	const colors = getThemeColors("flower");

	const handleSubmit = () => {
		if (!username) return;
		setSubmitted(true);
	};

	return (
		<div className="space-y-5">
			{/* Customize */}
			<div>
				<p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
					Customize
				</p>
				<div className="rounded-2xl p-4" style={{ backgroundColor: colors.bg }}>
					<FlowerSelector
						flowerType={flowerType}
						setFlowerType={setFlowerType}
						flowerColor={flowerColor}
						setFlowerColor={setFlowerColor}
					/>
				</div>
			</div>

			{/* Username & Generate */}
			<div>
				<p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
					GitHub Username
				</p>
				<div className="flex flex-col gap-3">
					<UserNameInput username={username} setUsername={setUsername} />
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!username}
						className="py-3 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
						style={{
							backgroundColor: colors.accent,
							color: "white",
						}}
					>
						Generate
					</button>
				</div>
			</div>

			{/* Result */}
			{submitted && (
				<PreviewCard
					username={username}
					flowerType={flowerType}
					flowerColor={flowerColor}
				/>
			)}
		</div>
	);
}
