"use client";

import { useState } from "react";
import type { FlowerType } from "@/lib/animation/types";
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
	const [hoveredColor, setHoveredColor] = useState<string | null>(null);

	return (
		<div className="flex flex-col sm:flex-row gap-5 items-start">
			<div className="flex-1 space-y-5 w-full sm:w-auto">
				{/* Flower Type */}
				<div>
					<p
						className="text-[11px] font-medium uppercase tracking-wide mb-3"
						style={{ color: "rgba(190, 24, 93, 0.6)" }}
					>
						Type
					</p>
					<div className="flex flex-wrap gap-2">
						{FLOWER_OPTIONS.map((option) => (
							<button
								type="button"
								key={option.type}
								onClick={() => setFlowerType(option.type)}
								aria-pressed={flowerType === option.type}
								className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-1 ${
									flowerType === option.type
										? "bg-white text-pink-800 shadow-soft"
										: "bg-white/50 text-pink-700/60 hover:bg-white/80 hover:text-pink-800"
								}`}
								style={{
									transform:
										flowerType === option.type ? "scale(1.02)" : "scale(1)",
								}}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				{/* Flower Color */}
				<div>
					<p
						className="text-[11px] font-medium uppercase tracking-wide mb-3"
						style={{ color: "rgba(190, 24, 93, 0.6)" }}
					>
						Color
					</p>
					<div className="flex flex-wrap gap-2.5">
						{COLOR_PRESETS.map((preset) => (
							<button
								type="button"
								key={preset.color}
								onClick={() => setFlowerColor(preset.color)}
								onMouseEnter={() => setHoveredColor(preset.color)}
								onMouseLeave={() => setHoveredColor(null)}
								className="relative group focus-visible:outline-none"
								aria-label={`Select ${preset.label} color`}
								aria-pressed={flowerColor === preset.color}
							>
								<div
									className={`w-8 h-8 rounded-full transition-all duration-200 group-focus-visible:ring-2 group-focus-visible:ring-pink-500 group-focus-visible:ring-offset-2 ${
										flowerColor === preset.color
											? "ring-2 ring-pink-400/50 ring-offset-2 ring-offset-pink-50"
											: ""
									}`}
									style={{
										backgroundColor: preset.color,
										boxShadow:
											preset.color === "#ffffff"
												? "inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)"
												: "0 2px 4px rgba(0,0,0,0.08), inset 0 -2px 4px rgba(0,0,0,0.08)",
										transform:
											hoveredColor === preset.color ||
											flowerColor === preset.color
												? "scale(1.1)"
												: "scale(1)",
									}}
								/>

								{/* Tooltip */}
								<span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-medium text-pink-800/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
									{preset.label}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Preview */}
			<div className="relative mx-auto sm:mx-0">
				<FlowerPreview
					flowerType={flowerType}
					flowerColor={flowerColor}
					size={100}
				/>

				{/* Subtle glow behind preview */}
				<div
					className="absolute inset-0 -z-10 rounded-2xl blur-xl opacity-30"
					style={{ backgroundColor: flowerColor }}
				/>
			</div>
		</div>
	);
}
