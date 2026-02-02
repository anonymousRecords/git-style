"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/common/SectionLabel";
import PreviewCard from "@/components/PreviewCard";
import { getThemeColors } from "@/components/ThemeTabs";
import { FlowerSelector } from "@/components/theme-content/flower-content/FlowerSelector";
import { UserNameInput } from "@/components/UserInput";
import type { FlowerType } from "@/lib/animation/types";

export function FlowerContent() {
	const [username, setUsername] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [flowerType, setFlowerType] = useState<FlowerType>("default");
	const [flowerColor, setFlowerColor] = useState("#fbbf24");
	const [isGenerating, setIsGenerating] = useState(false);

	const colors = getThemeColors("flower");

	const handleSubmit = () => {
		if (!username) return;
		setIsGenerating(true);
		setSubmitted(true);
		setTimeout(() => setIsGenerating(false), 1000);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && username) {
			handleSubmit();
		}
	};

	return (
		<div className="space-y-8">
			{/* Customize */}
			<div
				className="animate-fade-in opacity-0"
				style={{ animationDelay: "0.15s" }}
			>
				<SectionLabel>Customize</SectionLabel>
				<div
					className="rounded-2xl p-5 transition-all duration-300"
					style={{
						backgroundColor: colors.bg,
						boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
					}}
				>
					<FlowerSelector
						flowerType={flowerType}
						setFlowerType={setFlowerType}
						flowerColor={flowerColor}
						setFlowerColor={setFlowerColor}
					/>
				</div>
			</div>

			{/* Username & Generate */}
			<div
				className="animate-fade-in opacity-0"
				style={{ animationDelay: "0.25s" }}
			>
				<SectionLabel>GitHub Username</SectionLabel>
				{/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
				<div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
					<UserNameInput username={username} setUsername={setUsername} />
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!username || isGenerating}
						aria-busy={isGenerating}
						aria-label={
							isGenerating ? "Generating your GitStyle..." : "Generate GitStyle"
						}
						className="group relative py-3.5 px-6 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-400 hover:shadow-glow-pink active:scale-[0.98]"
						style={{
							backgroundColor: colors.accent,
						}}
					>
						{/* Hover gradient overlay */}
						<div
							className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style={{
								background:
									"linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
							}}
						/>

						{/* Button content */}
						<span className="relative flex items-center justify-center gap-2">
							{isGenerating ? (
								<>
									<svg
										className="animate-spin h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										aria-hidden="true"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									<span>Generating...</span>
								</>
							) : (
								"Generate"
							)}
						</span>
					</button>
				</div>
			</div>

			{/* Result */}
			{submitted && (
				<div
					className="animate-fade-in-scale opacity-0"
					style={{ animationDelay: "0.1s" }}
				>
					<SectionLabel>Result</SectionLabel>
					<PreviewCard
						username={username}
						flowerType={flowerType}
						flowerColor={flowerColor}
					/>
				</div>
			)}
		</div>
	);
}
