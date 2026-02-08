"use client";

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
								onClick={() => setFlowerType(option.type)}
								aria-pressed={flowerType === option.type}
								className={`px-3 py-1.5 rounded-md text-sm transition-colors duration-150 ${
									flowerType === option.type
										? "bg-white text-neutral-900 shadow-sm border border-neutral-200"
										: "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
								}`}
							>
								{option.label}
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
								onClick={() => setFlowerColor(preset.color)}
								className="group relative"
								aria-label={`Select ${preset.label} color`}
								aria-pressed={flowerColor === preset.color}
							>
								<div
									className={`w-7 h-7 rounded-full transition-transform duration-150 ${
										flowerColor === preset.color
											? "ring-2 ring-neutral-900 ring-offset-2"
											: "hover:scale-110"
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
