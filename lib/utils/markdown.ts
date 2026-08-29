import type { FlowerType, HairCurliness } from "@/lib/themes/types";

export const SITE_URL = "https://git-style.vercel.app";

export interface AnimationOptions {
	username: string;
	flowerType?: FlowerType;
	flowerColor?: string;
	hairColor?: string;
	curliness?: HairCurliness;
}

export function buildAnimationPath({
	username,
	flowerType,
	flowerColor,
	hairColor,
	curliness,
}: AnimationOptions): string {
	const isHairTheme = hairColor !== undefined || curliness !== undefined;
	const theme = isHairTheme ? "hair" : "flower";

	let params = `theme=${theme}&quality=low`;

	if (theme === "flower") {
		params += `&flower=${flowerType || "default"}`;
		if (flowerColor) {
			params += `&color=${encodeURIComponent(flowerColor)}`;
		}
	} else {
		if (hairColor) {
			params += `&color=${encodeURIComponent(hairColor)}`;
		}
		if (curliness) {
			params += `&curliness=${curliness}`;
		}
	}

	return `/api/${username}/animation?${params}`;
}

export function buildMarkdown(options: AnimationOptions): string {
	return `[![GitStyle](${SITE_URL}${buildAnimationPath(options)})](${SITE_URL})`;
}
