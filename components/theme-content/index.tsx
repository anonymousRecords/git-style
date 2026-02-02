"use client";

import type { Theme } from "@/components/ThemeTabs";
import { ComingSoonContent } from "./ComingSoonContent";
import { FlowerContent } from "./flower-content/FlowerContent";

interface ThemeContentProps {
	theme: Theme;
}

export function ThemeContent({ theme }: ThemeContentProps) {
	if (theme === "flower") {
		return <FlowerContent />;
	}
	return <ComingSoonContent theme={theme} />;
}
