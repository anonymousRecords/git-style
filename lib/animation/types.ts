import type { CommitLevel } from "@/lib/themes";

export type FlowerType = "default" | "tulip" | "sunflower" | "cherry";

export interface AnimationConfig {
	frameCount: number;
	frameDelay: number; // milliseconds
	width: number;
	height: number;
	quality: "low" | "medium" | "high";
}

export interface PlantElement {
	x: number;
	y: number;
	level: CommitLevel;
	weekIndex: number;
	dayIndex: number;
}

export interface WindEffect {
	amplitude: number;
	frequency: number;
	getPhaseOffset: (x: number, y: number) => number;
}

export const QUALITY_PRESETS: Record<
	AnimationConfig["quality"],
	Pick<AnimationConfig, "frameCount" | "frameDelay">
> = {
	low: { frameCount: 8, frameDelay: 125 },
	medium: { frameCount: 12, frameDelay: 100 },
	high: { frameCount: 16, frameDelay: 80 },
};

export const PLANT_COLORS = {
	stem: {
		light: "#22c55e",
		dark: "#15803d",
	},
	flower: "#fbbf24",
	soil: "#7B4A22",
} as const;
