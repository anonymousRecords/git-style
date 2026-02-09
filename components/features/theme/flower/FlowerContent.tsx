"use client";

import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import { UserNameInput } from "@/components/features/user/UserInput";
import PreviewCard from "@/components/ui/PreviewCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { FlowerType } from "@/lib/themes/types";
import { FlowerSelector } from "./FlowerSelector";

export function FlowerContent() {
	const posthog = usePostHog();
	const [username, setUsername] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [flowerType, setFlowerType] = useState<FlowerType>("default");
	const [flowerColor, setFlowerColor] = useState("#fbbf24");
	const [isGenerating, setIsGenerating] = useState(false);

	const handleSubmit = () => {
		if (!username) return;
		posthog?.capture("generate_clicked", {
			flower_type: flowerType,
			flower_color: flowerColor,
		});
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
		<div className="space-y-10">
			<div>
				<SectionLabel>Customize</SectionLabel>
				<div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
					<FlowerSelector
						flowerType={flowerType}
						setFlowerType={setFlowerType}
						flowerColor={flowerColor}
						setFlowerColor={setFlowerColor}
					/>
				</div>
			</div>

			<div>
				<SectionLabel>GitHub Username</SectionLabel>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: enter key submit */}
				<div className="flex flex-col gap-3" onKeyDown={handleKeyDown}>
					<UserNameInput username={username} setUsername={setUsername} />
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!username || isGenerating}
						aria-busy={isGenerating}
						aria-label={
							isGenerating ? "Generating your GitStyle..." : "Generate GitStyle"
						}
						className="py-2.5 px-5 rounded-lg font-medium text-white bg-neutral-900
							transition-colors duration-150
							hover:bg-neutral-800
							disabled:opacity-40 disabled:cursor-not-allowed
							active:bg-neutral-950"
					>
						{isGenerating ? (
							<span className="flex items-center justify-center gap-2">
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
								Generating...
							</span>
						) : (
							"Generate"
						)}
					</button>
				</div>
			</div>

			{submitted && (
				<div className="animate-fade-in-scale opacity-0">
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
