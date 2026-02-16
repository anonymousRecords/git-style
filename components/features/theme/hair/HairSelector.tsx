"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import type { HairCurliness } from "@/lib/themes/types";
import { HairPreview } from "./HairPreview";

interface HairSelectorProps {
	hairColor: string;
	setHairColor: (color: string) => void;
	curliness: HairCurliness;
	setCurliness: (curliness: HairCurliness) => void;
}

const CURLINESS_OPTIONS: { type: HairCurliness; label: string }[] = [
	{ type: "straight", label: "Straight" },
	{ type: "wavy", label: "Wavy" },
	{ type: "curly", label: "Curly" },
];

const COLOR_PRESETS: { color: string; label: string }[] = [
	{ color: "#3d2817", label: "Black" },
	{ color: "#6b4423", label: "Dark Brown" },
	{ color: "#8b5a3c", label: "Brown" },
	{ color: "#a67c52", label: "Light Brown" },
	{ color: "#d4a574", label: "Blonde" },
	{ color: "#e5d7c3", label: "Platinum" },
	{ color: "#c44536", label: "Auburn" },
	{ color: "#b8860b", label: "Golden" },
];

export function HairSelector({
	hairColor,
	setHairColor,
	curliness,
	setCurliness,
}: HairSelectorProps) {
	const posthog = usePostHog();
	const [hoveredCurliness, setHoveredCurliness] =
		useState<HairCurliness | null>(null);

	return (
		<div className="flex flex-col sm:flex-row gap-5 items-start">
			<div className="flex-1 space-y-5 w-full sm:w-auto">
				<div>
					<p className="text-[11px] font-medium text-neutral-500 mb-2.5">
						Curliness
					</p>
					<div className="flex flex-wrap gap-1.5">
						{CURLINESS_OPTIONS.map((option) => (
							<button
								type="button"
								key={option.type}
								onClick={() => {
									posthog?.capture("hair_curliness_selected", {
										curliness: option.type,
									});
									setCurliness(option.type);
								}}
								onMouseEnter={() => setHoveredCurliness(option.type)}
								onMouseLeave={() => setHoveredCurliness(null)}
								aria-pressed={curliness === option.type}
								className="relative px-3 py-1.5 rounded-md text-sm"
							>
								<AnimatePresence>
									{hoveredCurliness === option.type &&
										hoveredCurliness !== curliness && (
											<motion.span
												className="absolute inset-0 rounded-md bg-neutral-100"
												layoutId="curliness-hover"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{
													type: "spring",
													bounce: 0.15,
													duration: 0.3,
												}}
											/>
										)}
								</AnimatePresence>
								{curliness === option.type && (
									<motion.span
										className="absolute inset-0 rounded-md bg-white shadow-sm border border-neutral-200"
										layoutId="curliness-active"
										transition={{
											type: "spring",
											bounce: 0.15,
											duration: 0.4,
										}}
									/>
								)}
								<span
									className={`relative z-10 ${
										curliness === option.type
											? "text-neutral-900"
											: "text-neutral-600"
									}`}
								>
									{option.label}
								</span>
							</button>
						))}
					</div>
				</div>

				<div>
					<p className="text-[11px] font-medium text-neutral-500 mb-2.5">
						Color
					</p>
					<div className="flex flex-wrap gap-2">
						{COLOR_PRESETS.map((preset) => (
							<button
								type="button"
								key={preset.color}
								onClick={() => {
									posthog?.capture("hair_color_selected", {
										hair_color: preset.color,
										hair_color_label: preset.label,
									});
									setHairColor(preset.color);
								}}
								className="group relative"
								aria-label={`Select ${preset.label} color`}
								aria-pressed={hairColor === preset.color}
							>
								{hairColor === preset.color && (
									<motion.div
										className="absolute -inset-[3px] rounded-full"
										style={{
											boxShadow: `0 0 0 2px ${hairColor}`,
										}}
										layoutId="hair-color-active"
										transition={{
											type: "spring",
											bounce: 0.15,
											duration: 0.4,
										}}
									/>
								)}
								<div
									className={`w-7 h-7 rounded-full transition-transform duration-150 ${
										hairColor !== preset.color ? "hover:scale-110" : ""
									}`}
									style={{
										backgroundColor: preset.color,
										boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.15)",
									}}
								/>
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="mx-auto sm:mx-0">
				<HairPreview hairColor={hairColor} curliness={curliness} size={88} />
			</div>
		</div>
	);
}
