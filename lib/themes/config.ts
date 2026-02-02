import type { CommitLevel } from "@/lib/utils/commit-level";
import type { ThemeStyle } from "./types";

export const HairTheme: ThemeStyle = {
	label: "Hair",
	emoji: "💇",
	background: "#fffaf0",
	showBaseDot: true,
	getPath: (level: CommitLevel): string | null => {
		switch (level) {
			case "none":
				return null;
			case "low":
				return "M0,0 C1,-3 -1,-6 0,-9";
			case "medium":
				return "M0,0 C1,-6 -1,-12 0,-18 C1,-22 -1,-26 0,-30";
			case "high":
				return "M0,0 C2,-6 -2,-12 2,-18 C-2,-24 2,-30 0,-36";
			case "max":
				return "M0,0 C2,-6 -2,-12 2,-18 C-2,-24 2,-30 0,-36";
			default:
				return null;
		}
	},
	colorMap: {
		none: "#fffaf0",
		low: "#1f2937",
		medium: "#1f2937",
		high: "#1f2937",
		max: "#1f2937",
	},
};

export const FireTheme: ThemeStyle = {
	label: "Fire",
	emoji: "🔥",
	background: "#fff7ed",
	showBaseDot: false,
	getEmoji: (level: CommitLevel) => {
		switch (level) {
			case "none":
				return null;
			case "low":
				return "🟡";
			case "medium":
				return "🟠";
			case "high":
				return "🔴";
			case "max":
				return "🔥";
		}
	},
};

export const PlantTheme: ThemeStyle = {
	label: "Plant",
	emoji: "🌿",
	background: "#f0fdf4",
	backgroundPattern: `
		<pattern patternUnits="userSpaceOnUse" width="40" height="40">
			<rect width="40" height="40" fill="#7B4A22" />
			<ellipse cx="8.2" cy="7.1" rx="5.1" ry="2.2" fill="#A97C50" opacity="0.65"/>
			<ellipse cx="30.5" cy="15.7" rx="3.8" ry="2.9" fill="#C69C6D" opacity="0.55"/>
			<ellipse cx="20.1" cy="35.2" rx="4.2" ry="1.7" fill="#8D6748" opacity="0.60"/>
			<ellipse cx="12.7" cy="28.3" rx="2.9" ry="1.2" fill="#BCA17A" opacity="0.70"/>
			<circle cx="5.2" cy="5.8" r="1.7" fill="#F9E4B7" opacity="0.80"/>
			<circle cx="13.1" cy="11.2" r="1.1" fill="#F6D28B" opacity="0.60"/>
			<circle cx="32.3" cy="8.4" r="1.3" fill="#F9E4B7" opacity="0.90"/>
			<circle cx="18.7" cy="25.6" r="1.2" fill="#BCA17A" opacity="0.70"/>
			<circle cx="36.2" cy="36.1" r="1.5" fill="#A97C50" opacity="0.80"/>
		</pattern>
  	`,
	showBaseDot: true,
	getEmoji: (level: CommitLevel): string | null => {
		switch (level) {
			case "none":
				return null;
			case "low":
				return "🫘";
			case "medium":
				return "🌱";
			case "high":
				return "🌿";
			case "max":
				return "🌻";
			default:
				return null;
		}
	},
};

export const themes: Record<string, ThemeStyle> = {
	hair: HairTheme,
	fire: FireTheme,
	plant: PlantTheme,
};
