"use client";

import type { Theme } from "@/components/features/theme/ThemeTabs";
import { ComingSoonContent } from "./coming-soon/ComingSoonContent";
import { FlowerContent } from "./flower/FlowerContent";
import { HairContent } from "./hair/HairContent";

interface ThemeContentProps {
	theme: Theme;
}

export function ThemeContent({ theme }: ThemeContentProps) {
	if (theme === "flower") {
		return <FlowerContent />;
	}
	if (theme === "hair") {
		return <HairContent />;
	}
	return <ComingSoonContent theme={theme} />;
}
