"use client";

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
	return (
		<div className="flex gap-4 items-start">
			<div className="flex-1 space-y-4">
				{/* Flower Type */}
				<div>
					<p className="text-xs font-medium text-pink-900/60 mb-2">Type</p>
					<div className="flex flex-wrap gap-1.5">
						{FLOWER_OPTIONS.map((option) => (
							<button
								type="button"
								key={option.type}
								onClick={() => setFlowerType(option.type)}
								className={`px-3 py-1.5 rounded-full text-sm transition-all ${
									flowerType === option.type
										? "bg-white text-pink-900 shadow-sm"
										: "bg-pink-100/50 text-pink-800/70 hover:bg-pink-100"
								}`}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				{/* Flower Color */}
				<div>
					<p className="text-xs font-medium text-pink-900/60 mb-2">Color</p>
					<div className="flex flex-wrap gap-2">
						{COLOR_PRESETS.map((preset) => (
							<button
								type="button"
								key={preset.color}
								onClick={() => setFlowerColor(preset.color)}
								className={`w-7 h-7 rounded-full transition-all ${
									flowerColor === preset.color
										? "ring-2 ring-pink-900/30 ring-offset-2 ring-offset-pink-200"
										: "hover:scale-110"
								}`}
								style={{
									backgroundColor: preset.color,
									boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.1)",
								}}
								title={preset.label}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Preview */}
			<FlowerPreview flowerType={flowerType} flowerColor={flowerColor} size={100} />
		</div>
	);
}
