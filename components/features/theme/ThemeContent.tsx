"use client";

import type { Theme } from "@/components/features/theme/ThemeTabs";
import { ComingSoonContent } from "./coming-soon/ComingSoonContent";
import { FlowerContent } from "./flower/FlowerContent";

interface ThemeContentProps {
	theme: Theme;
}

export function ThemeContent({ theme }: ThemeContentProps) {
	if (theme === "flower") {
		return <FlowerContent />;
	}
	return <ComingSoonContent theme={theme} />;
}
