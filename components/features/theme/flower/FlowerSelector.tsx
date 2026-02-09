"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import type { FlowerType } from "@/lib/themes/types";
import { FlowerPreview } from "./FlowerPreview";

interface FlowerSelectorProps {
	flowerType: FlowerType;
	setFlowerType: (type: FlowerType) => void;
	flowerColor: string;
	setFlowerColor: (color: string) => void;
}

const FLOWER_OPTIONS: { type: FlowerType; label: string }[] = [
	{ type: "default", label: "Daisy" },
	{ type: "tulip", label: "Tulip" },
	{ type: "sunflower", label: "Sunflower" },
	{ type: "cherry", label: "Cherry" },
];

const COLOR_PRESETS: { color: string; label: string }[] = [
	{ color: "#fbbf24", label: "Yellow" },
	{ color: "#fb7185", label: "Rose" },
	{ color: "#f9a8d4", label: "Pink" },
	{ color: "#c4b5fd", label: "Purple" },
	{ color: "#93c5fd", label: "Blue" },
	{ color: "#ffffff", label: "White" },
];

export function FlowerSelector({
	flowerType,
	setFlowerType,
	flowerColor,
	setFlowerColor,
}: FlowerSelectorProps) {
	const posthog = usePostHog();
	const [hoveredFlower, setHoveredFlower] = useState<FlowerType | null>(null);

	return (
		<div className="flex flex-col sm:flex-row gap-5 items-start">
			<div className="flex-1 space-y-5 w-full sm:w-auto">
				<div>
					<p className="text-[11px] font-medium text-neutral-500 mb-2.5">
						Type
					</p>
					<div className="flex flex-wrap gap-1.5">
						{FLOWER_OPTIONS.map((option) => (
							<button
								type="button"
								key={option.type}
								onClick={() => {
									posthog?.capture("flower_type_selected", {
										flower_type: option.type,
									});
									setFlowerType(option.type);
								}}
								onMouseEnter={() => setHoveredFlower(option.type)}
								onMouseLeave={() => setHoveredFlower(null)}
								aria-pressed={flowerType === option.type}
								className="relative px-3 py-1.5 rounded-md text-sm"
							>
								<AnimatePresence>
									{hoveredFlower === option.type &&
										hoveredFlower !== flowerType && (
											<motion.span
												className="absolute inset-0 rounded-md bg-neutral-100"
												layoutId="flower-hover"
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
								{flowerType === option.type && (
									<motion.span
										className="absolute inset-0 rounded-md bg-white shadow-sm border border-neutral-200"
										layoutId="flower-active"
										transition={{
											type: "spring",
											bounce: 0.15,
											duration: 0.4,
										}}
									/>
								)}
								<span
									className={`relative z-10 ${
										flowerType === option.type
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
									posthog?.capture("flower_color_selected", {
										flower_color: preset.color,
										flower_color_label: preset.label,
									});
									setFlowerColor(preset.color);
								}}
								className="group relative"
								aria-label={`Select ${preset.label} color`}
								aria-pressed={flowerColor === preset.color}
							>
								{flowerColor === preset.color && (
									<motion.div
										className="absolute -inset-[3px] rounded-full"
										style={{
											boxShadow: `0 0 0 2px ${flowerColor === "#ffffff" ? "#a3a3a3" : flowerColor}`,
										}}
										layoutId="flower-color-active"
										transition={{
											type: "spring",
											bounce: 0.15,
											duration: 0.4,
										}}
									/>
								)}
								<div
									className={`w-7 h-7 rounded-full transition-transform duration-150 ${
										flowerColor !== preset.color ? "hover:scale-110" : ""
									}`}
									style={{
										backgroundColor: preset.color,
										boxShadow:
											preset.color === "#ffffff"
												? "inset 0 0 0 1px rgba(0,0,0,0.1)"
												: "inset 0 -2px 4px rgba(0,0,0,0.1)",
									}}
								/>
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="mx-auto sm:mx-0">
				<FlowerPreview
					flowerType={flowerType}
					flowerColor={flowerColor}
					size={88}
				/>
			</div>
		</div>
	);
}
