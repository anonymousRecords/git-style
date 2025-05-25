export type CommitLevel = "none" | "low" | "medium" | "high" | "max";

export interface ThemeStyle {
	getPath?: (level: CommitLevel) => string | null;
	getEmoji?: (level: CommitLevel) => string | null;
	colorMap?: Record<CommitLevel, string>;
	label: string;
	emoji?: string;
	background?: string;
	showBaseDot?: boolean;
}

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

export const themes: Record<string, ThemeStyle> = {
	hair: HairTheme,
	fire: FireTheme,
};

export function getCommitLevel(commitCount: number): CommitLevel {
	if (commitCount === 0) return "none";
	if (commitCount <= 2) return "low";
	if (commitCount <= 4) return "medium";
	if (commitCount <= 7) return "high";
	return "max";
}
