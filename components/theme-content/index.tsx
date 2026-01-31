"use client";

import type { Theme } from "@/components/ThemeTabs";
import { ComingSoonContent } from "./ComingSoonContent";
import { FlowerContent } from "./FlowerContent";

interface ThemeContentProps {
	theme: Theme;
}

export function ThemeContent({ theme }: ThemeContentProps) {
	switch (theme) {
		case "flower":
			return <FlowerContent />;
		case "cloud":
		case "hair":
		default:
			return <ComingSoonContent theme={theme} />;
	}
}
