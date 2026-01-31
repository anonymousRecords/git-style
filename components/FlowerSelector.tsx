"use client";

import type { FlowerType } from "@/lib/animation/types";
import { FlowerPreview } from "./FlowerPreview";

interface FlowerSelectorProps {
	flowerType: FlowerType;
	setFlowerType: (type: FlowerType) => void;
	flowerColor: string;
	setFlowerColor: (color: string) => void;
}

const FLOWER_OPTIONS: { type: FlowerType; label: string; emoji: string }[] = [
	{ type: "default", label: "Default", emoji: "🌼" },
	{ type: "tulip", label: "Tulip", emoji: "🌷" },
	{ type: "sunflower", label: "Sunflower", emoji: "🌻" },
	{ type: "cherry", label: "Cherry", emoji: "🌸" },
];

const COLOR_PRESETS: { color: string; label: string }[] = [
	{ color: "#fbbf24", label: "Yellow" },
	{ color: "#f43f5e", label: "Rose" },
	{ color: "#ec4899", label: "Pink" },
	{ color: "#a855f7", label: "Purple" },
	{ color: "#3b82f6", label: "Blue" },
	{ color: "#ffffff", label: "White" },
];

export function FlowerSelector({
	flowerType,
	setFlowerType,
	flowerColor,
	setFlowerColor,
}: FlowerSelectorProps) {
	return (
		<div className="flex gap-6 items-start">
			<div className="flex-1 space-y-4">
				{/* Flower Type */}
				<div>
					<p className="text-sm text-gray-600 mb-2">Flower Type</p>
					<div className="flex flex-wrap gap-2">
						{FLOWER_OPTIONS.map((option) => (
							<button
								type="button"
								key={option.type}
								onClick={() => setFlowerType(option.type)}
								className={`px-3 py-2 rounded-lg text-sm transition-all ${
									flowerType === option.type
										? "bg-green-500 text-white shadow-md"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								<span className="mr-1">{option.emoji}</span>
								{option.label}
							</button>
						))}
					</div>
				</div>

				{/* Flower Color */}
				<div>
					<p className="text-sm text-gray-600 mb-2">Flower Color</p>
					<div className="flex flex-wrap gap-2">
						{COLOR_PRESETS.map((preset) => (
							<button
								type="button"
								key={preset.color}
								onClick={() => setFlowerColor(preset.color)}
								className={`w-8 h-8 rounded-full border-2 transition-all ${
									flowerColor === preset.color
										? "border-green-500 scale-110 shadow-md"
										: "border-gray-300 hover:border-gray-400"
								}`}
								style={{ backgroundColor: preset.color }}
								title={preset.label}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Preview */}
			<FlowerPreview flowerType={flowerType} flowerColor={flowerColor} />
		</div>
	);
}
